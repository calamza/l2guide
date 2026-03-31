/**
 * Guías pre-armadas para L2 High Five.
 * Cubren equipamiento, progresión, spots de caza, tips de PvP/PvE por clase y nivel.
 * Cada guía tiene: category, tags (para búsqueda), title, content.
 */

const GUIDES = [

  // ═══════════════════════════════════════════════════════════════
  // GUÍAS GENERALES DE PROGRESIÓN POR GRADO
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'progresion',
    tags: 'progresion equipamiento grado no-grade D C B A S S80 S84 nivel level',
    title: 'Progresión general de equipamiento por grado',
    content: `**Progresión de equipamiento por grado en L2 High Five:**

**No-Grade (Nivel 1-19):**
- Usá el equipo que te dan en la creación del personaje.
- Completá las quests de los newbie helpers para conseguir equipamiento inicial.
- No gastes adena en equipo de este grado.

**D-Grade (Nivel 20-39):**
- A nivel 20 hacé la First Class Transfer (1ra profesión).
- Armas y armaduras D se compran en tienda de NPC o se craftean fácilmente.
- Recomendado: set completo de armadura D para tu tipo (heavy/light/robe).
- Top D-grade weapons: Mace of Miracles (mage), Sprite's Staff, Elven Long Sword.

**C-Grade (Nivel 40-51):**
- A nivel 40 hacé la Second Class Transfer (2da profesión).
- C-Grade marca el primer salto importante de poder.
- Los sets de armadura C tienen bonos de set significativos.
- Recomendado craftear o comprar: Full Plate Armor set (heavy), Plated Leather set (light), Karmian set (robe).
- Top C-grade weapons varían por clase (ver guías específicas).

**B-Grade (Nivel 52-60):**
- B-Grade es caro pero marca una diferencia enorme.
- Armas B se consiguen por drop de Raid Boss, craft, o compra a otros jugadores.
- Sets recomendados: Doom Armor set (heavy), Doom Leather set (light), Blue Wolf Robe set (robe/mage).
- Ojo: Blue Wolf Heavy set es para tanks (más P.Def), Doom Heavy es más ofensivo.

**A-Grade (Nivel 61-75):**
- Sets A-grade tienen bonos de set muy potentes.
- Dark Crystal set (heavy/tank), Tallum set (heavy/DD), Majestic set (light), Dark Crystal Robe (mage), Tallum Robe (healer).
- Armas A: buscar las SA (Special Ability) correctas es clave.
- Dynasty weapons (A-grade especial) son difíciles de obtener pero muy buenas.

**S-Grade (Nivel 76-79):**
- Requiere completar la Third Class Transfer (3ra profesión / Noblesse quest o Subclass).
- Para usar S-grade necesitás quest de certificación en Ivory Tower.
- Sets: Draconic Armor (heavy/DD), Imperial Crusader (heavy/tank), Major Arcana (robe), Moirai set (multiclase).
- Armas S: Draconic Bow, Shyeed's Bow, Vesper series.

**S80-Grade (Nivel 80-84):**
- Moirai Set es el más accesible (se obtiene con Badges en Seed of Infinity).
- Vesper Set es el top pero requiere materiales de Hellbound.
- S80 weapons son caras pero las mejores del juego.

**S84-Grade (Nivel 84-85):**
- El equipo más poderoso del juego. Muy difícil de obtener.
- Requiere farming intensivo en Freya/Istina/Octavis raids.
- Vorpal Set y Elegia Set son alternativas superiores a Vesper.`
  },

  // ═══════════════════════════════════════════════════════════════
  // WARRIORS - HUMAN
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'clase',
    tags: 'gladiator gladiador duelist human warrior melee dps dual sword',
    title: 'Guía de Gladiator / Duelist',
    content: `**Gladiator → Duelist (Human Fighter)**

**Rol:** DPS melee con dual swords. Excelente AoE (Area of Effect).

**Tipo de armadura:** Heavy Armor (más P.Def y HP) o Light Armor (más evasion y crit rate).
- **PvE:** Heavy es más seguro, Light para grindeo rápido.
- **PvP:** Heavy siempre. Necesitás la supervivencia.

**Armas recomendadas por grado:**
- **D:** Dual Daggers o Elven Long Sword + shield hasta tener duales.
- **C:** Dual Sword of Revolution o Samurai Long Sword*Samurai Long Sword.
- **B:** Dual Sword of Nightmare o Keshanberk*Keshanberk.
- **A:** Tallum Blade*Dark Legion's Edge o Dynasty Dual Swords.
- **S:** Periel Sword*Periel Sword o Vesper Cutter*Vesper Cutter.

**Sets de armadura recomendados:**
- **C:** Full Plate Armor set (heavy) o Composite Armor set.
- **B:** Doom Armor set (heavy, HP bonus).
- **A:** Tallum Heavy Armor set (más P.Atk con bonus set).
- **S:** Draconic Armor set (el mejor para melee DPS).

**Spots de caza recomendados:**
- Lvl 20-35: Execution Grounds, Dion Hills.
- Lvl 35-45: Cruma Tower (Floor 1-2), Plains of Dion.
- Lvl 45-55: Enchanted Valley, Forest of Mirrors.
- Lvl 55-65: Wall of Argos (party), Blazing Swamp.
- Lvl 65-75: Dragon Valley, Varka Silenos Barracks.
- Lvl 75-80: Primeval Isle (party), Imperial Tomb.
- Lvl 80-85: Seed of Infinity, Seed of Destruction.

**Tips:**
- Sonic Rage + Triple Sonic Slash es tu combo principal de AoE.
- En PvP, usá Sonic Storm para stun en área y después burst con Sonic Slash.
- El Gladiator es uno de los mejores farmers AoE del juego.
- Podés usar dagger skills también si tenés dual daggers.
- Llevá siempre Greater CP/HP potions en PvP.`
  },

  {
    category: 'clase',
    tags: 'warlord destroyer titan human warrior polearm aoe',
    title: 'Guía de Warlord / Dreadnought',
    content: `**Warlord → Dreadnought (Human Fighter)**

**Rol:** AoE melee con polearm. El mejor farmer de masas del juego.

**Tipo de armadura:** Heavy Armor siempre.

**Armas recomendadas:**
- **D:** Scallop Jamadhr o cualquier lanza D.
- **C:** Great Axe o Orcish Poleaxe.
- **B:** Halberd o Great Sword.
- **A:** Dragon Grinder o Tallum Glaive.
- **S:** Vesper Avenger o Draconic Bow (para pull).

**Sets de armadura:**
- **C:** Full Plate Armor set.
- **B:** Doom Armor set o Blue Wolf Heavy set.
- **A:** Tallum Heavy Armor set.
- **S:** Draconic Armor set.

**Spots de caza (especialista en AoE):**
- Lvl 40-55: Cruma Tower (agrupar mobs), Forest of Mirrors.
- Lvl 55-65: Sel Mahum Training Camp, Enchanted Valley.
- Lvl 65-75: Dragon Valley, Varka/Ketra camps.
- Lvl 75-85: Seed of Infinity, Stakato Nest.

**Tips:**
- Tu habilidad insignia es Whirlwind. Usala para juntar mobs y nuke en AoE.
- Thunder Storm es tu mejor AoE. Combinalo con Whirlwind para limpiar.
- En party, sos el puller ideal. Juntás mobs y los traés al grupo.
- El Dreadnought tiene Rush Impact que es excelente en PvP (charge + stun).
- Muy buen farmer solo pero necesitás potions/CP pots constantemente.`
  },

  {
    category: 'clase',
    tags: 'paladin phoenix knight tank human shield party',
    title: 'Guía de Paladin / Phoenix Knight',
    content: `**Paladin → Phoenix Knight (Human Fighter)**

**Rol:** Tank principal. El tank más estable y confiable del juego.

**Tipo de armadura:** Heavy Armor siempre (máximo P.Def).

**Armas recomendadas:**
- Usá siempre sword/blunt + shield. Nunca dual ni 2h para tankear.
- **C:** Sword of Revolution + shield C.
- **B:** Keshanberk + shield B, o Art of Battle Axe.
- **A:** Tallum Blade + shield A, o Dynasty Shield + Dynasty Sword.
- **S:** Vesper Cutter + Vesper Shield.

**Sets de armadura:**
- **C:** Full Plate Armor set.
- **B:** Blue Wolf Heavy Armor set (el mejor set tank B).
- **A:** Dark Crystal Heavy Armor set (P.Def + HP, el set tank por excelencia).
- **S:** Imperial Crusader set (máximo P.Def y M.Def).

**Skills importantes:**
- Aggression/Hate Aura: para mantener aggro de los mobs.
- Ultimate Defense: reduce daño 90%, úsalo en emergencias.
- Shield Stun: tu CC principal, úsalo en cooldown.
- Majesty: buff que reduce daño cuando HP está bajo.

**Tips:**
- Tu trabajo #1 es mantener aggro. Usá Hate y Hate Aura constantemente.
- En party, nunca atacar primero. Dejá que el DD haga pull y vos tomás aggro.
- Phoenix Knight tiene resurrect party (Balance Life) que puede salvar wipes.
- En PvP sos difícil de matar pero no hacés mucho daño. Tu rol es pelar (proteger) a los DDs.
- Shield Defense Rate es tu stat más importante después de P.Def.`
  },

  {
    category: 'clase',
    tags: 'dark avenger hell knight tank human vamp',
    title: 'Guía de Dark Avenger / Hell Knight',
    content: `**Dark Avenger → Hell Knight (Human Fighter)**

**Rol:** Tank con vampirismo. Más ofensivo que Paladin, excelente solo.

**Tipo de armadura:** Heavy Armor.

**Armas recomendadas:**
- Mismo que Paladin: sword/blunt + shield.
- La diferencia es que DA puede farmear mejor solo gracias al vampirismo.
- **C:** Homunkulus Sword + shield C.
- **B:** Keshanberk, Art of Battle Axe + shield.
- **A:** Tallum Blade + shield A. Dynasty Sword.
- **S:** Vesper Cutter + shield.

**Sets de armadura:**
- **C:** Full Plate Armor set.
- **B:** Blue Wolf Heavy Armor set (tank) o Doom Heavy (más HP para vampirismo).
- **A:** Dark Crystal Heavy Armor set (tank estándar).
- **S:** Imperial Crusader set o Draconic set (si querés más daño).

**Skills importantes:**
- Panther: tu pet pantera hace daño extra y puede stunear.
- Vampiric Rage/Touch: te healeás mientras atacás. Clave para solo play.
- Shield Stun: CC principal.
- Summon Dark Panther: a nivel alto, la pantera es bastante fuerte.

**Spots de caza (puede farmear muy bien solo):**
- Se banca los mismos spots que un DD gracias al vampirismo.
- Enchanted Valley, Forest of Mirrors, Dragon Valley.
- Puede hacer Catacombs/Necropolis solo bastante bien.

**Tips:**
- DA es el mejor tank para jugar solo. El vampirismo + pantera te dan sustain.
- En party, tankeás igual que Paladin pero con menos defensive skills.
- Hell Knight tiene Sacrifice que te healeás sacrificando HP de tu pet.
- En PvP, el DA con pantera puede hacer bastante daño 1v1.
- Es la clase más newbie-friendly de los tanks.`
  },

  // ═══════════════════════════════════════════════════════════════
  // WARRIORS - ELFO
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'clase',
    tags: 'treasure hunter adventurer dagger rogue human stealth critical',
    title: 'Guía de Treasure Hunter / Adventurer',
    content: `**Treasure Hunter → Adventurer (Human Rogue)**

**Rol:** DPS melee de burst con daggers. Daño single-target devastador.

**Tipo de armadura:** Light Armor (para Critical Rate y Evasion).

**Armas recomendadas:**
- **D:** Cursed Dagger.
- **C:** Crystal Dagger, Demon's Dagger.
- **B:** Soul Separator, Bloody Orchid.
- **A:** Angel Slayer o Naga Storm.
- **S:** Vesper Shaper.

**Sets de armadura:**
- **C:** Plated Leather set o Composite set.
- **B:** Doom Leather Armor set (light, Critical bonus).
- **A:** Majestic Leather set (Critical + Evasion, perfecto para dagger).
- **S:** Draconic Leather set o Moirai Light.

**Skills importantes:**
- Backstab: daño masivo por la espalda. Tu skill principal.
- Deadly Blow: daño alto, usable de cualquier angle.
- Lethal Blow: chance de instant kill.
- Sand Bomb: blind enemigos.
- Switch: teletransporte atrás del enemigo.

**Tips:**
- Siempre atacá por la espalda para máximo daño con Backstab.
- Usá Hide para acercarte invisible, Switch, Backstab, Deadly Blow.
- En PvP, tu combo es: Shadow Step → Switch → Backstab → Deadly Blow → Sand Bomb si falla.
- El Adventurer es el mejor 1v1 del juego si sabés jugar posicionamiento.
- No intentes pelear de frente contra un warrior con heavy. Siempre flanqueá.
- Llevá Trick para desarmarte shields y Focus Skills para subir crit rate.`
  },

  {
    category: 'clase',
    tags: 'hawkeye sagittarius archer bow human ranger',
    title: 'Guía de Hawkeye / Sagittarius',
    content: `**Hawkeye → Sagittarius (Human Fighter)**

**Rol:** DPS a distancia con bow. Daño consistente y alto rango.

**Tipo de armadura:** Light Armor (para Critical y Speed).

**Armas recomendadas:**
- **D:** Gastraphetes o Strengthened Long Bow.
- **C:** Akat Long Bow o Bow of Peril.
- **B:** Carnage Bow.
- **A:** Draconic Bow o Dynasty Bow.
- **S:** Vesper Thrower.

**Sets de armadura:**
- **C:** Plated Leather set.
- **B:** Doom Leather set.
- **A:** Majestic Leather set.
- **S:** Draconic Leather set.

**Tips:**
- El arco es el arma más cara de mantener (flechas).
- Usá Blessed Spiritshot para daño mágico con skills como Double Shot.
- En PvE, sos excelente puller. Tirar y kite mobs es tu especialidad.
- En PvP, mantené distancia siempre. Lethal Shot tiene chance de instant kill.
- El Sagittarius es el mejor archer con Double Shot y rapid fire.
- Necesitás un buffer (Prophet/EE/SE) para brillar. Solo es lento.`
  },

  // ═══════════════════════════════════════════════════════════════
  // MAGES
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'clase',
    tags: 'sorcerer archmage mago nuker human fire water wind aoe magic',
    title: 'Guía de Sorcerer / Archmage',
    content: `**Sorcerer → Archmage (Human Mystic)**

**Rol:** Nuker mágico. El mago con más daño AoE del juego.

**Tipo de armadura:** Robe (siempre, para M.Atk y Cast Speed).

**Armas recomendadas:**
- **D:** Mace of Miracles o Staff of Life.
- **C:** Homunkulus Sword, Sage's Staff.
- **B:** Sword of Valhalla, Staff of Evil Spirits.
- **A:** Arcana Mace, Dynasty Staff.
- **S:** Vesper Retributer.
- **Alternativa:** Usar duals/sword para M.Atk base + shield para defensa.

**Sets de armadura:**
- **C:** Karmian set (M.Def + Cast Speed, el mejor robe C).
- **B:** Blue Wolf Robe set (M.Atk + MP regen, perfecto para mage).
- **A:** Dark Crystal Robe set (M.Atk + M.Def).
- **S:** Major Arcana set o Moirai Robe.

**Skills importantes:**
- Surrender to Fire/Water/Wind: reduce resistencia elemental del mob.
- Blaze/Hydro Blast/Hurricane: tus nukes principales por elemento.
- Prominence: AoE fire, excelente para farm.
- Aura Flash: AoE de corto alcance para emergencias.
- Arcane Power: buff que aumenta M.Atk pero reduce defensa.

**Spots de caza (magos son excelentes AoE farmers):**
- Lvl 40-55: Cruma Tower, Enchanted Valley (con Surrender element).
- Lvl 55-65: Tower of Insolence, Blazing Swamp.
- Lvl 65-75: Forest of the Dead, Dragon Valley Caves.
- Lvl 75-85: Seed of Infinity, Hall of Suffering.

**Tips:**
- Siempre verificá la resistencia elemental del mob y usá el elemento correcto.
- Surrender + nuke del mismo elemento = daño máximo.
- En PvP, Archmage tiene Arcane Chaos (silence AoE) que es devastador en GvG.
- Necesitás Recharger (SE/EE con Recharge) para farm eficiente.
- Greater Magic Critical Rate joya (aumenta M.Crit) es esencial.`
  },

  {
    category: 'clase',
    tags: 'necromancer soultaker mago summon undead dark mage',
    title: 'Guía de Necromancer / Soultaker',
    content: `**Necromancer → Soultaker (Human Mystic)**

**Rol:** Mago oscuro con invocaciones y debuffs. Híbrido entre nuker y summoner.

**Tipo de armadura:** Robe.

**Armas:** Igual que Sorcerer. Staff o blunt + shield.

**Sets de armadura:** Igual que Sorcerer (Karmian → Blue Wolf Robe → DC Robe → Major Arcana).

**Skills importantes:**
- Corpse Burst: AoE que explota cadáveres. Daño masivo.
- Death Spike: nuke dark poderoso.
- Curse Death Link: transferís tu death damage al enemigo.
- Transfer Pain: movés daño que recibís al servitor.
- Summon: Dark Servitor te ayuda a tankear y hacer daño.

**Tips:**
- El Soultaker brilla en PvP con Curse Death Link + Death Spike combo.
- En PvE, usá el servitor para tank + tus nukes. Muy eficiente solo.
- Transfer Pain + servitor te hace muy tanky para un mago.
- Body to Mind te convierte HP en MP, útil con el servitor absorbiendo daño.
- Es la mejor clase maga para jugar solo gracias al pet.`
  },

  {
    category: 'clase',
    tags: 'spellsinger mystic muse elfo elf mago nuker water aoe magic',
    title: 'Guía de Spellsinger / Mystic Muse',
    content: `**Spellsinger → Mystic Muse (Elf Mystic)**

**Rol:** Nuker mágico élfico. Más Cast Speed que Sorcerer pero menos daño puro.

**Tipo de armadura:** Robe.

**Armas y Sets:** Mismos que Sorcerer. Karmian → Blue Wolf Robe → DC Robe → Major Arcana.

**Diferencia con Archmage:**
- Mystic Muse tiene más Cast Speed nativa.
- Especializada en Water element.
- Hydro Blast es su nuke principal.
- Tiene Aqua Splash (AoE water) que es muy bueno en farm.
- En PvP tiene Surrendered to Water y freezing skills.

**Skills importantes:**
- Hydro Blast: nuke water, tu skill principal.
- Aqua Splash/Swirl: AoE water.
- Elemental Spike: nuke fuerte single target.
- Freezing Shackle: slow/root enemigos.

**Tips:**
- Mystic Muse castea más rápido que Archmage pero con un poco menos de daño.
- En PvP grupal (siege/oly), MM es preferida por la velocidad de casteo.
- En Olympiad, MM es top tier gracias a los roots y slows.
- Mejor para PvP, Archmage mejor para PvE farm.`
  },

  {
    category: 'clase',
    tags: 'spellhowler storm screamer dark elf mago nuker wind dark aoe magic',
    title: 'Guía de Spellhowler / Storm Screamer',
    content: `**Spellhowler → Storm Screamer (Dark Elf Mystic)**

**Rol:** Nuker mágico dark elf. Máximo M.Crit y burst damage.

**Tipo de armadura:** Robe.

**Armas y Sets:** Mismos que otros nukers.

**Diferencia con otros nukers:**
- Storm Screamer tiene el mayor M.Critical Rate nativo.
- Especializada en Wind element.
- Hurricane es su nuke principal.
- Tiene Tempest (AoE wind) como AoE farm.
- Death Whisper aumenta Critical Damage mágico.

**Skills importantes:**
- Hurricane: nuke wind principal.
- Tempest: AoE wind.
- Death Whisper: self-buff que aumenta M.Crit damage.
- Shadow Flare: AoE dark damage.
- Demon Wind: nuke wind de corta distancia pero muy potente.

**Tips:**
- Storm Screamer tiene el burst más alto de los 3 nukers cuando critea.
- En PvP, un M.Crit de Hurricane puede matar de un hit a light armor.
- El problema es la consistencia: dependés del crit.
- Ideal para Olympiad y 1v1 donde el burst importa.
- En PvE, es ligeramente inferior a Archmage en farm AoE.`
  },

  // ═══════════════════════════════════════════════════════════════
  // HEALERS / SUPPORTS
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'clase',
    tags: 'bishop cardinal healer support human buff heal party',
    title: 'Guía de Bishop / Cardinal',
    content: `**Bishop → Cardinal (Human Mystic)**

**Rol:** Healer principal. El mejor healer del juego.

**Tipo de armadura:** Robe (para Cast Speed y M.Def).

**Armas recomendadas:**
- Usá siempre arma con Acumen SA (Cast Speed).
- **C:** Sage's Staff (Acumen), Homunkulus Sword.
- **B:** Staff of Evil Spirits (Acumen).
- **A:** Arcana Mace (Acumen).
- **S:** Vesper Retributer (Acumen).

**Sets de armadura:**
- **C:** Karmian set (Cast Speed bonus es clave para healer).
- **B:** Blue Wolf Robe set.
- **A:** Tallum Robe set (healer set por excelencia, MP regen bonus).
- **S:** Moirai Robe o Major Arcana.

**Skills importantes:**
- Greater Battle Heal: tu heal principal.
- Greater Group Heal: heal de grupo.
- Resurrection: revivir aliados con % de EXP restaurada.
- Blessed Body/Soul: buffs de HP/MP extra.
- Purify: remover debuffs.

**Tips:**
- Cardinal es indispensable en cualquier party seria.
- Nunca vas a tener problemas para encontrar party.
- Tu prioridad: mantener vivo al tank > DDs > vos.
- En PvP/Siege, sos el target #1. Usá cancellation protection y posicionamiento.
- Vestite con set heavy + shield cuando te focusean en siege.
- Leveleá con un DD amigo o clan, solo es muy lento.`
  },

  {
    category: 'clase',
    tags: 'elder elder shillien elder SE healear dark elf support recharge buffer',
    title: 'Guía de Shillien Elder / Shillien Saint',
    content: `**Shillien Elder → Shillien Saint (Dark Elf Mystic)**

**Rol:** Healer/support dark elf. Tiene Recharge (MP restore) y Empowering Echo.

**Tipo de armadura:** Robe.

**Lo que lo hace especial:**
- **Recharge:** Restaura MP a un aliado. ESENCIAL para parties con mages.
- **Empowering Echo:** Buff de M.Atk para party.
- Tiene heals decentes pero no al nivel de Bishop.
- Puede hacer debuffs dark (curses).

**Tips:**
- SE + Mage = combo letal. El SE recarga MP al mage que nukea sin parar.
- En party, tu prioridad es Recharge al nuker y Heal al tank.
- En PvP, podés debuffear con curses y healar al mismo tiempo.
- Empowering Echo staquea con Prophet buffs.
- Es el support más buscado para parties de mages.`
  },

  {
    category: 'clase',
    tags: 'prophet hierophant buffer support human buff party',
    title: 'Guía de Prophet / Hierophant',
    content: `**Prophet → Hierophant (Human Mystic)**

**Rol:** Buffer principal. La clase de soporte más importante del juego.

**Tipo de armadura:** Robe o Light (para supervivencia).

**Lo que lo hace esencial:**
- Los buffs de Prophet son los más potentes del juego.
- **Berserker Spirit:** Aumenta P.Atk, M.Atk, Atk Speed, Cast Speed.
- **Prophecy of Fire/Water/Wind:** Mega buffs endgame que aumentan stats masivamente.
- **Greater Might:** +P.Atk para el grupo.
- **Greater Shield:** +P.Def para el grupo.
- **Haste:** +Atk Speed.
- **Acumen:** +Cast Speed.

**Tips:**
- Prophet es la clase más buscada para party.
- Tus Prophecy buffs (Fire para warriors, Water para mages, Wind para archers) son game-changing.
- En PvP/Siege, tus buffs pueden girar la batalla.
- Podés buffear y healar (tiene heals básicos como clase mística).
- Hierophant tiene buffs de party range, ideal para raids masivos.
- Leveleá en party siempre. Solo es muy lento pero encontrás party instantáneamente.`
  },

  {
    category: 'clase',
    tags: 'elven elder eva saint elf healer support buffer recharge',
    title: 'Guía de Elven Elder / Eva\'s Saint',
    content: `**Elven Elder → Eva's Saint (Elf Mystic)**

**Rol:** Healer/buffer élfico. Tiene Recharge y buffs propios.

**Tipo de armadura:** Robe.

**Lo que lo hace especial:**
- **Recharge:** Igual que SE, restaura MP a aliados.
- **Prophecy of Water:** Buff para mages (M.Atk, Cast Speed).
- Heals buenos, no tan fuertes como Bishop pero suficientes.
- Más versátil que SE: mejor healer, pero sin debuffs dark.

**Tips:**
- Eva's Saint es el healer/support más equilibrado.
- Tiene Recharge (para mages) + buenos heals (para tanks).
- Prophecy of Water lo hace el buffer ideal para parties de mages.
- En PvP, es un target prioritario por sus buffs y heals.
- Muy buscado para parties. Nunca te falta grupo.`
  },

  // ═══════════════════════════════════════════════════════════════
  // SUMMONERS
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'clase',
    tags: 'warlock arcana lord summoner human pet invocador',
    title: 'Guía de Warlock / Arcana Lord',
    content: `**Warlock → Arcana Lord (Human Mystic)**

**Rol:** Summoner humano. Tu pet hace la mayor parte del daño.

**Tipo de armadura:** Robe (para buffs) o Light (para supervivencia).

**Lo que lo hace especial:**
- Tu servitor (Feline King/Magnus/Nightshade) pelea por vos.
- Podés farmear con mínimo equipo: el pet escala con tu nivel, no con tu arma.
- Transfer Pain: el daño que recibís va al pet.
- La mejor clase para empezar sin adena.

**Armas:** Cualquiera con Acumen para castear buffs más rápido. El arma no afecta al pet.

**Tips:**
- El summoner puede farmear en lugares que otros no pueden solos.
- Pet + Transfer Pain = muy tanky. El pet healeá más fácil que vos.
- En PvP, el pet puede stunear y hacer daño mientras vos debuffeás.
- En Olympiad, Summoners son tier S. El pet es muy difícil de matar + vos.
- Arcana Lord, Elemental Master, y Spectral Master difieren en el tipo de pet.
- La rotación es: Summon pet → Transfer Pain → buff pet → leave pet to fight → heal pet.`
  },

  // ═══════════════════════════════════════════════════════════════
  // DARK ELF MELEE
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'clase',
    tags: 'phantom ranger ghost sentinel dark elf archer bow',
    title: 'Guía de Phantom Ranger / Ghost Sentinel',
    content: `**Phantom Ranger → Ghost Sentinel (Dark Elf Fighter)**

**Rol:** Archer dark elf. Más burst que Sagittarius, menos consistente.

**Tipo de armadura:** Light Armor.

**Diferencia con Sagittarius:**
- Ghost Sentinel tiene Critical Damage más alto.
- Lethal Shot chance mejorado.
- Menos Cast Speed en skills de arco.
- Mejor en PvP burst, peor en PvE sustained.

**Tips:**
- En Olympiad, Ghost Sentinel es temido por su burst.
- Fatal Counter es único de GS: daño que escala con HP perdido.
- Recomendado para jugadores que prefieren PvP sobre PvE.`
  },

  {
    category: 'clase',
    tags: 'bladedancer spectral dancer dark elf buffer dance party sword',
    title: 'Guía de Bladedancer / Spectral Dancer',
    content: `**Bladedancer → Spectral Dancer (Dark Elf Fighter)**

**Rol:** Buffer de party con Dances. DPS secundario con dual swords.

**Tipo de armadura:** Light Armor.

**Lo que lo hace esencial:**
- **Dance of Fire:** +P.Atk para todo el party.
- **Dance of Fury:** +Atk Speed para todo el party.
- **Dance of Concentration:** +Cast Speed.
- **Dance of Warrior:** +Critical Damage.
- Las Dances son buffs esenciales para cualquier party seria.

**Siempre va en party con Swordsinger** (que pone Songs). BD pone Dances, SS pone Songs. Juntos buffean al grupo entero.

**Tips:**
- BD + SS es el combo de support melee más importante del juego.
- Tus Dances se aplican a todo el party, son AoE buff.
- Además de buffear, hacés daño decente con dual swords.
- En PvP/Siege, BD y SS son targets prioritarios (si los matan, se caen los buffs).
- Siempre vas a tener party. BD es extremadamente buscado.`
  },

  {
    category: 'clase',
    tags: 'swordsinger sword muse elf buffer song party',
    title: 'Guía de Swordsinger / Sword Muse',
    content: `**Swordsinger → Sword Muse (Elf Fighter)**

**Rol:** Buffer de party con Songs. DPS secundario con sword.

**Tipo de armadura:** Light Armor (o Heavy para más tankyness).

**Lo que lo hace esencial:**
- **Song of Earth:** +P.Def para el party.
- **Song of Warding:** +M.Def.
- **Song of Wind:** +Atk Speed.
- **Song of Hunter:** +Critical Rate.
- Las Songs complementan las Dances del BD.

**BD pone Dances, SS pone Songs.** Juntos = partido fulleado de buffs.

**Tips:**
- SS + BD = dupla sagrada. Siempre van juntos en party.
- Como SS podés también hacer algo de damage con sword + shield.
- Song of Elemental/Vitality son muy buenas en PvP.
- Sword Muse tiene Song of Purification (resistencia a debuffs) que gana sieges.
- Tan buscado como BD para parties.`
  },

  // ═══════════════════════════════════════════════════════════════
  // DWARVES
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'clase',
    tags: 'bounty hunter fortune seeker dwarf spoil materiales craft resources',
    title: 'Guía de Bounty Hunter / Fortune Seeker',
    content: `**Bounty Hunter → Fortune Seeker (Dwarf Fighter)**

**Rol:** Spoiler. La única clase que puede hacer Spoil para obtener materiales de crafteo.

**Tipo de armadura:** Heavy Armor.

**Lo que lo hace único:**
- **Spoil:** Habilidad exclusiva. Permite obtener materiales extra de mobs.
- **Sweeper:** Después de spoilear y matar, recoges los materiales.
- Es la clase que alimenta la economía del servidor.

**Armas recomendadas:**
- Lo que consigas. El Spoiler no necesita arma cara.
- **C:** Orcish Poleaxe (AoE con Spoil Crush).
- **B:** Halberd.
- **A:** Dragon Grinder.

**Spots de caza para spoil:**
- Enchanted Valley: Key materials.
- Cemetary/Catacombs: Crafting materials.
- Blazing Swamp: Coarse Bone Powder, Compound Braid.
- Forest of the Dead: A-grade materials.
- Dragon Valley: S-grade key parts.

**Tips:**
- Spoil → atacar mob → cuando muere → Sweeper para recoger materials.
- El Spoiler gana adena vendiendo materials a crafters.
- Los materiales son la base de toda la economía de craft.
- Necesitás Spoil Crush (AoE spoil) para farm eficiente en grupo.
- Fortune Seeker tiene Spoil Festival (mass spoil) que es increíble.
- Es una clase que no brilla sola pero genera mucha riqueza.`
  },

  {
    category: 'clase',
    tags: 'warsmith maestro dwarf craft crear manufactura fabricar',
    title: 'Guía de Warsmith / Maestro',
    content: `**Warsmith → Maestro (Dwarf Fighter)**

**Rol:** Crafter. La única clase que puede craftear items de todo grado.

**Tipo de armadura:** Heavy Armor.

**Lo que lo hace único:**
- **Create Item:** Puede craftear items con recetas y materiales.
- **Dwarven Craft:** Acceso a recetas exclusivas dwarven.
- Es la otra mitad de la economía junto al Spoiler.

**Tips:**
- Warsmith craftea, Spoiler provee materiales. Son complementarios.
- Necesitás recetas (Receta: XXXX) + materiales para craftear.
- Las recetas se dropean de mobs específicos o se compran.
- El success rate varía: 60% para S-grade, 70% A-grade, etc.
- Siempre crafteá con GM Cocktail buff si el server lo tiene.
- El Maestro tiene Create Common Item y Dwarven Craft a nivel alto.
- Es una clase de "servicio": la gente te busca para que craftees sus items.
- Podés cobrar un fee por craftear. Es un negocio viable.`
  },

  // ═══════════════════════════════════════════════════════════════
  // KAMAEL
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'clase',
    tags: 'berserker doombringer kamael warrior melee ancient sword',
    title: 'Guía de Berserker / Doombringer',
    content: `**Berserker → Doombringer (Kamael Male)**

**Rol:** DPS melee Kamael con Ancient Sword. Daño en ráfaga.

**Tipo de armadura:** Heavy Armor o Light Armor.
- Heavy para PvP/supervivencia, Light para PvE/farm.

**Armas:** Ancient Sword (arma exclusiva Kamael).
- Las Ancient Swords son two-handed, se consiguen en tiendas especiales Kamael o por craft.

**Skills importantes:**
- Soul skills: consumen souls (cargas especiales Kamael).
- Rushing Thunder: charge con stun.
- Quaking Tiger: AoE devastador.

**Tips:**
- Kamael tienen mecánica de Souls: necesitás matar para cargar souls y usar skills.
- Doombringer es excelente en PvP con Rushing Thunder.
- En PvE, el farm es rápido con AoE skills.
- Las Ancient Swords solo las usan Kamaels, así que el mercado es más limitado.
- Doombringer es top tier en Olympiad.`
  },

  {
    category: 'clase',
    tags: 'arbalester trickster kamael archer crossbow ranger',
    title: 'Guía de Arbalester / Trickster',
    content: `**Arbalester → Trickster (Kamael Female)**

**Rol:** Archer Kamael con crossbow. DPS a distancia con trampas.

**Tipo de armadura:** Light Armor.

**Armas:** Crossbow (arma exclusiva Kamael).

**Lo que lo hace especial:**
- Usa crossbow en vez de bow. Mecánica diferente.
- Tiene trampas (Traps) que puede colocar en el suelo.
- Dark Storm: AoE potente.
- Rápida y con buena evasión.

**Tips:**
- El Trickster brilla en PvP con trampas + kite.
- En PvE, el farm es cómodo con AoE crossbow skills.
- Las crossbows tienen diferente rango y velocidad que bows.
- En Olympiad, las trampas son muy molestas para melees.
- Las bolts (munición de crossbow) se compran en shop Kamael NPC.`
  },

  {
    category: 'clase',
    tags: 'inspector judicator kamael healer support kamael',
    title: 'Guía de Inspector / Judicator',
    content: `**Inspector → Judicator (Kamael)**

**Rol:** Healer/Support Kamael. Se obtiene como 3ra clase vía subclass.

**Tipo de armadura:** Robe o Light.

**Lo que lo hace especial:**
- Es la versión Kamael de un healer.
- Tiene heals y party support.
- Solo se puede obtener habiendo pasado por las clases Kamael previas.

**Tips:**
- Judicator es un healer decente pero inferior a Cardinal en heals puros.
- Tiene buffs Kamael exclusivos que no dan otros supports.
- Útil como alt healer en party si ya hay BD/SS/Prophet.`
  },

  // ═══════════════════════════════════════════════════════════════
  // ORC CLASSES
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'clase',
    tags: 'destroyer titan orc warrior melee frenzy rage aoe',
    title: 'Guía de Destroyer / Titan',
    content: `**Destroyer → Titan (Orc Fighter)**

**Rol:** DPS melee berserker. Máximo daño bruto con Frenzy.

**Tipo de armadura:** Heavy Armor siempre.

**Armas recomendadas:**
- Two-handed swords o polearms.
- **C:** Great Axe, Orcish Poleaxe (AoE).
- **B:** Great Sword, Halberd.
- **A:** Dragon Grinder, Tallum Glaive.
- **S:** Vesper Avenger.

**Skills importantes:**
- **Frenzy:** A bajo HP, aumenta P.Atk masivamente. Tu skill insignia.
- **Guts:** Sobrevivís con 1 HP por unos segundos.
- **Zealot:** Aumenta Atk Speed.
- **Thrill Fight:** Power up cuando HP baja.

**La combo legendaria:** Bajar HP → Frenzy → Zealot → AoE → destruir todo.

**Tips:**
- Titan es el rey del AoE PvE. Con Frenzy + polearm limpiás pantallas.
- En PvP, Frenzy te hace un arma de destrucción masiva pero sos vulnerable.
- Necesitás CP pots/HP pots para controlar tu HP en la zona de Frenzy.
- Guts te mantiene vivo justo cuando Frenzy te deja en 1 HP.
- El farmer más rápido del juego en spots de masas.
- En siege, un Titan con Frenzy puede matar a 10 personas en un AoE.`
  },

  {
    category: 'clase',
    tags: 'tyrant grand khavatari orc monk fist hand to hand',
    title: 'Guía de Tyrant / Grand Khavatari',
    content: `**Tyrant → Grand Khavatari (Orc Fighter)**

**Rol:** DPS melee con fists/knuckles. Rápido y con burst damage.

**Tipo de armadura:** Light Armor (para evasion y speed).

**Armas recomendadas:**
- Fists/Knuckles (arma exclusiva de Tyrant).
- **C:** Fist of Fury.
- **B:** Bellion Cestus.
- **A:** Dragon Grinder (fist), Dynasty Bagh-Nakh.
- **S:** Vesper Fighter.

**Skills importantes:**
- Force Buster/Blaster: tus nukes principales (consumen Force).
- Burning Fist: AoE fire.
- Totem of Bear/Ogre/Rabbit: self-buffs según necesidad.
- Punch of Doom: stun fuerte.

**Tips:**
- Grand Khavatari tiene el Atk Speed más alto del juego.
- En Olympiad, Tyrant es S-tier con el burst de Force skills.
- Combo PvP: Totem → Focus Force → Force Buster → Punch of Doom.
- En PvE, el farm es rápido con Burning Fist AoE.
- Necesitás buildear Force charges para usar tus mejores skills.
- Los totems son exclusivos de orc: Bear (+P.Def), Ogre (+P.Atk), Rabbit (+Speed).`
  },

  {
    category: 'clase',
    tags: 'overlord dominator orc clan support buffer party cp',
    title: 'Guía de Overlord / Dominator',
    content: `**Overlord → Dominator (Orc Mystic)**

**Rol:** Support/Buffer de clan. Buffs de party/clan y CP heals.

**Tipo de armadura:** Robe o Light.

**Lo que lo hace especial:**
- **Clan buffs:** Puede poner buffs que afectan a todo el clan en rango.
- **CP heals:** Restaura CP del party (Combat Points).
- Seal of Winter/Limit/Blockade: debuffs de partido.

**Tips:**
- Dominator es clave en sieges: los clan buffs afectan a todos los clanmates cerca.
- CP heal es único y muy valioso en PvP (si no tienen CP, un hit mata).
- En PvE es un support decente pero inferior a Prophet.
- Necesitás clan activo para que la clase brille.
- Las Seal skills son debuffs muy potentes en GvG.`
  },

  {
    category: 'clase',
    tags: 'warcryer doomcryer orc chant buffer support party',
    title: 'Guía de Warcryer / Doomcryer',
    content: `**Warcryer → Doomcryer (Orc Mystic)**

**Rol:** Buffer con Chants. Complementa a Prophet + BD/SS.

**Tipo de armadura:** Robe o Light.

**Lo que lo hace especial:**
- **Chant of Victory:** El buff más poderoso del juego de un solo skill. +P.Atk, +M.Atk, +Def, +HP, +MP.
- Chant buffs no se superponen con Prophet pero sí complementan.

**Tips:**
- Doomcryer con Chant of Victory es obligatorio en parties de endgame.
- En siege, Chant of Victory en un party de 9 = 9 jugadores con stats de dios.
- Solo es lento para levelear pero siempre encontrás party.
- Doomcryer + Prophet + BD + SS = party full buffeado, invencible.`
  },

  // ═══════════════════════════════════════════════════════════════
  // GUÍAS DE SPOTS DE CAZA POR NIVEL
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'spots',
    tags: 'spots caza leveo farmeo grind zona level nivel exp low',
    title: 'Spots de caza nivel 1-40 (early game)',
    content: `**Spots de caza recomendados Nivel 1-40:**

**Nivel 1-15 (cualquier raza):**
- Zona inicial de tu raza (Talking Island, Elven Village, Dark Elf Village, Orc Village, Dwarven Village, Kamael Village).
- Completá todas las quests de newbie helper. Dan equipo y EXP gratis.

**Nivel 15-20:**
- Ruins of Despair (cerca de Gludio).
- Abandoned Camp.
- Neutral Zone.
- Quests de 1ra profesión (hacer a nivel 19-20).

**Nivel 20-25:**
- Execution Grounds (excelente exp, cerca de Dion).
- Dion Hills.

**Nivel 25-30:**
- Floran Agricultural Area.
- Cruma Marshlands.
- Tanor Canyon (solo con party).

**Nivel 30-35:**
- Death Pass (buena exp pero mobs fuertes).
- Breka's Stronghold.
- Gorgon Flower Garden.

**Nivel 35-40:**
- Cruma Tower Floor 1 (excelente, recomendadísimo).
- Plains of the Lizardmen.
- Bee Hive.
- A nivel 40 hacer quest de 2da profesión.`
  },

  {
    category: 'spots',
    tags: 'spots caza leveo farmeo grind zona level nivel exp mid',
    title: 'Spots de caza nivel 40-60 (mid game)',
    content: `**Spots de caza recomendados Nivel 40-60:**

**Nivel 40-45:**
- Cruma Tower Floor 2-3 (party recomendado).
- Enchanted Valley (drops valiosos, muchos mobs).
- Ivory Tower Crater.

**Nivel 45-52:**
- Forest of Mirrors (buena exp y drops).
- Enchanted Valley (sigue siendo bueno).
- Seal of Shilen (quest area, buena exp).
- A nivel 52 podés ponerte B-Grade.

**Nivel 52-56:**
- Wall of Argos (party recomendado, excelente exp).
- Blazing Swamp.
- Fields of Massacre (drops B).
- Tower of Insolence (floors 1-4).

**Nivel 56-60:**
- Sel Mahum Training Grounds (una de las mejores zonas del juego).
- Monastery of Silence (buena exp, drops scrolls).
- Cemetery.
- Catacombs/Necropolis (con Seven Signs quest).`
  },

  {
    category: 'spots',
    tags: 'spots caza leveo farmeo grind zona level nivel exp high endgame',
    title: 'Spots de caza nivel 60-85 (endgame)',
    content: `**Spots de caza recomendados Nivel 60-85:**

**Nivel 60-65:**
- Dragon Valley (la zona clásica de lvl 60+, drops A-grade key materials).
- Forest of the Dead (buena exp, drops A-grade).
- Valley of Saints.
- Silent Valley.

**Nivel 65-72:**
- Dragon Valley Caves (mobs más fuertes, mejores drops).
- Varka Silenos Barracks / Ketra Orc Outpost (quests de alianza).
- Wall of Argos (upper, party).
- Hot Springs.

**Nivel 72-78:**
- Primeval Isle (party, dinosaurios, excelente EXP).
- Imperial Tomb (party, drops S-grade mats).
- Pagan Temple (buena exp, quest related).
- Swamp of Screams.

**Nivel 78-82:**
- Seed of Destruction (instance, requiere party).
- Seed of Infinity (instance, Gracia content).
- Stakato Nest.
- Steel Citadel (Hellbound).

**Nivel 82-85:**
- Seed of Annihilation (máxima exp del juego).
- Istina/Octavis raids (endgame bosses).
- Freya instance (buena exp y drops).
- Hall of Suffering/Erosion (instances de Seed).`
  },

  // ═══════════════════════════════════════════════════════════════
  // GUÍAS DE PVP
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'pvp',
    tags: 'pvp pelea combate jugador vs olympiad tips trucos',
    title: 'Guía general de PvP',
    content: `**Guía general de PvP en L2 High Five:**

**Prioridades en PvP grupal (siege/GvG):**
1. Matar healers primero (Bishop/Cardinal/Eva's Saint).
2. Luego buffers (BD/SS/Prophet/WC).
3. Después nukers (Archmage/MM/SS).
4. Los DDs melee al final.

**Target order (a quién atacar):**
- Healer > Buffer > Nuker > Archer > Dagger > Warrior > Tank

**Stats importantes para PvP:**
- CP (Combat Points): Tu primera línea de defensa. Sin CP, un hit te mata.
- Resistencias: Stun resist, Mental resist (vs. fear/sleep).
- Augmentation en arma: Critical Damage, Skill Power, Empower.

**Equipamiento PvP:**
- Joyería: Baium Ring (stun resist), Queen Ant Ring, Orfen Earring.
- Tattoos/Dyes: STR +4 CON -4 para DDs melee es discutible. CON es vida.
- SA de arma: Focus (Crit Rate) o Health (HP) dependiendo de la clase.

**Consumibles esenciales:**
- Greater CP Potion (lo más importante).
- Greater Healing Potion.
- Blessed Scroll of Escape (para huir).
- Scroll of Resurrection (por si caés).

**Tips generales:**
- Nunca pelees sin buffs completos.
- Macro de target assist: /target %party1% para focusear lo que ataca el líder.
- Posicionamiento > Stats. Un archer bien posicionado mata más que uno con mejor equipo.
- En siege, los AoE skills (Archmage, Titan, Duelist) son devastadores.
- Fijate siempre el ping. PvP con lag es imposible.`
  },

  {
    category: 'pvp',
    tags: 'olympiad oly grand noble hero competitivo 1v1',
    title: 'Guía de Olympiad',
    content: `**Guía de Olympiad en L2 High Five:**

**¿Qué es?** Combate 1v1 o 3v3 competitivo. El ganador del mes se convierte en Hero con skills exclusivos.

**Clases top tier en Olympiad:**
1. **Titan/Destroyer:** Frenzy + Great Sword = one-shot potencial.
2. **Grand Khavatari/Tyrant:** Force Buster burst inmenso.
3. **Adventurer/TH:** Backstab combo letal.
4. **Arcana Lord/Summoners:** Pet + master = ventaja numérica.
5. **Mystic Muse/MM:** Root + nuke burst a distancia.
6. **Doombringer/Kamael:** Ancient Sword burst.

**Counters comunes:**
- Summoner counter a melees (pet + kite).
- Dagger counter a mages (burst antes de que casteen).
- Mage counter a archers (root + nuke).
- Tank counter a daggers (high P.Def, Shield Stun).

**Tips de Olympiad:**
- El equipo se iguala parcialmente (hay cap de stats).
- Las augmentaciones SÍ funcionan en Oly.
- SA de arma también.
- Buffos: solo self-buffs y equipo. No hay buffer externo.
- Joyería épica (Baium, AQ, Orfen) es clave.
- CPots son limitados. Administralos bien.
- Estudiá las animaciones del oponente para anticipar skills.
- El timing de Purge/Cleanse (quitar debuffs) puede ganar la pelea.`
  },

  // ═══════════════════════════════════════════════════════════════
  // GUÍAS DE ECONOMÍA Y FARMING
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'economia',
    tags: 'adena dinero money farm ganar economía negocio craft venta',
    title: 'Guía de economía y cómo ganar adena',
    content: `**Cómo ganar adena en L2 High Five:**

**Métodos principales:**

1. **Spoil + Craft = Cadena de producción**
   - Bounty Hunter (Spoiler) obtiene materiales con Spoil.
   - Warsmith (Crafter) convierte materiales en items.
   - Vendés los items terminados. La cadena más rentable del juego.

2. **Farm de Raid Boss**
   - Los Raid Boss dropean items valiosos (armas/armaduras B/A/S).
   - Necesitás party o clan. Los drops se subastan o venden.
   - Verificá los respawn timers en la web o con el bot.

3. **Farm de materiales sin Spoil**
   - Algunos mobs dropean materiales directamente (death drop).
   - Dragon Valley: S mats. Imperial Tomb: S mats. Forest of Dead: A mats.

4. **Tiendas offline (buy/sell)**
   - Comprá barato, vendé caro. El clásico de L2.
   - Poné shop a la noche para vender mientras dormís.
   - Zonas con mucho tráfico: Giran, Aden, Goddard.

5. **Manor System**
   - Comprá seeds, plantá en la tierra del castle, cosechá crops.
   - Los crops se venden al castle lord.
   - Requiere estar en un clan con castle o hacer deal con el lord.

6. **Seven Signs (Seal of Avarice)**
   - Participá en Seven Signs y farmeá Ancient Adena.
   - Ancient Adena se cambia por items valiosos.

**Tips generales:**
- NUNCA vendas todo material/recurso al NPC. Siempre chequear precio de mercado.
- Las key materials de craft (Recipe, Key, Stone) tienen su mejor precio en la semana.
- Los precios bajan los fines de semana (más gente online farmeando).
- Monitoreá el chat de trade y aprendé los precios del server.`
  },

  // ═══════════════════════════════════════════════════════════════
  // GUÍAS DE SUBCLASS Y NOBLESSE
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'general',
    tags: 'subclass noblesse hero quest tercer profesion certificacion',
    title: 'Guía de Subclass y Noblesse',
    content: `**Sistema de Subclass en L2 High Five:**

**¿Qué es Subclass?**
- A nivel 75+ con 2da profesión completa, podés agregar una subclass.
- La subclass empieza en nivel 40 y sube independiente.
- Podés tener hasta 3 subclasses.
- Cambiar de subclass se hace en el NPC Reorin (en Ivory Tower).

**Reglas de Subclass:**
- No podés poner subclass de tu misma raza (excepciones).
- Necesitás matar ciertos mobs/quest para desbloquear cada slot.
- Cada subclass es independiente: nivel, skills, buffs propios.
- Los items equipados son compartidos.

**Noblesse:**
- Para ser Noblesse necesitás completar la Noblesse Quest (Possessed Spirit quest).
- O subir una subclass a nivel 75 y completar la quest alternativa.
- Ser Noblesse te permite:
  - Participar en Olympiad.
  - Usar Noblesse Blessing (no perdés buffs al morir).
  - Acceder al Coliseum.
  - Teleportarte con Noblesse Gate Pass.

**Certificación (para S-grade):**
- En Ivory Tower podés hacer quests de certificación.
- Te permiten usar equipo S/S80/S84.
- Cada subclass te da certificados adicionales para habilidades.

**Tips:**
- Elegí subclass que complementen tu main.
- Por ejemplo: main DD puede tener subclass de Prophet para auto-buffearse.
- O subclass de Warsmith para craftear.
- Las habilidades de subclass certification son muy valiosas.`
  },

  // ═══════════════════════════════════════════════════════════════
  // GUÍAS DE ENCHANTING
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'general',
    tags: 'enchant enchanting mejorar reforzar scroll weapon armor',
    title: 'Guía de Enchanting (mejorar equipo)',
    content: `**Sistema de Enchanting en L2 High Five:**

**¿Cómo funciona?**
- Usás Scroll of Enchant Weapon/Armor para mejorar equipo.
- Cada enchant exitoso sube +1 el item.
- Si falla, el item se **cristaliza** (se destruye y te da crystals del grado).

**Safe Enchant (100% éxito):**
- Armor: +3 safe.
- Weapon: +3 safe (algunas versiones +4).
- Más allá de safe, hay chance de fallo.

**Blessed Scroll of Enchant:**
- Si falla, el item vuelve a +0 en vez de destruirse.
- Mucho más caro pero más seguro para items valiosos.

**Probabilidades (aproximadas, High Five):**
- +4: ~66% éxito.
- +5: ~33% éxito.
- +6: ~25% éxito.
- +7 a +16: decrece progresivamente.
- Weapon +16 es el máximo (brillan con efecto especial).

**Tips:**
- NUNCA enchantes un item que no puedas perder.
- Usá Blessed Scrolls para items valiosos (S-grade+).
- El enchant de armadura es generalmente más seguro y cost-effective que weapon.
- +3 safe en full armor set es gratis y da stats significativos.
- Primero enchantá armor a +3 safe, después pensá en weapon.
- Las Crystal scrolls son intermedias: si falla, baja a un enchant menor.`
  },

  // ═══════════════════════════════════════════════════════════════
  // SPECIAL ABILITIES (SA)
  // ═══════════════════════════════════════════════════════════════

  {
    category: 'general',
    tags: 'sa special ability habilidad especial soul crystal arma',
    title: 'Guía de Special Abilities (SA) en armas',
    content: `**Special Abilities (SA) en L2 High Five:**

**¿Qué son?**
- Las armas de grado C+ pueden tener una Special Ability.
- Se activan usando Soul Crystals de cierto stage/level.
- Cada arma tiene opciones de SA diferentes.

**SAs más populares por rol:**

**Para warriors/DDs melee:**
- Health (HP): Más HP. Buena para PvP.
- Focus (Critical Rate): Más crits. Buena para PvE farm.
- Haste (Atk Speed): Más velocidad de ataque.

**Para archers:**
- Focus (Critical Rate): Esencial para archers.
- Guidance (Accuracy): Si fallás mucho.
- Critical Damage: Pega más fuerte cada crit.

**Para mages:**
- Acumen (Cast Speed): LA SA para casters. Necesaria.
- Empower (M.Atk): Alternativa a Acumen si ya tenés mucho Cast Speed.
- Mana Up (MP): Más MP pool.

**Para healers:**
- Acumen: Castear heals más rápido = más HP/s para el party.

**Para tanks:**
- Health: Más HP.
- Haste: Más ataques = más aggro generado.

**Cómo obtener Soul Crystals:**
- Stage 1-10: se obtienen con Soul Crystal quest.
- Se suben de stage matando mobs con el crystal en inventario.
- Para SA en arma, necesitás crystal de stage correcto + NPC Maestro.
- Si la absorción falla, el crystal se rompe.

**Tips:**
- Verificá qué SA tiene tu arma antes de comprarla.
- Un arma con SA incorrecta vale mucho menos.
- Arma sin SA vale menos que con la SA correcta.
- Focus para PvE, Health para PvP es la regla general de melee.`
  },
];

module.exports = GUIDES;
