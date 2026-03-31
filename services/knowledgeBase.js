/**
 * Knowledge Base — SQLite storage for parsed datapack data
 * Builds, stores, and queries the game knowledge base.
 */
const path = require('path');
const Database = require('better-sqlite3');
const parser = require('../parsers/datapackParser');
const builtinGuides = require('../data/guides');

const DB_PATH = path.join(__dirname, '..', 'data', 'kb', 'gamedata.db');

let db = null;

// Rebuild status (in-memory)
let rebuildStatus = {
  running: false,
  phase: '',
  progress: 0,
  startedAt: null,
  finishedAt: null,
  error: null,
  stats: {},
};

function getDb() {
  if (!db) {
    const fs = require('fs');
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('synchronous = NORMAL');
  }
  return db;
}

function createSchema() {
  const d = getDb();

  d.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT,
      weapon_type TEXT,
      armor_type TEXT,
      bodypart TEXT,
      crystal_type TEXT DEFAULT 'NONE',
      weight INTEGER DEFAULT 0,
      price INTEGER DEFAULT 0,
      material TEXT,
      stats TEXT
    );

    CREATE TABLE IF NOT EXISTS npcs (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      level INTEGER DEFAULT 0,
      type TEXT,
      race TEXT,
      exp_rate REAL DEFAULT 0,
      sp INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS drops (
      npc_id INTEGER,
      item_id INTEGER,
      min_count INTEGER DEFAULT 1,
      max_count INTEGER DEFAULT 1,
      chance REAL DEFAULT 0,
      drop_type TEXT,
      group_chance REAL DEFAULT 100
    );

    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY,
      recipe_id INTEGER,
      name TEXT,
      craft_level INTEGER DEFAULT 0,
      type TEXT,
      success_rate INTEGER DEFAULT 100,
      production_id INTEGER,
      production_count INTEGER DEFAULT 1,
      mp_cost INTEGER DEFAULT 0,
      ingredients TEXT
    );

    CREATE TABLE IF NOT EXISTS multisells (
      list_id INTEGER,
      npc_ids TEXT,
      ingredient_items TEXT,
      production_id INTEGER,
      production_count INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS buylists (
      list_id INTEGER,
      item_id INTEGER,
      price INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS kb_meta (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS guides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      tags TEXT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      source TEXT DEFAULT 'builtin',
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Create indexes
  d.exec(`
    CREATE INDEX IF NOT EXISTS idx_drops_item ON drops(item_id);
    CREATE INDEX IF NOT EXISTS idx_drops_npc ON drops(npc_id);
    CREATE INDEX IF NOT EXISTS idx_recipes_prod ON recipes(production_id);
    CREATE INDEX IF NOT EXISTS idx_multisells_prod ON multisells(production_id);
    CREATE INDEX IF NOT EXISTS idx_buylists_item ON buylists(item_id);
    CREATE INDEX IF NOT EXISTS idx_items_name ON items(name COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_npcs_name ON npcs(name COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_npcs_level ON npcs(level);
  `);

  // FTS5 for full-text search
  d.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS items_fts USING fts5(name, content='items', content_rowid='id');
    CREATE VIRTUAL TABLE IF NOT EXISTS npcs_fts USING fts5(name, content='npcs', content_rowid='id');
    CREATE VIRTUAL TABLE IF NOT EXISTS guides_fts USING fts5(title, tags, content, content='guides', content_rowid='id');
  `);
}

/**
 * Rebuild the entire knowledge base from datapack XMLs.
 * Runs synchronously in phases, updating rebuildStatus.
 */
function rebuild(datapackPath) {
  if (rebuildStatus.running) {
    throw new Error('Ya hay un rebuild en curso.');
  }

  rebuildStatus = {
    running: true,
    phase: 'init',
    progress: 0,
    startedAt: new Date().toISOString(),
    finishedAt: null,
    error: null,
    stats: {},
  };

  // Run in next tick to allow the HTTP response to return first
  setImmediate(() => {
    try {
      const d = getDb();
      createSchema();

      // Clear existing data
      rebuildStatus.phase = 'cleaning';
      rebuildStatus.progress = 5;
      d.exec('DELETE FROM items');
      d.exec('DELETE FROM npcs');
      d.exec('DELETE FROM drops');
      d.exec('DELETE FROM recipes');
      d.exec('DELETE FROM multisells');
      d.exec('DELETE FROM buylists');
      d.exec('DELETE FROM items_fts');
      d.exec('DELETE FROM npcs_fts');

      // Phase 1: Items
      rebuildStatus.phase = 'items';
      rebuildStatus.progress = 10;
      const items = parser.parseItems(datapackPath);
      const insertItem = d.prepare(
        'INSERT OR REPLACE INTO items (id, name, type, weapon_type, armor_type, bodypart, crystal_type, weight, price, material, stats) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      );
      const insertItemTx = d.transaction((rows) => {
        for (const r of rows) {
          insertItem.run(r.id, r.name, r.type, r.weapon_type, r.armor_type, r.bodypart, r.crystal_type, r.weight, r.price, r.material, r.stats);
        }
      });
      insertItemTx(items);
      rebuildStatus.stats.items = items.length;
      rebuildStatus.progress = 30;

      // Phase 2: NPCs + Drops
      rebuildStatus.phase = 'npcs';
      const { npcs, drops } = parser.parseNpcs(datapackPath);
      const insertNpc = d.prepare(
        'INSERT OR REPLACE INTO npcs (id, name, level, type, race, exp_rate, sp) VALUES (?, ?, ?, ?, ?, ?, ?)'
      );
      const insertNpcTx = d.transaction((rows) => {
        for (const r of rows) {
          insertNpc.run(r.id, r.name, r.level, r.type, r.race, r.exp_rate, r.sp);
        }
      });
      insertNpcTx(npcs);
      rebuildStatus.stats.npcs = npcs.length;
      rebuildStatus.progress = 50;

      rebuildStatus.phase = 'drops';
      const insertDrop = d.prepare(
        'INSERT INTO drops (npc_id, item_id, min_count, max_count, chance, drop_type, group_chance) VALUES (?, ?, ?, ?, ?, ?, ?)'
      );
      const insertDropTx = d.transaction((rows) => {
        for (const r of rows) {
          insertDrop.run(r.npc_id, r.item_id, r.min_count, r.max_count, r.chance, r.drop_type, r.group_chance);
        }
      });
      insertDropTx(drops);
      rebuildStatus.stats.drops = drops.length;
      rebuildStatus.progress = 65;

      // Phase 3: Recipes
      rebuildStatus.phase = 'recipes';
      const recipes = parser.parseRecipes(datapackPath);
      const insertRecipe = d.prepare(
        'INSERT OR REPLACE INTO recipes (id, recipe_id, name, craft_level, type, success_rate, production_id, production_count, mp_cost, ingredients) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      );
      const insertRecipeTx = d.transaction((rows) => {
        for (const r of rows) {
          insertRecipe.run(r.id, r.recipe_id, r.name, r.craft_level, r.type, r.success_rate, r.production_id, r.production_count, r.mp_cost, r.ingredients);
        }
      });
      insertRecipeTx(recipes);
      rebuildStatus.stats.recipes = recipes.length;
      rebuildStatus.progress = 80;

      // Phase 4: Multisells
      rebuildStatus.phase = 'multisells';
      const multisells = parser.parseMultisells(datapackPath);
      const insertMultisell = d.prepare(
        'INSERT INTO multisells (list_id, npc_ids, ingredient_items, production_id, production_count) VALUES (?, ?, ?, ?, ?)'
      );
      const insertMultisellTx = d.transaction((rows) => {
        for (const r of rows) {
          insertMultisell.run(r.list_id, r.npc_ids, r.ingredient_items, r.production_id, r.production_count);
        }
      });
      insertMultisellTx(multisells);
      rebuildStatus.stats.multisells = multisells.length;
      rebuildStatus.progress = 90;

      // Phase 5: Buylists
      rebuildStatus.phase = 'buylists';
      const buylists = parser.parseBuylists(datapackPath);
      const insertBuylist = d.prepare(
        'INSERT INTO buylists (list_id, item_id, price) VALUES (?, ?, ?)'
      );
      const insertBuylistTx = d.transaction((rows) => {
        for (const r of rows) {
          insertBuylist.run(r.list_id, r.item_id, r.price);
        }
      });
      insertBuylistTx(buylists);
      rebuildStatus.stats.buylists = buylists.length;
      rebuildStatus.progress = 95;

      // Phase 6: Guides
      rebuildStatus.phase = 'guides';
      rebuildStatus.progress = 93;
      d.exec('DELETE FROM guides WHERE source = \'builtin\'');
      try { d.exec('DELETE FROM guides_fts'); } catch {}
      const insertGuide = d.prepare(
        'INSERT INTO guides (category, tags, title, content, source) VALUES (?, ?, ?, ?, ?)'
      );
      const insertGuideTx = d.transaction((rows) => {
        for (const g of rows) {
          insertGuide.run(g.category, g.tags, g.title, g.content, 'builtin');
        }
      });
      insertGuideTx(builtinGuides);
      rebuildStatus.stats.guides = builtinGuides.length;

      // Rebuild FTS indexes
      rebuildStatus.phase = 'fts_index';
      d.exec("INSERT INTO items_fts(items_fts) VALUES('rebuild')");
      d.exec("INSERT INTO npcs_fts(npcs_fts) VALUES('rebuild')");
      d.exec("INSERT INTO guides_fts(guides_fts) VALUES('rebuild')");

      // Save metadata
      const upsertMeta = d.prepare('INSERT OR REPLACE INTO kb_meta (key, value) VALUES (?, ?)');
      upsertMeta.run('last_rebuild', new Date().toISOString());
      upsertMeta.run('datapack_path', datapackPath);
      upsertMeta.run('stats', JSON.stringify(rebuildStatus.stats));

      rebuildStatus.phase = 'done';
      rebuildStatus.progress = 100;
      rebuildStatus.finishedAt = new Date().toISOString();
      rebuildStatus.running = false;

      console.log('[KB] Rebuild completado:', rebuildStatus.stats);

    } catch (err) {
      console.error('[KB] Error en rebuild:', err);
      rebuildStatus.error = err.message;
      rebuildStatus.running = false;
      rebuildStatus.finishedAt = new Date().toISOString();
    }
  });
}

function getRebuildStatus() {
  return { ...rebuildStatus };
}

function getStats() {
  try {
    const d = getDb();
    createSchema();
    const itemCount = d.prepare('SELECT COUNT(*) as cnt FROM items').get().cnt;
    const npcCount = d.prepare('SELECT COUNT(*) as cnt FROM npcs').get().cnt;
    const dropCount = d.prepare('SELECT COUNT(*) as cnt FROM drops').get().cnt;
    const recipeCount = d.prepare('SELECT COUNT(*) as cnt FROM recipes').get().cnt;
    let guideCount = 0;
    try { guideCount = d.prepare('SELECT COUNT(*) as cnt FROM guides').get().cnt; } catch {}

    let lastRebuild = null;
    try {
      const row = d.prepare("SELECT value FROM kb_meta WHERE key = 'last_rebuild'").get();
      if (row) lastRebuild = row.value;
    } catch {}

    return { items: itemCount, npcs: npcCount, drops: dropCount, recipes: recipeCount, guides: guideCount, lastRebuild };
  } catch {
    return { items: 0, npcs: 0, drops: 0, recipes: 0, guides: 0, lastRebuild: null };
  }
}

/* ═══════════ QUERY METHODS ═══════════ */

function searchItems(query, limit = 10) {
  const d = getDb();
  // Try FTS first, fallback to LIKE
  try {
    const ftsResults = d.prepare(
      `SELECT i.* FROM items_fts f JOIN items i ON i.id = f.rowid
       WHERE items_fts MATCH ? ORDER BY rank LIMIT ?`
    ).all(query + '*', limit);
    if (ftsResults.length > 0) return ftsResults;
  } catch {}
  return d.prepare(
    'SELECT * FROM items WHERE name LIKE ? COLLATE NOCASE LIMIT ?'
  ).all(`%${query}%`, limit);
}

function getItemById(itemId) {
  const d = getDb();
  return d.prepare('SELECT * FROM items WHERE id = ?').get(itemId) || null;
}

function searchNpcs(query, limit = 10) {
  const d = getDb();
  try {
    const ftsResults = d.prepare(
      `SELECT n.* FROM npcs_fts f JOIN npcs n ON n.id = f.rowid
       WHERE npcs_fts MATCH ? ORDER BY rank LIMIT ?`
    ).all(query + '*', limit);
    if (ftsResults.length > 0) return ftsResults;
  } catch {}
  return d.prepare(
    'SELECT * FROM npcs WHERE name LIKE ? COLLATE NOCASE LIMIT ?'
  ).all(`%${query}%`, limit);
}

function getDropSources(itemId, limit = 20) {
  const d = getDb();
  return d.prepare(`
    SELECT d.*, n.name AS npc_name, n.level AS npc_level, n.type AS npc_type,
           i.name AS item_name
    FROM drops d
    JOIN npcs n ON n.id = d.npc_id
    LEFT JOIN items i ON i.id = d.item_id
    WHERE d.item_id = ?
    ORDER BY (d.group_chance * d.chance / 100) DESC
    LIMIT ?
  `).all(itemId, limit);
}

function getRecipeForItem(itemId) {
  const d = getDb();
  const recipes = d.prepare(
    'SELECT * FROM recipes WHERE production_id = ?'
  ).all(itemId);
  // Enrich ingredient names
  return recipes.map(r => {
    const ingredients = JSON.parse(r.ingredients || '[]');
    const enriched = ingredients.map(ing => {
      const item = getItemById(ing.id);
      return { ...ing, name: item ? item.name : `Item #${ing.id}` };
    });
    return { ...r, ingredients: enriched };
  });
}

