/**
 * Datapack XML Parser — Parsea los XMLs del L2J datapack
 * Items, NPCs (con drops), Recipes, Multisells, Buylists
 */
const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  isArray: (name) => ['item', 'set', 'npc', 'group', 'ingredient', 'production', 'skill'].includes(name),
  parseAttributeValue: true,
});

function readXmlFiles(dir) {
  console.log(`[Parser] Buscando XMLs en: ${dir}`);
  if (!fs.existsSync(dir)) {
    console.warn(`[Parser] ⚠ Directorio NO existe: ${dir}`);
    // Try listing parent to help diagnose
    const parent = path.dirname(dir);
    if (fs.existsSync(parent)) {
      console.log(`[Parser] Contenido de ${parent}:`, fs.readdirSync(parent));
    } else {
      const grandparent = path.dirname(parent);
      if (fs.existsSync(grandparent)) {
        console.log(`[Parser] Contenido de ${grandparent}:`, fs.readdirSync(grandparent));
      }
    }
    return [];
  }
  const xmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.xml'));
  console.log(`[Parser] Encontrados ${xmlFiles.length} archivos XML en ${dir}`);
  return xmlFiles
    .map(f => {
      try {
        const content = fs.readFileSync(path.join(dir, f), 'utf-8');
        return xmlParser.parse(content);
      } catch (err) {
        console.warn(`[Parser] Error leyendo ${f}:`, err.message);
        return null;
      }
    })
    .filter(Boolean);
}

/* ═══════════ ITEMS ═══════════ */
function parseItems(datapackPath) {
  console.log(`[Parser] parseItems llamado con datapackPath: ${datapackPath}`);
  console.log(`[Parser] datapackPath existe: ${fs.existsSync(datapackPath)}`);
  if (fs.existsSync(datapackPath)) {
    console.log(`[Parser] Contenido raíz de datapack:`, fs.readdirSync(datapackPath));
  }
  const dir = path.join(datapackPath, 'data', 'stats', 'items');
  const parsed = readXmlFiles(dir);
  const items = [];

  for (const doc of parsed) {
    const list = doc.list;
    if (!list || !list.item) continue;
    const xmlItems = Array.isArray(list.item) ? list.item : [list.item];

    for (const it of xmlItems) {
      const id = it['@_id'];
      const name = it['@_name'] || '';
      const type = it['@_type'] || '';

      // Parse set elements
      const sets = {};
      if (it.set) {
        const setArr = Array.isArray(it.set) ? it.set : [it.set];
        for (const s of setArr) {
          const sName = s['@_name'];
          const sVal = s['@_val'];
          if (sName && sVal !== undefined) sets[sName] = sVal;
        }
      }

      // Parse stats from <for> block
      const stats = {};
      if (it.for) {
        const forBlock = Array.isArray(it.for) ? it.for[0] : it.for;
        if (forBlock && forBlock.set) {
          const forSets = Array.isArray(forBlock.set) ? forBlock.set : [forBlock.set];
          for (const s of forSets) {
            const statName = s['@_stat'] || s['@_name'];
            const statVal = s['@_val'];
            if (statName && statVal !== undefined) stats[statName] = statVal;
          }
        }
      }

      items.push({
        id,
        name,
        type,
        weapon_type: sets.weapon_type || null,
        armor_type: sets.armor_type || null,
        bodypart: sets.bodypart || null,
        crystal_type: sets.crystal_type || 'NONE',
        weight: parseInt(sets.weight) || 0,
        price: parseInt(sets.price) || 0,
        material: sets.material || null,
        stats: Object.keys(stats).length > 0 ? JSON.stringify(stats) : null,
      });
    }
  }

  console.log(`[Parser] Items parseados: ${items.length}`);
  return items;
}

