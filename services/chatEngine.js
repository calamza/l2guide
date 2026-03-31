/**
 * Chat Engine — Motor conversacional con OpenAI + fallback rule-based
 * Gestiona sesiones, tool calling, y genera respuestas contextualizadas.
 */
const queryEngine = require('./queryEngine');

let openai = null;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

// Sessions: Map<sessionId, { history: [], playerContext: {} }>
const sessions = new Map();
const SESSION_TTL = 30 * 60 * 1000; // 30 min

// Cleanup old sessions periodically
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of sessions) {
    if (now - session.lastActivity > SESSION_TTL) sessions.delete(id);
  }
}, 5 * 60 * 1000);

function getOpenAI() {
  if (openai) return openai;
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  try {
    const OpenAI = require('openai');
    openai = new OpenAI({ apiKey: key });
    return openai;
  } catch {
    return null;
  }
}

const SERVER_NAME = process.env.SERVER_NAME || 'Lineage 2 - Memories';

const SYSTEM_PROMPT = `Sos el Game Guide Bot del servidor privado de Lineage II "${SERVER_NAME}" (crónica High Five).
Tu rol es ayudar a los jugadores a encontrar items, equipamiento, información de quests, y guiarlos sobre cómo obtener lo que necesitan.

Tenés acceso a la base de datos completa del juego. Usá las herramientas disponibles para buscar items, encontrar de dónde dropean, verificar recetas y consultar tiendas.

Cuando un jugador pregunte cómo conseguir algo:
1. Buscá el item para confirmar que existe y obtener su ID
2. Verificá fuentes de drop (qué monstruos lo dropean, con rates)
3. Verificá si se puede craftear (receta, ingredientes)
4. Consultá las tiendas offline por vendedores actuales
5. Verificá tiendas de NPC
6. Si preguntan por recomendaciones de equipo, builds, o qué usar para su clase, buscá en las guías

Consideraciones importantes:
- Tené en cuenta el nivel y clase del jugador (si se conoce) al recomendar zonas de caza
- Preguntá si juega solo o en party, y si tiene otros personajes para ayudarse
- Ofrecé múltiples maneras de obtener un item (drop, craft, comprar)
- Sugerí el approach más eficiente según la situación
- Los chance de drop efectivo se calculan como: (group_chance × item_chance) / 100
- Spoil es una mecánica exclusiva de la clase Bounty Hunter/Fortune Seeker
- Para preguntas sobre builds, equipamiento recomendado, spots de caza, PvP o estrategia, usá la herramienta search_guides

Hablá en español (la comunidad del servidor es hispana). Sé amigable pero conciso.
Formateá los precios en adena. Usá bullet points para listas.
No uses markdown headers (##), solo texto plano con bullets y negritas **así**.`;

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'search_items',
      description: 'Buscar items por nombre o nombre parcial. Devuelve detalles del item incluyendo tipo, grado, stats.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Nombre del item a buscar' }
        },
        required: ['query']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_drop_sources',
      description: 'Encontrar qué monstruos dropean un item específico, con rates y niveles.',
      parameters: {
        type: 'object',
        properties: {
          item_id: { type: 'number', description: 'ID del item' },
          item_name: { type: 'string', description: 'Nombre del item (si no se tiene el ID)' }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_recipe',
      description: 'Obtener info de receta/crafteo de un item. Ingredientes y tasa de éxito.',
      parameters: {
        type: 'object',
        properties: {
          item_id: { type: 'number', description: 'ID del item' },
          item_name: { type: 'string', description: 'Nombre del item (si no se tiene el ID)' }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_offline_shops',
      description: 'Consultar si algún jugador está vendiendo un item en tiendas offline ahora mismo.',
      parameters: {
        type: 'object',
        properties: {
          item_id: { type: 'number', description: 'ID del item' },
          item_name: { type: 'string', description: 'Nombre del item (si no se tiene el ID)' }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_player_info',
      description: 'Obtener info de un personaje: clase, nivel, clan, estado online.',
      parameters: {
        type: 'object',
        properties: {
          char_name: { type: 'string', description: 'Nombre del personaje' }
        },
        required: ['char_name']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_npc_shops',
      description: 'Buscar tiendas de NPC (buylists/multisell) que vendan un item.',
      parameters: {
        type: 'object',
        properties: {
          item_id: { type: 'number', description: 'ID del item' },
          item_name: { type: 'string', description: 'Nombre del item (si no se tiene el ID)' }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'search_monsters_by_level',
      description: 'Buscar monstruos en un rango de nivel. Útil para recomendar zonas de caza.',
      parameters: {
        type: 'object',
        properties: {
          min_level: { type: 'number', description: 'Nivel mínimo del monstruo' },
          max_level: { type: 'number', description: 'Nivel máximo del monstruo' }
        },
        required: ['min_level', 'max_level']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'search_guides',
      description: 'Buscar guías tácticas y estratégicas del juego. Útil para recomendaciones de equipamiento por clase, builds, spots de caza, PvP, Olympiad, economía, subclass y más.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Texto a buscar (ej: gladiator, equipo S-grade, PvP, spots nivel 60)' },
          category: { type: 'string', description: 'Categoría opcional: progresion, clase, caza, pvp, economia, subclass, enchant, sa', enum: ['progresion', 'clase', 'caza', 'pvp', 'economia', 'subclass', 'enchant', 'sa'] }
        },
        required: ['query']
      }
    }
  },
];

/**
 * Execute a tool call from OpenAI
 */
async function executeTool(name, args) {
  switch (name) {
    case 'search_items':
      return queryEngine.searchItems(args.query);
    case 'get_drop_sources':
      return queryEngine.getDropSources(args.item_id, args.item_name);
    case 'get_recipe':
      return queryEngine.getRecipeInfo(args.item_id, args.item_name);
    case 'get_offline_shops':
      return await queryEngine.getOfflineShops(args.item_id, args.item_name);
    case 'get_player_info':
      return await queryEngine.getPlayerInfo(args.char_name);
    case 'get_npc_shops':
      return queryEngine.getNpcShops(args.item_id, args.item_name);
    case 'search_monsters_by_level':
      return queryEngine.searchMonstersByLevel(args.min_level, args.max_level);
    case 'search_guides':
      return queryEngine.searchGuides(args.query, args.category);
    default:
      return { error: `Tool "${name}" not found` };
  }
}

/**
 * Chat using OpenAI with function calling
 */
async function chatWithOpenAI(sessionId, userMessage, playerContext) {
  const client = getOpenAI();
  if (!client) return null; // Fallback to rule-based

  let session = sessions.get(sessionId);
  if (!session) {
    session = { history: [], playerContext, lastActivity: Date.now() };
    sessions.set(sessionId, session);
  }
  session.lastActivity = Date.now();
  if (playerContext) session.playerContext = playerContext;

  // Build system prompt with player context
  let systemPrompt = SYSTEM_PROMPT;
  if (session.playerContext && session.playerContext.name) {
    const p = session.playerContext;
    systemPrompt += `\n\nContexto del jugador actual:
- Nombre: ${p.name}
- Nivel: ${p.level}
- Clase: ${p.className} (${p.race}, ${p.classType})
- Clan: ${p.clan || 'Sin clan'}${p.ally ? ' | Alianza: ' + p.ally : ''}`;
  }

  // Add user message to history
  session.history.push({ role: 'user', content: userMessage });

  // Keep history manageable (last 20 messages)
  if (session.history.length > 20) {
    session.history = session.history.slice(-20);
  }

  const messages = [
    { role: 'system', content: systemPrompt },
    ...session.history,
  ];

  try {
    let response = await client.chat.completions.create({
      model: MODEL,
      messages,
      tools: TOOLS,
      temperature: 0.7,
      max_tokens: 1500,
    });

    let msg = response.choices[0].message;
    let iterations = 0;

    // Handle tool calls (loop for multi-step reasoning)
    while (msg.tool_calls && msg.tool_calls.length > 0 && iterations < 5) {
      iterations++;
      session.history.push(msg);

      for (const tc of msg.tool_calls) {
        const args = JSON.parse(tc.function.arguments);
        const result = await executeTool(tc.function.name, args);
        session.history.push({
          role: 'tool',
          tool_call_id: tc.id,
          content: JSON.stringify(result),
        });
      }

      const followUp = await client.chat.completions.create({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          ...session.history,
        ],
        tools: TOOLS,
        temperature: 0.7,
        max_tokens: 1500,
      });

      msg = followUp.choices[0].message;
    }

    const reply = msg.content || 'No pude generar una respuesta.';
    session.history.push({ role: 'assistant', content: reply });
    return reply;

  } catch (err) {
    console.error('[ChatEngine] OpenAI error:', err.message);
    return null; // Fallback to rule-based
  }
}

/**
 * Rule-based fallback when OpenAI is not available
 */
async function chatRuleBased(userMessage, playerContext) {
  const msg = userMessage.toLowerCase().trim();
  const parts = [];

  // Detect intent
  const isDropQuestion = /d(o|ó)nde|drop|dropea|consigo|conseguir|obtener|farmear|cae/.test(msg);
  const isCraftQuestion = /craft|receta|recipe|crear|fabricar/.test(msg);
  const isShopQuestion = /comprar|vende|tienda|shop|precio/.test(msg);
  const isPlayerQuestion = /info|personaje|nivel|level|clase|class/.test(msg);
  const isHuntQuestion = /cazar|hunt|zona|mobs?|monstruos?|exp|grind/.test(msg);
  const isGuideQuestion = /gu(i|í)a|build|equipamiento|equipo|recomend|mejor|pvp|olympiad|subclass|enchant|sa |habilidad|spot|farm|econom/.test(msg);

  // Extract potential item/NPC name (remove common words)
  const cleanMsg = msg
    .replace(/\b(donde|como|puedo|conseguir|obtener|el|la|los|las|un|una|del|de|en|a|por|para|que|se|me|mi|con|sin|hay|alguien|vende|tiene|necesito|quiero|busco|dropea|farmear|craftear|cae|comprar)\b/gi, '')
    .trim();

  // Search for items matching the cleaned query
  let items = [];
  if (cleanMsg.length >= 2) {
    items = queryEngine.searchItems(cleanMsg);
  }

  if (items.length > 0) {
    const item = items[0];

    parts.push(`🔍 **${item.name}** (ID: ${item.id})`);
    parts.push(`• Tipo: ${item.type} | Grado: ${item.grade}`);
    if (item.weapon_type) parts.push(`• Arma: ${item.weapon_type}`);
    if (item.armor_type) parts.push(`• Armadura: ${item.armor_type}`);
    if (item.price > 0) parts.push(`• Precio NPC: ${Number(item.price).toLocaleString()} adena`);

    // Drop sources
    if (isDropQuestion || (!isCraftQuestion && !isShopQuestion)) {
      const drops = queryEngine.getDropSources(item.id);
      if (drops.length > 0) {
        parts.push('');
        parts.push('⚔️ **Fuentes de drop:**');
        const topDrops = drops.slice(0, 8);
        for (const d of topDrops) {
          const effective = ((d.effectiveChance)).toFixed(4);
          const tag = d.isRaidBoss ? ' 👑' : '';
          const typeTag = d.dropType === 'spoil' ? ' [SPOIL]' : d.dropType === 'corpse' ? ' [CORPSE]' : '';
          parts.push(`• ${d.npcName} (lvl ${d.npcLevel})${tag}${typeTag} — ${effective}% (x${d.minCount}-${d.maxCount})`);
        }
        if (drops.length > 8) parts.push(`  ... y ${drops.length - 8} fuentes más.`);
      }
    }

    // Recipe
    if (isCraftQuestion || (!isDropQuestion && !isShopQuestion)) {
      const recipes = queryEngine.getRecipeInfo(item.id);
      if (Array.isArray(recipes) && recipes.length > 0) {
        parts.push('');
        parts.push('🔨 **Crafteo:**');
        for (const r of recipes) {
          parts.push(`• Receta: ${r.recipeName} (${r.type})`);
          parts.push(`  Nivel craft: ${r.craftLevel} | Éxito: ${r.successRate}% | MP: ${r.mpCost}`);
          parts.push('  Ingredientes:');
          for (const ing of r.ingredients) {
            parts.push(`    - ${ing.name} x${ing.count}`);
          }
        }
      }
    }

    // Offline shops
    if (isShopQuestion || (!isDropQuestion && !isCraftQuestion)) {
      try {
        const shops = await queryEngine.getOfflineShops(item.id);
        if (Array.isArray(shops) && shops.length > 0) {
          parts.push('');
          parts.push('🏪 **Tiendas offline ahora:**');
          for (const s of shops) {
            parts.push(`• ${s.seller} en ${s.location} — ${Number(s.price).toLocaleString()} adena (x${s.count})`);
          }
        }
      } catch {}
    }

    // NPC shops
    const npcShops = queryEngine.getNpcShops(item.id);
    if (Array.isArray(npcShops) && npcShops.length > 0) {
      parts.push('');
      parts.push('🏬 **Tiendas de NPC:**');
      for (const s of npcShops) {
        if (s.type === 'buylist') {
          parts.push(`• Buylist — ${Number(s.price).toLocaleString()} adena`);
        } else {
          const costStr = s.cost.map(c => `${c.name} x${c.count}`).join(' + ');
          parts.push(`• Multisell — Costo: ${costStr}`);
        }
      }
    }

  } else if (isHuntQuestion && playerContext) {
    // Hunt zone recommendation
    const lvl = playerContext.level || 1;
    const monsters = queryEngine.searchMonstersByLevel(lvl - 5, lvl + 5);
    if (monsters.length > 0) {
      parts.push(`🗡️ **Monstruos para tu nivel (${lvl}):**`);
      for (const m of monsters.slice(0, 10)) {
        const tag = m.isRaidBoss ? ' 👑' : '';
        parts.push(`• ${m.name} (lvl ${m.level})${tag}`);
      }
    } else {
      parts.push(`No encontré monstruos para el rango de nivel ${lvl - 5} a ${lvl + 5}.`);
    }

  } else if (isPlayerQuestion && cleanMsg.length > 0) {
    const info = await queryEngine.getPlayerInfo(cleanMsg);
    if (info && !info.error) {
      parts.push(`👤 **${info.name}**`);
      parts.push(`• Nivel: ${info.level} | Clase: ${info.className}`);
      parts.push(`• Raza: ${info.race} | Tipo: ${info.classType}`);
      parts.push(`• Clan: ${info.clan || 'Sin clan'}${info.ally ? ' | Alianza: ' + info.ally : ''}`);
      parts.push(`• PvP: ${info.pvpKills} | PK: ${info.pkKills}`);
      parts.push(`• Estado: ${info.online ? '🟢 Online' : '⚫ Offline'}`);
    }
  }

  // Guide search (fallback: try guides if nothing else matched, or if explicitly a guide question)
  if (parts.length === 0 || isGuideQuestion) {
    const guideQuery = cleanMsg.length >= 2 ? cleanMsg : msg;
    const guides = queryEngine.searchGuides(guideQuery);
    if (Array.isArray(guides) && guides.length > 0) {
      if (parts.length > 0) parts.push('');
      parts.push('📖 **Guías relacionadas:**');
      for (const g of guides.slice(0, 3)) {
        parts.push('');
        parts.push(`**${g.title}**`);
        // Show first 500 chars of content
        const preview = g.content.length > 500 ? g.content.substring(0, 500) + '...' : g.content;
        parts.push(preview);
      }
    }
  }

  if (parts.length === 0) {
    return '¡Hola! Soy el bot guía del servidor. Puedo ayudarte a:\n'
      + '• Buscar dónde conseguir un item (ej: "¿dónde consigo Draconic Bow?")\n'
      + '• Ver recetas de crafteo (ej: "receta Dynasty Sword")\n'
      + '• Consultar tiendas offline (ej: "¿alguien vende Soul Bow?")\n'
      + '• Info de monstruos por nivel\n'
      + '• Info de personajes\n\n'
      + 'Contame, ¿qué necesitás?';
  }

  return parts.join('\n');
}

/**
 * Main chat function — tries OpenAI first, falls back to rule-based
 */
async function chat(sessionId, userMessage, playerContext) {
  // Try OpenAI first
  const aiResponse = await chatWithOpenAI(sessionId, userMessage, playerContext);
  if (aiResponse) return { response: aiResponse, engine: 'openai' };

  // Fallback to rule-based
  const rbResponse = await chatRuleBased(userMessage, playerContext);
  return { response: rbResponse, engine: 'rule-based' };
}

/**
 * Clear a session
 */
function clearSession(sessionId) {
  sessions.delete(sessionId);
}

module.exports = { chat, clearSession };