function getMultisellForItem(itemId) {
  const d = getDb();
  const rows = d.prepare(
    'SELECT * FROM multisells WHERE production_id = ?'
  ).all(itemId);
  return rows.map(r => {
    const ingredients = JSON.parse(r.ingredient_items || '[]');
    const enriched = ingredients.map(ing => {
      const item = getItemById(ing.id);
      return { ...ing, name: item ? item.name : (ing.id === 57 ? 'Adena' : `Item #${ing.id}`) };
    });
    const npcIds = JSON.parse(r.npc_ids || '[]');
    return { ...r, ingredient_items: enriched, npc_ids: npcIds };
  });
}

function getBuylistForItem(itemId) {
  const d = getDb();
  return d.prepare(
    'SELECT * FROM buylists WHERE item_id = ?'
  ).all(itemId);
}

function getNpcsByLevel(minLevel, maxLevel, limit = 20) {
  const d = getDb();
  return d.prepare(
    "SELECT * FROM npcs WHERE level BETWEEN ? AND ? AND type IN ('L2Monster', 'L2RaidBoss', 'L2GrandBoss') ORDER BY level LIMIT ?"
  ).all(minLevel, maxLevel, limit);
}

function getNpcDrops(npcId) {
  const d = getDb();
  return d.prepare(`
    SELECT d.*, i.name AS item_name, i.type AS item_type, i.crystal_type
    FROM drops d
    LEFT JOIN items i ON i.id = d.item_id
    WHERE d.npc_id = ?
    ORDER BY d.drop_type, (d.group_chance * d.chance / 100) DESC
  `).all(npcId);
}

