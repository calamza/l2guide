/**
 * Base de datos de quests para el L2 Guide Bot.
 * Cada quest tiene info detallada para poder responder consultas de jugadores.
 */

const QUEST_GUIDES = [
  // ═══════════════════════════════════════════════════════════════
  // SUBCLASS & NOBLESSE (las más consultadas)
  // ═══════════════════════════════════════════════════════════════
  {
    category: 'quest',
    tags: 'quest subclass subclase fates whisper desbloquear requisito raidboss baium 234',
    title: "Quest: Fate's Whisper (Subclass)",
    content: `**Fate's Whisper (Quest 234) — Desbloquear Subclass**

**Nivel requerido:** 75
**NPC de inicio:** Maestro Reorin — Ivory Tower (Oren)
**Clases:** Todas

**Descripción:**
Quest OBLIGATORIA para desbloquear el sistema de subclases. Es una de las quests más importantes del juego.

**Pasos principales:**
1. Hablar con Maestro Reorin en Ivory Tower
2. Matar los siguientes Raid Bosses y obtener items:
   - Baium (Grand Boss) — necesitás un grupo grande
   - Obtener varios quest items de diferentes Raid Bosses
3. Recolectar materiales especiales
4. Volver a Reorin para recibir el Star of Destiny

**Recompensas:**
- Star of Destiny (permite cambiar a subclass)
- Acceso al sistema de Subclass

**Tips:**
- Conseguí un grupo organizado para Baium, es Grand Boss
- Guardá todos los quest items, no los vendas
- Una vez completada, podés elegir tu subclass hablando con el Village Master de tu raza`
  },
  {
    category: 'quest',
    tags: 'quest noblesse nobleza subclass precious soul alma preciosa 241 242 246 247 completa cadena',
    title: 'Quest: Possessor of a Precious Soul (Noblesse)',
    content: `**Possessor of a Precious Soul (Quests 241-247) — Obtener Noblesse**

**Nivel requerido:** Subclass nivel 50/60/65/75 (progresivo)
**NPC de inicio:** Caradine (aparece aleatoriamente en Aden)
**Clases:** Todas (requiere subclass activa)

**Descripción:**
Cadena de 4 quests para obtener el estatus de Noblesse. Es la quest más importante del endgame.

**Parte 1 (Q241) — Nivel 50 de subclass:**
- Hablar con Caradine
- Cazar mobs específicos para obtener quest items
- Completar tareas de recolección

**Parte 2 (Q242) — Nivel 60 de subclass:**
- Continuar la cadena con más desafíos
- Matar mobs de nivel más alto

**Parte 3 (Q246) — Nivel 65 de subclass:**
- Tareas más complejas
- Requiere viajar a varias locaciones

**Parte 4 (Q247) — Nivel 75 de subclass:**
- Parte final, la más difícil
- Al completarla obtenés Noblesse

**Recompensas finales:**
- 🏆 **Noblesse Status**
- Acceso a **Olympiad** (PvP competitivo)
- **Noblesse Skills** (Fortune of Noblesse, Harmony, Symphony)
- Noblesse Gate Pass (teleport gratuito desde cualquier lugar)

**Tips:**
- Empezá esta cadena apenas tu subclass llegue a 50
- No importa qué subclass uses, solo el nivel
- Al ser Noblesse, tenés acceso a Olympiad y skills muy útiles para PvP`
  },

  // ═══════════════════════════════════════════════════════════════
  // HELLBOUND
  // ═══════════════════════════════════════════════════════════════
  {
    category: 'quest',
    tags: 'quest hellbound acceso path entrada continente como llegar 130',
    title: 'Quest: Path to Hellbound',
    content: `**Path to Hellbound (Quest 130) — Acceso al Continente**

**Nivel requerido:** 78
**NPC de inicio:** Casian — Rune Township
**Clases:** Todas

**Descripción:**
Quest imprescindible para acceder al continente de Hellbound. Sin ella no podés entrar a las zonas de farming y raids de alto nivel.

**Pasos:**
1. Hablar con Casian en Rune Township
2. Viajar a Kief en el puerto de la ciudad
3. Completar las tareas indicadas
4. Obtener la Magic Bottle como acceso

**Recompensas:**
- Acceso a Hellbound
- Magic Bottle

**Sobre Hellbound:**
- Hellbound tiene un sistema de Trust Level (nivel de confianza)
- A mayor Trust Level, se desbloquean más zonas y NPCs
- Las mejores zonas de farming 80+ están acá
- Vesper equipment (top S80) se farmea en Hellbound
- Para subir Trust Level, hacé las quests "That's Bloody Hot!" (Q133) y "How to Oppose Evil" (Q692)`
  },
  {
    category: 'quest',
    tags: 'quest hellbound trust level confianza bloody hot subir nivel 133',
    title: "Quest: That's Bloody Hot! (Hellbound Trust)",
    content: `**That's Bloody Hot! (Quest 133) — Trust Level de Hellbound**

**Nivel requerido:** 78
**NPC de inicio:** Galate — Hellbound (Native Village)
**Clases:** Todas

**Descripción:**
Quest para aumentar el Trust Level de Hellbound. Cada nivel de confianza desbloquea nuevas zonas.

**Niveles de Trust y zonas:**
- Level 0-3: Entrada y Native Village
- Level 4-5: Chimera zones (buen farming)
- Level 6-7: Baylor's Dungeon access
- Level 8-9: Steel Citadel
- Level 10: Tully's Workshop (top endgame farming)

**Tips:**
- Combiná con Q692 "How to Oppose Evil" para subir Trust más rápido
- El Trust Level es global del servidor, todos contribuyen
- Una vez que el servidor sube de nivel, no baja`
  },

  // ═══════════════════════════════════════════════════════════════
  // RAID ACCESS
  // ═══════════════════════════════════════════════════════════════
  {
    category: 'quest',
    tags: 'quest antharas dragon raid boss acceso epic 903 call',
    title: 'Quest: The Call of Antharas',
    content: `**The Call of Antharas (Quest 903) — Acceso al Raid**

**Nivel requerido:** 83
**NPC de inicio:** Watcher of Antharas Theodore — Giran
**Clases:** Todas

**Descripción:**
Quest necesaria para poder entrar a la instancia de Antharas.

**Recompensas:**
- Portal Stone: Antharas (acceso a la instancia)

**Sobre Antharas:**
- Grand Boss de nivel 79, uno de los más poderosos
- Requiere un raid organizado de múltiples parties
- Dropea joyas épicas (Antharas Earring) y materiales raros
- También hay quests post-kill: Land Dragon Conqueror (Q10290) para Antharas Cloak y Jewel of Antharas (Q10504)`
  },
  {
    category: 'quest',
    tags: 'quest valakas dragon fuego fire raid boss acceso epic 906 call',
    title: 'Quest: The Call of Valakas',
    content: `**The Call of Valakas (Quest 906) — Acceso al Raid**

**Nivel requerido:** 83
**NPC de inicio:** Watcher of Valakas Klein — Forge of the Gods
**Clases:** Todas

**Descripción:**
Quest necesaria para poder entrar a la instancia de Valakas, el dragón de fuego.

**Recompensas:**
- Portal Stone: Valakas (acceso a la instancia)

**Sobre Valakas:**
- Grand Boss de nivel 85, el más difícil del juego
- Requiere raid masivo y muy bien organizado
- Dropea Valakas Necklace (mejores stats del juego) y materiales SA
- Post-kill: Fire Dragon Destroyer (Q10291) para Valakas Cloak y Jewel of Valakas (Q10505)`
  },
  {
    category: 'quest',
    tags: 'quest legendary tales cloak capa hero raid boss 254',
    title: 'Quest: Legendary Tales (Cloak of Hero)',
    content: `**Legendary Tales (Quest 254) — Cloak of Hero**

**Nivel requerido:** 80
**NPC de inicio:** Gilmore — Aden
**Clases:** Todas

**Descripción:**
Quest para obtener la Cloak of Hero, una de las mejores capas del juego.

**Requisitos:**
- Matar varios Raid Bosses épicos
- Recolectar proof items de cada kill

**Recompensas:**
- 🏆 Cloak of Hero (stats permanentes)

**Tips:**
- Necesitás un clan o grupo organizado
- Los Raid Bosses tienen respawn largo, coordiná con tu clan`
  },
  {
    category: 'quest',
    tags: 'quest four goblets sepulchers frintezza imperial tomb acceso 620',
    title: 'Quest: Four Goblets (Four Sepulchers)',
    content: `**Four Goblets (Quest 620) — Four Sepulchers / Frintezza**

**Nivel requerido:** 74
**NPC de inicio:** Nameless Spirit — Imperial Tomb
**Clases:** Todas

**Descripción:**
Quest para acceder a los Four Sepulchers. Es la ruta hacia el raid de Frintezza.

**Sobre Four Sepulchers:**
- 4 dungeons con diferentes jefes
- Se accede mediante goblets que se obtienen en la quest
- Es la antesala de Frintezza, uno de los raids más populares
- Frintezza dropea Frintezza's Necklace (épico) y la Embroidered Soul Cloak`
  },

  // ═══════════════════════════════════════════════════════════════
  // GRACIA & SEEDS
  // ═══════════════════════════════════════════════════════════════
  {
    category: 'quest',
    tags: 'quest gracia viaje continente seed infinity destruction acceso 10267 10268 10269',
    title: 'Quests: Acceso a Gracia (Seeds)',
    content: `**Acceso a Gracia y Seeds (Quests 10267-10269)**

**Nivel requerido:** 75
**NPC de inicio:** Orven — Aden
**Clases:** Todas

**Journey to Gracia (Q10267):**
- Quest para viajar al continente de Gracia
- Hablar con Orven en Aden y seguir las instrucciones
- Una vez completada, podés viajar a Gracia desde el puerto

**To the Seed of Infinity (Q10268):**
- Acceso al Seed of Infinity
- Contiene: Hall of Suffering, Hall of Erosion
- Farming de Moirai Set (armadura S80 accesible)
- Muy buenos EXP y rewards

**To the Seed of Destruction (Q10269):**
- Acceso al Seed of Destruction
- Boss final: Tiat
- Requiere grupo organizado
- Rewards: Vesper materials, EXP masiva`
  },

  // ═══════════════════════════════════════════════════════════════
  // SEVEN SIGNS
  // ═══════════════════════════════════════════════════════════════
  {
    category: 'quest',
    tags: 'quest seven signs siete sellos saga epic historia completa cadena 192 193 194 195 196 197 198',
    title: 'Cadena de Quests: Seven Signs',
    content: `**Seven Signs — Cadena Completa (Quests 192-198)**

**Nivel requerido:** 79
**Clases:** Todas

**Descripción:**
La saga más épica de Lineage 2. Historia sobre la lucha entre Dawn y Dusk, las fuerzas del bien y el mal.

**Secuencia:**
1. **Series of Doubt (Q192)** — Inicio con Elisa en Aden
2. **Dying Message (Q193)** — Investigás un mensaje misterioso
3. **Mammon's Contract (Q194)** — Secretos de Mammon
4. **Secret Ritual of the Priests (Q195)** — Ritual secreto
5. **Seal of the Emperor (Q196)** — El sello del Emperador
6. **The Sacred Book of Seal (Q197)** — El libro sagrado
7. **Embryo (Q198)** — Batalla final

**Recompensas:**
- EXP/SP masivo a lo largo de toda la cadena
- Historia épica que conecta todo el lore del juego
- Acceso a contenido de Seven Signs (catacombs, necropolises)`
  },

  // ═══════════════════════════════════════════════════════════════
  // CLASS TRANSFER
  // ═══════════════════════════════════════════════════════════════
  {
    category: 'quest',
    tags: 'quest primera profesion 1st class transfer nivel 20 path cambio clase',
    title: 'Guía: Primera Profesión (1st Class Transfer)',
    content: `**Primera Profesión — Class Transfer a Nivel 20**

**Nivel requerido:** 19-20
**Ubicación:** Village Master de tu raza + quest "Path of..."

**Cómo funciona:**
1. Llegá a nivel 19-20
2. Completá la quest "Path of..." correspondiente a tu clase:

**Humans:**
- Path of the Warrior (Q401) — Fighter → Warrior
- Path of the Human Knight (Q402) — Fighter → Knight
- Path of the Rogue (Q403) — Fighter → Rogue
- Path of the Human Wizard (Q404) — Mystic → Wizard
- Path of the Cleric (Q405) — Mystic → Cleric

**Elves:**
- Path of the Elven Knight (Q406)
- Path of the Elven Scout (Q407)
- Path of the Elven Wizard (Q408)
- Path of the Elven Oracle (Q409)

**Dark Elves:**
- Path of the Palus Knight (Q410)
- Path of the Assassin (Q411)
- Path of the Dark Wizard (Q412)
- Path of the Shillien Oracle (Q413)

**Orcs:**
- Path of the Orc Raider (Q414)
- Path of the Orc Monk (Q415)
- Path of the Orc Shaman (Q416)

**Dwarves:**
- Path of the Scavenger (Q417)
- Path of the Artisan (Q418)

**Kamael:**
- Path of the Trooper (Q62) — Male
- Path of the Warder (Q63) — Female

3. Entregá los marks obtenidos al Village Master para cambiar de clase.`
  },
  {
    category: 'quest',
    tags: 'quest segunda profesion 2nd class transfer nivel 40 trial testimony test cambio clase',
    title: 'Guía: Segunda Profesión (2nd Class Transfer)',
    content: `**Segunda Profesión — Class Transfer a Nivel 40**

**Nivel requerido:** 35-40

**Cómo funciona:**
Necesitás completar **2-3 quests** según la clase:
- 1 Trial (para tu tipo de clase)
- 1 Testimony (para tu raza)  
- 1 Test (para tu clase específica)

**Trials (por tipo de clase):**
- Trial of the Challenger (Q211) — Warriors/Destroyers
- Trial of Duty (Q212) — Knights/Tanks
- Trial of the Seeker (Q213) — Rogues/Daggers
- Trial of the Scholar (Q214) — Mages
- Trial of the Pilgrim (Q215) — Healers/Supports
- Trial of the Guildsman (Q216) — Dwarves

**Testimonies (por raza):**
- Testimony of Trust (Q217) — Human
- Testimony of Life (Q218) — Elf
- Testimony of Fate (Q219) — Dark Elf
- Testimony of Glory (Q220) — Orc
- Testimony of Prosperity (Q221) — Dwarf

**Tips:**
- Empezá las quests a nivel 35 para tenerlas listas a nivel 40
- Algunas quests requieren matar mobs de nivel 40+, llevá party
- Kamael tiene quests propias: Certified Berserker (Q64), Soul Breaker (Q65), Arbalester (Q66)`
  },
  {
    category: 'quest',
    tags: 'quest tercera profesion 3rd class transfer nivel 76 saga cambio clase',
    title: 'Guía: Tercera Profesión (3rd Class Transfer / Sagas)',
    content: `**Tercera Profesión — Sagas a Nivel 76**

**Nivel requerido:** 76
**Ubicación:** Varios NPCs según la saga

**Descripción:**
Las Sagas son quests épicas individuales para cada clase. Cada saga tiene su propia historia y desafíos.

**Sagas disponibles:**
- Saga of the Phoenix Knight (Q70) — Paladin → Phoenix Knight
- Saga of the Duelist (Q73) — Gladiator → Duelist
- Saga of the Dreadnought (Q74) — Warlord → Dreadnought
- Saga of the Sagittarius (Q82) — Hawkeye → Sagittarius
- Saga of the Adventurer (Q79) — Treasure Hunter → Adventurer
- Saga of the Archmage (Q88) — Sorcerer → Archmage
- Saga of the Cardinal (Q85) — Bishop → Cardinal
- Saga of the Fortune Seeker (Q99) — Bounty Hunter → Fortune Seeker
- Saga of the Maestro (Q100) — Warsmith → Maestro
- ...y muchas más (una por cada clase 2da)

**Tips:**
- Algunas sagas requieren matar Raid Bosses
- Podés hacerlas en party, pero el progreso es individual
- Kamael: Doombringer (Q67), Soul Hound (Q68), Trickster (Q69)
- Al completar la saga, obtenés skills exclusivos de tu 3ra clase`
  },

  // ═══════════════════════════════════════════════════════════════
  // SOUL CRYSTAL & SA
  // ═══════════════════════════════════════════════════════════════
  {
    category: 'quest',
    tags: 'quest enhance weapon soul crystal sa special ability arma mejorar 350',
    title: 'Quest: Enhance Your Weapon (Soul Crystal / SA)',
    content: `**Enhance Your Weapon (Quest 350) — Soul Crystal / Special Ability**

**Nivel requerido:** 40
**NPC de inicio:** Jurek — Oren
**Clases:** Todas

**Descripción:**
Quest fundamental para poner Special Abilities (SA) en tus armas. Imprescindible para endgame.

**Cómo funciona:**
1. Hablar con Jurek en Oren
2. Obtener un Soul Crystal (se compra en tienda o drop de mobs)
3. Matar los mobs específicos que absorben almas para levelear el crystal
4. Llevar el crystal leveleado al Blacksmith para poner la SA en tu arma

**Soul Crystal Levels:**
- Level 1-10: Se obtienen matando mobs con la habilidad de absorción
- A mayor level del crystal, mejor SA podés usar
- Hay crystals rojos, verdes y azules (cada uno da SAs diferentes)

**Tips importantes:**
- El crystal puede ROMPERSE al intentar levelearlo (chance de fallo)
- No todos los mobs sirven para levelear crystals
- Las SA cambian completamente el rendimiento de tu arma
- Buscá guías de SA para tu clase específica`
  },

  // ═══════════════════════════════════════════════════════════════
  // PAILAKA
  // ═══════════════════════════════════════════════════════════════
  {
    category: 'quest',
    tags: 'quest pailaka instancia solo instance bracelet pulsera 128 129',
    title: 'Quests: Pailaka (Instancias Solo)',
    content: `**Pailaka — Instancias para jugador solo**

**Song of Ice and Fire (Q128):**
- Nivel: 36-42
- NPC: Inspector Adler — Dion
- Instancia solo player, buena EXP
- Reward: Pailaka Bracelet (accesorio útil)

**Devil's Legacy (Q129):**
- Nivel: 61-67
- NPC: Inspector Vergara — Goddard
- Instancia solo player más difícil
- Reward: Pailaka Bracelet mejorada

**Tips:**
- Son instancias con tiempo límite
- Dentro hay buffs y potions que te ayudan
- Excelente EXP si las hacés al nivel correcto
- Los bracelets son accesorios muy buenos para su nivel`
  },

  // ═══════════════════════════════════════════════════════════════
  // GENERAL QUEST INFO
  // ═══════════════════════════════════════════════════════════════
  {
    category: 'quest',
    tags: 'quest guia general como empezar tipos categorias informacion basica',
    title: 'Guía general de Quests en L2 High Five',
    content: `**Guía General de Quests en L2 High Five**

**Tipos principales de quests:**

**1. Cambio de Clase (Class Transfer):**
- 1ra Profesión: Nivel 20 (quests "Path of...")
- 2da Profesión: Nivel 40 (Trial + Testimony + Test)
- 3ra Profesión: Nivel 76 (Sagas)

**2. Subclass y Noblesse:**
- Fate's Whisper (Q234): Desbloquea subclass a nivel 75
- Precious Soul (Q241-247): Cadena para Noblesse
- Requiere subclass nivel 50→60→65→75

**3. Acceso a Raids/Zonas:**
- Call of Antharas (Q903), Call of Valakas (Q906)
- Path to Hellbound (Q130)
- Journey to Gracia (Q10267)
- Four Goblets (Q620) para Frintezza

**4. Seven Signs:**
- Cadena épica de historia (Q192-198)
- Desbloquea catacombs y necropolises

**5. Farming/Repetibles:**
- Enhance Your Weapon (Q350) para Soul Crystals
- Giant's Cave (Q376-377) para skill enchants
- Quests repetibles para adena y EXP

**6. Mascotas:**
- Get a Pet (Q419), Little Wing (Q420)

**Quests imprescindibles (hacelas sí o sí):**
⭐ Fate's Whisper → Subclass
⭐ Precious Soul 1-4 → Noblesse
⭐ Path to Hellbound → Acceso Hellbound
⭐ Enhance Your Weapon → SA en armas
⭐ Call of Antharas/Valakas → Raids épicos
⭐ Journey to Gracia → Seeds + Moirai set`
  },
];

module.exports = QUEST_GUIDES;
