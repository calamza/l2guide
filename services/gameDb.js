/**
 * Game DB Service — Consultas en tiempo real a la DB del game server
 * Offline shops, datos de personaje, inventario, etc.
 */
const gamePool = require('../config/database');
const { getClassName, getClassInfo } = require('../data/classMap');

/**
 * Obtener info de un personaje por nombre
 */
async function getPlayerInfo(charName) {
  let conn;
  try {
    conn = await gamePool.getConnection();
    const rows = await conn.query(
      `SELECT c.charId, c.char_name, c.level, c.classid, c.title, c.online,
              c.clanid, c.x, c.y, c.z, c.pvpkills, c.pkkills,
              cd.clan_name, cd.clan_level, cd.ally_name
       FROM characters c
       LEFT JOIN clan_data cd ON cd.clan_id = c.clanid
       WHERE c.char_name = ? LIMIT 1`,
      [charName]
    );
    if (rows.length === 0) return null;
    const r = rows[0];
    const classInfo = getClassInfo(r.classid);
    return {
      charId: r.charId,
      name: r.char_name,
      level: r.level,
      classId: r.classid,
      className: classInfo.name,
      race: classInfo.race,
      classType: classInfo.type,
      title: r.title,
      online: !!r.online,
      clan: r.clan_name || null,
      clanLevel: r.clan_level || 0,
      ally: r.ally_name || null,
      pvpKills: r.pvpkills || 0,
      pkKills: r.pkkills || 0,
    };
  } finally {
    if (conn) conn.release();
  }
}

/**
 * Buscar items en offline shops (vendedores)
 */
async function getOfflineShops(itemId) {
  let conn;
  try {
    conn = await gamePool.getConnection();

    // Check if offline trade tables exist
    let hasTable = false;
    try {
      await conn.query('SELECT 1 FROM character_offline_trade LIMIT 1');
      hasTable = true;
    } catch { return []; }

    if (!hasTable) return [];

    const rows = await conn.query(
      `SELECT ot.charId, ot.type AS shop_type, ot.title AS shop_title,
              oti.item AS item_object_id, oti.count, oti.price,
              c.char_name, c.x, c.y, c.z
       FROM character_offline_trade_items oti
       JOIN character_offline_trade ot ON ot.charId = oti.charId
       JOIN characters c ON c.charId = oti.charId
       WHERE oti.item IN (
         SELECT object_id FROM items WHERE item_id = ?
       )
       ORDER BY oti.price ASC`,
      [itemId]
    );

    return rows.map(r => ({
      seller: r.char_name,
      shopTitle: r.shop_title,
      shopType: r.shop_type === 1 ? 'sell' : r.shop_type === 3 ? 'sell' : 'buy',
      count: Number(r.count),
      price: Number(r.price),
      location: getLocationName(r.x, r.y),
    }));
  } finally {
    if (conn) conn.release();
  }
}

/**
 * Buscar personajes de una cuenta (para contextualizar)
 */
async function getAccountCharacters(accountName) {
  let conn;
  try {
    conn = await gamePool.getConnection();
    const rows = await conn.query(
      `SELECT charId, char_name, level, classid, online, clanid
       FROM characters WHERE account_name = ? ORDER BY level DESC`,
      [accountName]
    );
    return rows.map(r => ({
      charId: r.charId,
      name: r.char_name,
      level: r.level,
      className: getClassName(r.classid),
      classId: r.classid,
      online: !!r.online,
    }));
  } finally {
    if (conn) conn.release();
  }
}

/**
 * Approximate location name from coords
 */