/* ═══════════ GUIDE METHODS ═══════════ */

function searchGuides(query, category, limit = 5) {
  const d = getDb();
  try {
    let sql, params;
    if (category) {
      sql = `SELECT g.* FROM guides_fts f JOIN guides g ON g.id = f.rowid
             WHERE guides_fts MATCH ? AND g.category = ? ORDER BY rank LIMIT ?`;
      params = [query + '*', category, limit];
    } else {
      sql = `SELECT g.* FROM guides_fts f JOIN guides g ON g.id = f.rowid
             WHERE guides_fts MATCH ? ORDER BY rank LIMIT ?`;
      params = [query + '*', limit];
    }
    const results = d.prepare(sql).all(...params);
    if (results.length > 0) return results;
  } catch {}
  // Fallback to LIKE
  let sql = 'SELECT * FROM guides WHERE (title LIKE ? OR tags LIKE ? OR content LIKE ?)';
  const params = [`%${query}%`, `%${query}%`, `%${query}%`];
  if (category) { sql += ' AND category = ?'; params.push(category); }
  sql += ' LIMIT ?';
  params.push(limit);
  return d.prepare(sql).all(...params);
}

function getGuideById(id) {
  const d = getDb();
  return d.prepare('SELECT * FROM guides WHERE id = ?').get(id) || null;
}