/* ═══════════ NPCs + DROPS ═══════════ */
function parseNpcs(datapackPath) {
  const dir = path.join(datapackPath, 'data', 'stats', 'npcs');
  const parsed = readXmlFiles(dir);
  const npcs = [];
  const drops = [];

  for (const doc of parsed) {
    const list = doc.list;
    if (!list || !list.npc) continue;
    const xmlNpcs = Array.isArray(list.npc) ? list.npc : [list.npc];

    for (const n of xmlNpcs) {
      const id = n['@_id'];
      const name = n['@_name'] || '';
      const level = n['@_level'] || 0;
      const type = n['@_type'] || '';

      let race = '';
      if (n.race) race = typeof n.race === 'string' ? n.race : '';

      let expRate = 0, sp = 0;
      if (n.acquire) {
        const acq = Array.isArray(n.acquire) ? n.acquire[0] : n.acquire;
        expRate = acq['@_expRate'] || 0;
        sp = acq['@_sp'] || 0;
      }

      npcs.push({ id, name, level, type, race, exp_rate: expRate, sp });

      // Parse drop lists
      if (n.dropLists) {
        const dl = n.dropLists;

        // Death drops (grouped)
        if (dl.death) {
          const death = dl.death;
          if (death.group) {
            const groups = Array.isArray(death.group) ? death.group : [death.group];
            for (const g of groups) {
              const groupChance = parseFloat(g['@_chance']) || 0;
              if (g.item) {
                const gItems = Array.isArray(g.item) ? g.item : [g.item];
                for (const di of gItems) {
                  drops.push({
                    npc_id: id,
                    item_id: di['@_id'],
                    min_count: di['@_min'] || 1,
                    max_count: di['@_max'] || 1,
                    chance: parseFloat(di['@_chance']) || 0,
                    drop_type: 'death',
                    group_chance: groupChance,
                  });
                }
              }
            }
          }
          // Ungrouped items directly under death
          if (death.item) {
            const dItems = Array.isArray(death.item) ? death.item : [death.item];
            for (const di of dItems) {
              drops.push({
                npc_id: id,
                item_id: di['@_id'],
                min_count: di['@_min'] || 1,
                max_count: di['@_max'] || 1,
                chance: parseFloat(di['@_chance']) || 0,
                drop_type: 'death',
                group_chance: 100,
              });
            }
          }
        }

        // Corpse drops
        if (dl.corpse) {
          const corpse = dl.corpse;
          if (corpse.item) {
            const cItems = Array.isArray(corpse.item) ? corpse.item : [corpse.item];
            for (const ci of cItems) {
              drops.push({
                npc_id: id,
                item_id: ci['@_id'],
                min_count: ci['@_min'] || 1,
                max_count: ci['@_max'] || 1,
                chance: parseFloat(ci['@_chance']) || 0,
                drop_type: 'corpse',
                group_chance: 100,
              });
            }
          }
        }

        // Spoil drops
        if (dl.spoil) {
          const spoil = dl.spoil;
          if (spoil.item) {
            const sItems = Array.isArray(spoil.item) ? spoil.item : [spoil.item];
            for (const si of sItems) {
              drops.push({
                npc_id: id,
                item_id: si['@_id'],
                min_count: si['@_min'] || 1,
                max_count: si['@_max'] || 1,
                chance: parseFloat(si['@_chance']) || 0,
                drop_type: 'spoil',
                group_chance: 100,
              });
            }
          }
        }
      }
    }
  }

  console.log(`[Parser] NPCs parseados: ${npcs.length}, drops: ${drops.length}`);
  return { npcs, drops };
}

