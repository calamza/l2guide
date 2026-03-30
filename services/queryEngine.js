/**
 * Query Engine — Searches the KB and game DB to answer player questions.
 * Used both by the LLM (as tool functions) and the rule-based fallback.
 */
const kb = require('./knowledgeBase');
const gameDb = require('./gameDb');

/**
 * Search items by name. Returns up to 10 results with basic info.
 */
function searchItems(query) {
  const results = kb.searchItems(query, 10);
  return results.map(r => ({
    id: r.id,
    name: r.name,
    type: r.type,
    grade: r.crystal_type || 'NONE',
    weapon_type: r.weapon_type,
    armor_type: r.armor_type,
    bodypart: r.bodypart,
    price: r.price,
  }));
}

/**
 * Get where an item drops from (monsters), with effective rates.
 */
function getDropSources(itemId, itemName) {
  // If only name provided, find the item first
  if (!itemId && itemName) {
    const items = kb.searchItems(itemName, 1);
    if (items.length > 0) itemId = items[0].id;
    else return { error: `No se encontró el item "${itemName}"` };
  }

  const drops = kb.getDropSources(itemId);
  return drops.map(d => ({
    npcName: d.npc_name,
    npcLevel: d.npc_level,
    npcType: d.npc_type,
    itemName: d.item_name,
    minCount: d.min_count,
    maxCount: d.max_count,
    dropType: d.drop_type,
    effectiveChance: parseFloat(((d.group_chance * d.chance) / 100).toFixed(4)),
    isRaidBoss: d.npc_type === 'L2RaidBoss' || d.npc_type === 'L2GrandBoss',
  }));
}

/**
 * Get recipe/craft info for an item.
 */
function getRecipeInfo(itemId, itemName) {
  if (!itemId && itemName) {
    const items = kb.searchItems(itemName, 1);
    if (items.length > 0) itemId = items[0].id;
    else return { error: `No se encontró el item "${itemName}"` };
  }

  const recipes = kb.getRecipeForItem(itemId);
  if (recipes.length === 0) return { message: 'Este item no tiene receta de crafteo.' };

  return recipes.map(r => ({
    recipeName: r.name,
    craftLevel: r.craft_level,
    type: r.type === 'dwarven' ? 'Dwarven Craft' : 'Common Craft',
    successRate: r.success_rate,
    mpCost: r.mp_cost,
    producedCount: r.production_count,
    ingredients: r.ingredients, // already enriched with names
  }));
}

/**
 * Get NPC shops (multisell) that sell an item.
 */
function getNpcShops(itemId, itemName) {
  if (!itemId && itemName) {
    const items = kb.searchItems(itemName, 1);
    if (items.length > 0) itemId = items[0].id;
    else return { error: `No se encontró el item "${itemName}"` };
  }

  const multisells = kb.getMultisellForItem(itemId);
  const buylists = kb.getBuylistForItem(itemId);

  const result = [];

  for (const ms of multisells) {
    result.push({
      type: 'multisell',
      cost: ms.ingredient_items,
      count: ms.production_count,
    });
  }

  for (const bl of buylists) {
    const item = kb.getItemById(itemId);
    result.push({
      type: 'buylist',
      price: bl.price > 0 ? bl.price : (item ? item.price : 0),
      listId: bl.list_id,
    });
  }

  if (result.length === 0) return { message: 'Este item no se vende en tiendas de NPC.' };
  return result;
}

/**
 * Get offline player shops selling an item (real-time from game DB).
 */
async function getOfflineShops(itemId, itemName) {
  if (!itemId && itemName) {
    const items = kb.searchItems(itemName, 1);
    if (items.length > 0) itemId = items[0].id;
    else return { error: `No se encontró el item "${itemName}"` };
  }

  try {
    const shops = await gameDb.getOfflineShops(itemId);
    if (shops.length === 0) return { message: 'Nadie está vendiendo este item en tiendas offline actualmente.' };
    return shops;
  } catch (err) {
    return { error: 'No se pudo consultar las tiendas offline: ' + err.message };
  }
}

/**
 * Get player info from game DB.
 */
async function getPlayerInfo(charName) {
  try {
    const info = await gameDb.getPlayerInfo(charName);
    if (!info) return { error: `No se encontró el personaje "${charName}"` };
    return info;
  } catch (err) {
    return { error: 'No se pudo consultar la info del personaje: ' + err.message };
  }
}

/**
 * Search monsters by level range.
 */
function searchMonstersByLevel(minLevel, maxLevel) {
  const npcs = kb.getNpcsByLevel(minLevel, maxLevel, 20);
  return npcs.map(n => ({
    id: n.id,
    name: n.name,
    level: n.level,
    type: n.type,
    race: n.race,
    isRaidBoss: n.type === 'L2RaidBoss' || n.type === 'L2GrandBoss',
  }));
}

module.exports = {
  searchItems,
  getDropSources,
  getRecipeInfo,
  getNpcShops,
  getOfflineShops,
  getPlayerInfo,
  searchMonstersByLevel,
};
