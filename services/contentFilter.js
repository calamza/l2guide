/**
 * Content Filter — Detecta contenido ofensivo y preguntas no relacionadas al juego
 * Retorna: { allowed: bool, flagged: bool, flagReason: 'offensive'|'off_topic'|null, detail: string }
 */

// ── Palabras y patrones ofensivos (español + inglés) ──────────────────
const OFFENSIVE_PATTERNS = [
  // Insultos graves / odio
  /\b(put[ao]|hijos?\s*de\s*put[ao]|la?\s*concha\s*(de\s*tu|tuya)|hijo\s*de\s*mil|forro|pelotud[oa]|bolud[oa]|tarad[oa]|mogolic[oa]|retrasad[oa]|subnormal)\b/i,
  /\b(nigger|nigga|faggot|retard|kys|kill\s*yourself)\b/i,
  // Sexual explícito
  /\b(porn[oa]?|porno|sexo\s*anal|masturb|orgasm|orgías|hentai|xxx|nudes?|desnud[oa]s?)\b/i,
  /\b(pija|verga|concha|tetas?|culo|cog[eé]r|culia[rdos]|chup[aá]me|mam[aá]me)\b/i,
  // Violencia extrema / amenazas
  /\b(te\s*voy\s*a\s*matar|voy\s*a\s*matart?e|bomb[ae]|terroris|masacr[ae]|decapit)\b/i,
  // Discriminación
  /\b(negr[oa]\s*de\s*mierda|ind[ioí]o?\s*de\s*mierda|bolita|paragua|peruan[oa]\s*de\s*mierda)\b/i,
  // Drogas ilegales (compra/venta, no referencia casual)
  /\b(vend[eoí]\s*(merca|coca[ií]na|porro|marihuana|pasta\s*base|crack)|compr[aáo]\s*(merca|coca[ií]na|porro))\b/i,
];

// ── Términos del juego Lineage 2 (para validar relevancia) ───────────
const GAME_KEYWORDS = [
  // General L2
  /\b(lineage|l2|l2j|high\s*five|interlude|memories)\b/i,
  // Gameplay
  /\b(item|items|drop|dropea|spoil|craft|receta|recipe|enchant|arma|armadura|weapon|armor|joya|jewel|set|grade|grado)\b/i,
  /\b(monstruo|monster|mob|boss|raid\s*boss|grandboss|npc|quest|misi[oó]n)\b/i,
  /\b(clase|class|subclass|skill|habilidad|buff|debuff|heal|tank|mage|archer|warrior|dagger)\b/i,
  /\b(clan|ally|alianza|siege|castle|fortress|territory|olympiad|pvp|pk)\b/i,
  /\b(adena|soul\s*shot|spirit\s*shot|blessed|scroll|potion|elixir|crystal)\b/i,
  /\b(exp|sp|nivel|level|lvl|farm|grind|spot|zona|caza|hunt)\b/i,
  /\b(dwarven|bounty\s*hunter|warsmith|spoiler|fortune\s*seeker|maestro)\b/i,
  /\b(tienda|shop|offline|comprar|vender|precio|trade|manor|seven\s*signs)\b/i,
  // Clases conocidas
  /\b(gladiator|warlord|paladin|dark\s*avenger|treasure\s*hunter|hawkeye|sorcerer|necromancer|bishop|prophet|elder|warlock|destroyer|tyrant|overlord|warcryer|berserker|arbalester|inspector|phantom\s*ranger|bladedancer|swordsinger|spellsinger|spellhowler|shillien)\b/i,
  // Items conocidos
  /\b(draconic|dynasty|vesper|icarus|moirai|vorpal|elegia|amaranthine|s.?grade|a.?grade|b.?grade|c.?grade|d.?grade|no.?grade|s80|s84)\b/i,
  // Zonas
  /\b(giran|aden|rune|goddard|gludio|dion|oren|schuttgart|heine|hunters?\s*village|floran|ketra|varka|primeval|dragon\s*valley|forge\s*of\s*the\s*gods|antharas|valakas|baium|zaken|frintezza)\b/i,
  // Acciones de juego
  /\b(gu[ií]a|guide|build|equipamiento|equipo|recomend|mejora|mejor|peor|stats?|atribut|dps|defensa|evasi[oó]n|critical|speed|cast|attack)\b/i,
  // Bot / guia contextual
  /\b(bot|ayuda|help|pregunta|duda|consejo|tip|info|tutorial)\b/i,
  // Saludos / interacciones básicas (permitidas)
  /\b(hola|buenas|buen\s*d[ií]a|gracias|chau|adi[oó]s|dale|ok[ay]?|s[ií]|no)\b/i,
];

// ── Cantidad mínima de palabras para evaluar off-topic ───────────────
const MIN_WORDS_FOR_TOPIC_CHECK = 3;

/**
 * Analiza un mensaje del usuario y determina si debe ser filtrado
 * @param {string} message - Mensaje del usuario
 * @returns {{ allowed: boolean, flagged: boolean, flagReason: string|null, detail: string }}
 */
function analyzeMessage(message) {
  if (!message || typeof message !== 'string') {
    return { allowed: false, flagged: true, flagReason: 'offensive', detail: 'Mensaje vacío o inválido.' };
  }

  const text = message.trim();

  // 1) Verificar contenido ofensivo
  for (const pattern of OFFENSIVE_PATTERNS) {
    if (pattern.test(text)) {
      return {
        allowed: false,
        flagged: true,
        flagReason: 'offensive',
        detail: 'Se detectó contenido ofensivo o inapropiado.',
      };
    }
  }

  // 2) Verificar relevancia al juego (solo si el mensaje tiene suficientes palabras)
  const wordCount = text.split(/\s+/).length;
  if (wordCount >= MIN_WORDS_FOR_TOPIC_CHECK) {
    const isGameRelated = GAME_KEYWORDS.some(pattern => pattern.test(text));
    if (!isGameRelated) {
      return {
        allowed: false,
        flagged: true,
        flagReason: 'off_topic',
        detail: 'La pregunta no parece estar relacionada con Lineage 2.',
      };
    }
  }

  // 3) Mensaje permitido
  return { allowed: true, flagged: false, flagReason: null, detail: '' };
}

module.exports = { analyzeMessage };