function getAllGuides() {
  const d = getDb();
  return d.prepare('SELECT id, category, title, source, created_at FROM guides ORDER BY category, title').all();
}

function addGuide(category, tags, title, content) {
  const d = getDb();
  const result = d.prepare(
    'INSERT INTO guides (category, tags, title, content, source) VALUES (?, ?, ?, ?, ?)'
  ).run(category, tags, title, content, 'custom');
  // Sync FTS
  try { d.exec("INSERT INTO guides_fts(guides_fts) VALUES('rebuild')"); } catch {}
  return result.lastInsertRowid;
}

function updateGuide(id, category, tags, title, content) {
  const d = getDb();
  d.prepare(
    'UPDATE guides SET category = ?, tags = ?, title = ?, content = ? WHERE id = ?'
  ).run(category, tags, title, content, id);
  try { d.exec("INSERT INTO guides_fts(guides_fts) VALUES('rebuild')"); } catch {}
}

function deleteGuide(id) {
  const d = getDb();
  d.prepare('DELETE FROM guides WHERE id = ?').run(id);
  try { d.exec("INSERT INTO guides_fts(guides_fts) VALUES('rebuild')"); } catch {}
}

function importBuiltinGuides() {
  const d = getDb();
  d.prepare('DELETE FROM guides WHERE source = ?').run('builtin');
  const insert = d.prepare(
    'INSERT INTO guides (category, tags, title, content, source) VALUES (?, ?, ?, ?, ?)'
  );
  const tx = d.transaction((rows) => {
    for (const g of rows) insert.run(g.category, g.tags, g.title, g.content, 'builtin');
  });
  tx(builtinGuides);
  try { d.exec("INSERT INTO guides_fts(guides_fts) VALUES('rebuild')"); } catch {}
  return builtinGuides.length;
}

module.exports = {
  rebuild,
  getRebuildStatus,
  getStats,
  searchItems,
  getItemById,
  searchNpcs,
  getDropSources,
  getRecipeForItem,
  getMultisellForItem,
  getBuylistForItem,
  getNpcsByLevel,
  getNpcDrops,
  searchGuides,
  getGuideById,
  getAllGuides,
  addGuide,
  updateGuide,
  deleteGuide,
  importBuiltinGuides,
};