function getLocationName(x, y) {
  // Main towns approximation for L2J High Five
  const locations = [
    { name: 'Talking Island', x: -84318, y: 244579, r: 8000 },
    { name: 'Elven Village', x: 46934, y: 51467, r: 8000 },
    { name: 'Dark Elven Village', x: 9745, y: 15606, r: 8000 },
    { name: 'Orc Village', x: -44836, y: -112524, r: 8000 },
    { name: 'Dwarven Village', x: 115113, y: -178212, r: 8000 },
    { name: 'Gludio', x: -14138, y: 123869, r: 8000 },
    { name: 'Dion', x: 15670, y: 142983, r: 8000 },
    { name: 'Giran', x: 83400, y: 147943, r: 8000 },
    { name: 'Oren', x: 82956, y: 53162, r: 8000 },
    { name: 'Aden', x: 147450, y: 26889, r: 10000 },
    { name: 'Hunters Village', x: 117166, y: 76794, r: 6000 },
    { name: 'Goddard', x: 147724, y: -55346, r: 8000 },
    { name: 'Rune', x: 43799, y: -47727, r: 8000 },
    { name: 'Schuttgart', x: 87331, y: -142842, r: 8000 },
    { name: 'Heine', x: 111381, y: 219085, r: 8000 },
    { name: 'Gludin', x: -80826, y: 149775, r: 8000 },
    { name: 'Kamael Village', x: -117251, y: 46771, r: 8000 },
  ];

  let closest = 'Ubicación desconocida';
  let minDist = Infinity;

  for (const loc of locations) {
    const dist = Math.sqrt(Math.pow(x - loc.x, 2) + Math.pow(y - loc.y, 2));
    if (dist < loc.r && dist < minDist) {
      minDist = dist;
      closest = loc.name;
    }
  }

  return closest;
}

/**
 * Buscar items del shop in-game (Memories Coin) por nombre
 */
async function searchShopItems(query) {
  let conn;
  try {
    conn = await gamePool.getConnection();
    const rows = await conn.query(
      `SELECT i.item_id, i.item_name, i.price_coin, i.enchant_level, i.item_count,
              i.grade, c.name AS category_name
       FROM game_shop_items i
       JOIN game_shop_categories c ON c.id = i.category_id
       WHERE i.active = 1 AND c.active = 1
         AND i.item_name LIKE ?
       ORDER BY c.sort_order ASC, i.sort_order ASC
       LIMIT 20`,
      [`%${query}%`]
    );
    return rows.map(r => ({
      itemId: r.item_id,
      name: r.item_name,
      priceCoins: Number(r.price_coin),
      enchant: r.enchant_level || 0,
      count: r.item_count || 1,
      grade: r.grade || 'none',
      category: r.category_name,
    }));
  } catch (err) {
    console.error('[GameDB] Error buscando shop items:', err.message);
    return [];
  } finally {
    if (conn) conn.release();
  }
}

/**
 * Obtener items del shop filtrados por categoría y/o grado
 */
async function getShopByCategory(category, grade) {
  let conn;
  try {
    conn = await gamePool.getConnection();
    let sql = `SELECT i.item_id, i.item_name, i.price_coin, i.enchant_level, i.item_count,
                      i.grade, c.name AS category_name
               FROM game_shop_items i
               JOIN game_shop_categories c ON c.id = i.category_id
               WHERE i.active = 1 AND c.active = 1`;
    const params = [];
    if (category) {
      sql += ' AND c.name LIKE ?';
      params.push(`%${category}%`);
    }
    if (grade) {
      sql += ' AND i.grade = ?';
      params.push(grade);
    }
    sql += ' ORDER BY c.sort_order ASC, i.sort_order ASC LIMIT 30';
    const rows = await conn.query(sql, params);
    return rows.map(r => ({
      itemId: r.item_id,
      name: r.item_name,
      priceCoins: Number(r.price_coin),
      enchant: r.enchant_level || 0,
      count: r.item_count || 1,
      grade: r.grade || 'none',
      category: r.category_name,
    }));
  } catch (err) {
    console.error('[GameDB] Error obteniendo shop por categoría:', err.message);
    return [];
  } finally {
    if (conn) conn.release();
  }
}

module.exports = { getPlayerInfo, getOfflineShops, getAccountCharacters, searchShopItems, getShopByCategory };