/* ═══════════ RECIPES ═══════════ */
function parseRecipes(datapackPath) {
  const file = path.join(datapackPath, 'data', 'recipes.xml');
  if (!fs.existsSync(file)) return [];

  const content = fs.readFileSync(file, 'utf-8');
  const doc = xmlParser.parse(content);
  const recipes = [];

  const list = doc.list;
  if (!list || !list.item) return recipes;
  const xmlItems = Array.isArray(list.item) ? list.item : [list.item];

  for (const r of xmlItems) {
    const ingredients = [];
    if (r.ingredient) {
      const ings = Array.isArray(r.ingredient) ? r.ingredient : [r.ingredient];
      for (const ing of ings) {
        ingredients.push({ id: ing['@_id'], count: ing['@_count'] || 1 });
      }
    }

    let productionId = 0, productionCount = 1;
    if (r.production) {
      const prod = Array.isArray(r.production) ? r.production[0] : r.production;
      productionId = prod['@_id'] || 0;
      productionCount = prod['@_count'] || 1;
    }

    let mpCost = 0;
    if (r.statUse) {
      const su = Array.isArray(r.statUse) ? r.statUse[0] : r.statUse;
      if (su['@_name'] === 'MP') mpCost = su['@_value'] || 0;
    }

    recipes.push({
      id: r['@_id'],
      recipe_id: r['@_recipeId'] || 0,
      name: r['@_name'] || '',
      craft_level: r['@_craftLevel'] || 0,
      type: r['@_type'] || 'dwarven',
      success_rate: r['@_successRate'] || 100,
      production_id: productionId,
      production_count: productionCount,
      mp_cost: mpCost,
      ingredients: JSON.stringify(ingredients),
    });
  }

  console.log(`[Parser] Recipes parseados: ${recipes.length}`);
  return recipes;
}

/* ═══════════ MULTISELLS ═══════════ */
function parseMultisells(datapackPath) {
  const dir = path.join(datapackPath, 'data', 'multisell');
  const parsed = readXmlFiles(dir);
  const multisells = [];

  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.xml')) : [];

  for (let i = 0; i < files.length; i++) {
    const doc = parsed[i];
    if (!doc) continue;
    const listId = parseInt(path.basename(files[i], '.xml')) || i;
    const list = doc.list;
    if (!list) continue;

    // NPC IDs
    let npcIds = [];
    if (list.npcs) {
      const npcs = list.npcs;
      if (npcs.npc) {
        const nArr = Array.isArray(npcs.npc) ? npcs.npc : [npcs.npc];
        npcIds = nArr.map(n => typeof n === 'object' ? n['#text'] || n : n);
      }
    }

    if (!list.item) continue;
    const xmlItems = Array.isArray(list.item) ? list.item : [list.item];

    for (const it of xmlItems) {
      const ingredientItems = [];
      if (it.ingredient) {
        const ings = Array.isArray(it.ingredient) ? it.ingredient : [it.ingredient];
        for (const ing of ings) {
          ingredientItems.push({ id: ing['@_id'], count: ing['@_count'] || 1 });
        }
      }

      let productionId = 0, productionCount = 1;
      if (it.production) {
        const prods = Array.isArray(it.production) ? it.production : [it.production];
        const prod = prods[0];
        productionId = prod['@_id'] || 0;
        productionCount = prod['@_count'] || 1;
      }

      multisells.push({
        list_id: listId,
        npc_ids: JSON.stringify(npcIds),
        ingredient_items: JSON.stringify(ingredientItems),
        production_id: productionId,
        production_count: productionCount,
      });
    }
  }

  console.log(`[Parser] Multisells parseados: ${multisells.length}`);
  return multisells;
}

/* ═══════════ BUYLISTS ═══════════ */
function parseBuylists(datapackPath) {
  const dir = path.join(datapackPath, 'data', 'buylists');
  const buylists = [];

  if (!fs.existsSync(dir)) return buylists;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.xml'));

  for (const f of files) {
    try {
      const content = fs.readFileSync(path.join(dir, f), 'utf-8');
      const doc = xmlParser.parse(content);
      const listId = parseInt(path.basename(f, '.xml')) || 0;
      const list = doc.list;
      if (!list || !list.item) continue;

      const xmlItems = Array.isArray(list.item) ? list.item : [list.item];
      for (const it of xmlItems) {
        buylists.push({
          list_id: listId,
          item_id: it['@_id'],
          price: it['@_price'] || 0,
        });
      }
    } catch (err) {
      console.warn(`[Parser] Error leyendo buylist ${f}:`, err.message);
    }
  }

  console.log(`[Parser] Buylists parseados: ${buylists.length}`);
  return buylists;
}

module.exports = { parseItems, parseNpcs, parseRecipes, parseMultisells, parseBuylists };
