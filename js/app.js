/* ============================================================
   CartasdeAmor.co — app.js
   Descripción : Lógica principal de la aplicación
   Versión      : 2.0 (con monetización PayPal + WhatsApp)
   ============================================================
   CONFIGURACIÓN RÁPIDA:
   1. Busca "CONFIG" más abajo y edita tus datos reales
   2. Reemplaza PAYPAL_USER con tu usuario de PayPal.me
   3. Reemplaza WA_NUMBER  con tu número de WhatsApp
   ============================================================ */

/* ------------------------------------------------------------
   CONFIGURACIÓN — EDITA AQUÍ TUS DATOS REALES
   ------------------------------------------------------------ */
const CONFIG = {
  PAYPAL_USER : 'JoaLDC',          // ← Tu usuario de PayPal.me
  WA_NUMBER   : 'TU_NUMERO_AQUI',     // ← CAMBIA ESTO: tu número WhatsApp sin + ni espacios (ej: 18091234567)
  SITE_URL    : window.location.href, // URL de la página
  POPUP_DELAY : 18000                 // Tiempo en ms para mostrar popup (18 seg)
};

/* Construye URLs de pago dinámicamente */
const LINKS = {
  paypal_basic    : `https://paypal.me/${CONFIG.PAYPAL_USER}/3`,
  paypal_premium  : `https://paypal.me/${CONFIG.PAYPAL_USER}/5`,
  paypal_pdf      : `https://paypal.me/${CONFIG.PAYPAL_USER}/2`,
  paypal_donate   : `https://paypal.me/${CONFIG.PAYPAL_USER}`,
  whatsapp_order  : `https://wa.me/${CONFIG.WA_NUMBER}?text=Hola!%20Quiero%20una%20carta%20personalizada%20%F0%9F%92%8C`
};

/* ============================================================
   DATA — BASE DE CARTAS
   ============================================================ */
const cartas = [
  {
    id: 1, icon: '🌹', cat: 'san-valentin', catLabel: 'San Valentín',
    title: 'Cada 14 de febrero eres más mía',
    text: `Mi amor,\n\nHoy, como cada 14 de febrero, el mundo parece haberse creado solo para recordarme que tú existes. No necesito flores ni chocolates para saber que eres el mejor regalo que la vida me dio.\n\nEres la razón por la que el mes de febrero tiene un día especial y todos los demás también.\n\nCon todo mi corazón,\nTu amor eterno 💌`,
    premium: false
  },
  {
    id: 2, icon: '💍', cat: 'aniversario', catLabel: 'Aniversario',
    title: 'Un año más a tu lado',
    text: `Mi vida,\n\nCada año que pasa a tu lado me confirma que tomé la mejor decisión de mi vida al elegirte. No soy el mismo desde que llegaste, y no quiero volver a serlo jamás.\n\nGracias por cada pelea superada, cada risa compartida y cada silencio cómodo a tu lado. Que sean muchos años más.\n\nTuyo/a para siempre 💍`,
    premium: false
  },
  {
    id: 3, icon: '👰', cat: 'boda', catLabel: 'Boda',
    title: 'Hoy digo sí para siempre',
    text: `Mi amor,\n\nHoy frente a todos los que amamos, te digo sí. No solo al vestido blanco o al anillo, sino a tu alma, a tu historia y a todo lo que aún está por venir.\n\nEres mi hogar. Donde tú estés, yo estaré bien.\n\nCon todo lo que soy,\nTu compañero/a de vida 👰💒`,
    premium: false
  },
  {
    id: 4, icon: '🌙', cat: 'buenas-noches', catLabel: 'Buenas noches',
    title: 'Cierra los ojos y sueña conmigo',
    text: `Mi amor,\n\nAntes de que el sueño te lleve, quiero que sepas que eres lo último en lo que pienso cada noche. Tu sonrisa es la imagen que llevo al dormir y la que me despierta con ganas de vivir.\n\nBuenas noches, mi universo entero.\n\nAquí esperándote al amanecer 🌙✨`,
    premium: false
  },
  {
    id: 5, icon: '✈️', cat: 'distancia', catLabel: 'A distancia',
    title: 'La distancia no puede con nosotros',
    text: `Mi amor,\n\nQué difícil es tenerte tan lejos cuando te quiero tan cerca. Pero cada kilómetro entre nosotros me recuerda por qué vale la pena esperar.\n\nNo hay distancia que apague lo que siento. Te escribo desde aquí, pero mi corazón ya está contigo.\n\nHasta pronto, mi vida ✈️💕`,
    premium: false
  },
  {
    id: 6, icon: '🌸', cat: 'san-valentin', catLabel: 'San Valentín',
    title: 'Eres mi favorito entre todos',
    text: `Mi amor,\n\nEn un mundo lleno de personas, tú eres la única que hace que me detenga. No lo necesito todo, solo te necesito a ti.\n\nEres mi canción favorita, mi lugar seguro, mi razón de sonreír sin motivo. Feliz día del amor y la amistad, aunque contigo cada día es San Valentín.\n\nTuyo/a con todo mi ser 🌸`,
    premium: false
  },
  {
    id: 7, icon: '💌', cat: 'aniversario', catLabel: 'Aniversario',
    title: 'Gracias por quedarte',
    text: `Amor mío,\n\nEn este aniversario quiero agradecerte no solo por estar, sino por quedarte. Por elegirme cada día aunque no fuera fácil. Por construir conmigo algo que vale más que cualquier cosa.\n\nNo sé cómo sería mi vida sin ti, y no quiero saberlo.\n\nCon amor infinito 💌`,
    premium: false
  },
  {
    id: 8, icon: '🔥', cat: 'san-valentin', catLabel: 'San Valentín',
    title: 'Lo que siento por ti no tiene nombre',
    text: `Mi amor,\n\nHe buscado la palabra exacta para describir lo que me haces sentir y no existe en ningún idioma. Es algo entre euforia, paz, calor y locura.\n\nSolo sé que cuando estás cerca, todo tiene sentido. Y cuando no estás, todo me recuerda a ti.\n\nEres mi persona. Punto. ❤️🔥`,
    premium: false
  },
  {
    id: 9, icon: '🌙', cat: 'buenas-noches', catLabel: 'Buenas noches',
    title: 'El mundo es mejor contigo en él',
    text: `Mi amor,\n\nMientras el día se despide, yo pienso en ti. En tu voz, en tu risa, en cómo me haces sentir cuando estamos juntos.\n\nQue esta noche te lleve sueños bonitos y que mañana amanezca sabiendo que alguien aquí te ama con todo su corazón.\n\nDuerme bien, mi luz 🌙🌟`,
    premium: false
  },
  {
    id: 10, icon: '💍', cat: 'aniversario', catLabel: 'Aniversario',
    title: 'Todavía elijo este amor',
    text: `Mi vida,\n\nSi pudiera volver al día que te conocí, haría exactamente lo mismo. Sin dudar, sin miedo. Porque tú eres la decisión más certera que he tomado.\n\nHoy, en nuestro aniversario, quiero que sepas que te sigo eligiendo. Hoy y todos los días que me queden.\n\nTodo mi amor es tuyo 💍💖`,
    premium: false
  },
  {
    id: 11, icon: '🎭', cat: 'boda', catLabel: 'Boda',
    title: 'Mi voto más honesto',
    text: `Mi amor,\n\nNo voy a prometerte que todo será perfecto porque la vida no funciona así. Pero sí te prometo que estaré aquí en cada tormenta, que elegiré esta familia una y otra vez, y que nunca olvidaré por qué dije sí.\n\nEres mi hogar. Hoy lo hago oficial ante el mundo. 👰💒💍`,
    premium: false
  },
  {
    id: 12, icon: '✈️', cat: 'distancia', catLabel: 'A distancia',
    title: 'Nos une más que nos separa',
    text: `Amor mío,\n\nMiras el mismo cielo que yo. El mismo sol que me calienta por las mañanas también te acompaña donde estás. Eso me hace sentir que nunca estamos tan lejos.\n\nLa distancia es temporal. Este amor no lo es.\n\nTe cuento los días hasta verte ✈️🌍❤️`,
    premium: false
  },
  {
    id: 13, icon: '🌺', cat: 'san-valentin', catLabel: 'San Valentín',
    title: 'Contigo aprendí a amar de verdad',
    text: `Mi amor,\n\nAntes de ti pensaba que sabía lo que era el amor. Pero tú me enseñaste que el amor real no duele, no agota, no asusta. El amor verdadero da fuerza, da paz, da ganas de ser mejor.\n\nGracias por enseñarme eso. Gracias por ser mi primera vez que algo así se siente tan bien.\n\nFeliz San Valentín, mi todo 🌺💕`,
    premium: false
  },
  {
    id: 14, icon: '💛', cat: 'buenas-noches', catLabel: 'Buenas noches',
    title: 'Lo mejor del día es pensar en ti',
    text: `Mi amor,\n\nCierra los ojos sabiendo que eres la persona más especial en mi mundo. Que independientemente de lo que pase afuera, aquí adentro tienes un lugar permanente y luminoso.\n\nMañana cuando abras los ojos, ya estaré pensando en ti.\n\nBuenas noches, mi corazón 💛🌙`,
    premium: false
  },
  {
    id: 15, icon: '♾️', cat: 'aniversario', catLabel: 'Aniversario',
    title: 'Si la vida me preguntara de nuevo',
    text: `Mi vida,\n\nSi la vida me diera la oportunidad de volver y elegir de nuevo, te elegiría a ti. En cada versión de la historia, en cada universo posible, tú eres la constante.\n\nNo hay nada que me hayas dado que no fuera exactamente lo que necesitaba.\n\nEres todo y más. Te amo, hoy y siempre. ♾️❤️`,
    premium: false
  },
  /* ---- CARTAS PREMIUM (bloqueadas) ---- */
  {
    id: 16, icon: '💎', cat: 'san-valentin', catLabel: 'San Valentín',
    title: 'La carta que siempre quisiste escribir',
    text: `Mi alma gemela,\n\nExisten amores que llegan con la delicadeza del viento en verano, casi sin notarse, pero que transforman todo a su paso. Tú eres ese tipo de amor...\n\n[Continúa con 8 párrafos exclusivos de alto impacto emocional]`,
    premium: true
  },
  {
    id: 17, icon: '💎', cat: 'boda', catLabel: 'Boda',
    title: 'Votos de boda que harán llorar de emoción',
    text: `Mi amor eterno,\n\nDesde el primer momento que te vi, supe que algo en mí había cambiado para siempre. Como cuando el amanecer pinta el cielo y ya no puedes imaginar la noche...\n\n[Votos de boda exclusivos, personalizables y de alta emoción]`,
    premium: true
  },
  {
    id: 18, icon: '💎', cat: 'aniversario', catLabel: 'Aniversario',
    title: 'Para el/la amor de tu vida en su día especial',
    text: `Mi universo,\n\nHay días en el calendario que son simples números, y luego está el tuyo. Ese día en que el mundo decidió traerte a él y con eso, me regaló lo mejor que me ha pasado...\n\n[Carta de cumpleaños ultra emotiva y personalizada]`,
    premium: true
  },
  {
    id: 19, icon: '💎', cat: 'distancia', catLabel: 'A distancia',
    title: 'Cuando el amor supera todos los océanos',
    text: `Mi amor lejano,\n\nLos océanos tienen nombre, los desiertos tienen nombre, las montañas tienen nombre. Pero lo que siento por ti no cabe en ningún mapa porque es más grande que cualquier geografía...\n\n[Carta de amor a distancia de alto impacto emocional]`,
    premium: true
  },
  {
    id: 20, icon: '💎', cat: 'buenas-noches', catLabel: 'Buenas noches',
    title: 'La carta de amor más poética del mundo',
    text: `Amor de mi vida,\n\nMientras la luna recorre su camino esta noche, yo pienso en cada instante contigo. En el olor de tu cabello, en el calor de tu mano, en la música que hace tu voz cuando pronuncias mi nombre...\n\n[Carta poética exclusiva con metáforas únicas]`,
    premium: true
  }
];

/* ============================================================
   PLANTILLAS DEL GENERADOR
   ============================================================ */
const letterTemplates = {
  'san-valentin': {
    poetico:    `{to} de mi corazón,\n\nEn este día del amor, el universo conspira para recordarme que eres la respuesta a todas mis preguntas sin formular. Cada vez que te miro, descubro algo nuevo que amar en ti.\n\nNo existe San Valentín suficientemente grande para contener lo que siento. Pero hoy, como cada día, quiero intentar decirte: eres mi todo.`,
    tierno:     `Mi adorado/a {to},\n\nHoy es el día del amor y yo solo puedo pensar en ti. En tu sonrisa que lo ilumina todo, en tu voz que me calma siempre, en tu corazón que es el más hermoso que conozco.\n\nFeliz San Valentín, mi amor 💝`,
    apasionado: `{to}, amor mío,\n\nHay días en que el amor que siento por ti me desborda. Hoy es uno de ellos. No puedo imaginar mi vida sin tu calor, sin tu presencia, sin saber que existes.\n\nEres el fuego que me mantiene vivo/a. Feliz San Valentín. 🔥`,
    divertido:  `Ey {to}! 😄\n\nSí, soy yo, tu pareja favorita (y única, espero 😂). ¡Feliz San Valentín! Decidí escribirte porque los chocolates ya los comí yo solo/a... perdón.\n\nEn serio: eres lo mejor que me ha pasado. Te amo, mi ridiculez favorita 💌`
  },
  'aniversario': {
    poetico:    `{to}, mi amor,\n\nCuando cuento los años a tu lado, no cuento solo tiempo. Cuento aventuras, discusiones superadas, carcajadas a medianoche, y una cantidad infinita de momentos que solo tú y yo recordamos.\n\nHoy celebramos no solo años: celebramos que seguimos eligiéndonos.`,
    tierno:     `Mi amor {to},\n\nUn año más (¡o los que sean!) y yo sigo tan enamorado/a como el primer día. Gracias por seguir siendo mi persona favorita, mi mejor amigo/a y el amor de mi vida.\n\nFeliz aniversario 💍`,
    apasionado: `{to},\n\nCada aniversario es la prueba de que lo nuestro está hecho para durar. Este amor no enfría, no se desgasta. Al contrario, cada día que pasa me convenzo más de que eres la persona correcta.\n\n¡Feliz aniversario, mi pasión! ❤️🔥`,
    divertido:  `{to}, ¡llevamos {years} años juntos y sigues aguantándome! 🎉\n\nEso merece un premio, un trofeo o por lo menos un helado. Gracias por elegir este caos día tras día.\n\n¡Feliz aniversario, mi persona favorita del mundo mundial! 🥳`
  },
  'boda': {
    poetico:    `{to}, mi amor eterno,\n\nHoy frente a todos, te prometo no solo amor, sino también honestidad, paciencia y crecer juntos aunque el camino sea difícil. Te prometo elegirte cada mañana cuando abra los ojos.\n\nHoy comenzamos el capítulo más hermoso de nuestra historia.`,
    tierno:     `Mi {to} hermoso/a,\n\nHoy es el día más feliz de mi vida porque hoy me convierto en tu esposo/a. Prometo cuidarte, reírme contigo y ser tu mejor versión siempre.\n\nTe amo hoy y todos los días que me quedan 💒`,
    apasionado: `{to}, amor de mi vida,\n\nHoy le digo al mundo lo que mi corazón ya sabía: eres la persona con quien quiero despertar cada día, con quien quiero enfrentar cada tormenta y celebrar cada victoria.\n\nHoy y siempre, tuyo/a. 💍🔥`,
    divertido:  `{to} 😄\n\nBien, después de mucho pensar (unos 3 segundos), decidí que sí quiero casarme contigo. No por el pastel (bueno, un poco por el pastel 🎂), sino porque eres lo mejor que me ha pasado.\n\n¡Sí, acepto! 💒`
  },
  'cumpleanos': {
    poetico:    `{to}, mi amor,\n\nHoy el mundo celebra algo extraordinario: el día en que naciste. Y yo, que tengo la fortuna de conocerte, sé que este día debería ser feriado nacional.\n\nQue este año que comienza esté lleno de todo lo que mereces: que es todo lo bueno del mundo.`,
    tierno:     `¡Feliz cumpleaños, {to}! 🎂\n\nHoy es tu día especial y quiero que sepas que eres de las personas más maravillosas que conozco. Que cumplas muchos más rodeado/a de amor.\n\nTe quiero muchísimo 🎉`,
    apasionado: `{to},\n\nHoy celebro no solo tu cumpleaños sino la existencia de la persona que más amo. Gracias por existir, por cruzarte en mi camino y por hacer que cada día valga la pena.\n\n¡Feliz cumpleaños, mi todo! 🎂❤️🔥`,
    divertido:  `¡FELIZ CUMPLEAÑOS {to}! 🎉🎂🎈\n\nSí, hoy tienes un año más de encima, pero también un año más de experiencia para aguantarme. ¡Win-win!\n\nEspero que hoy sea tan especial como tú lo eres para mí. ¡A celebrar! 🥳`
  },
  'primer-mes': {
    poetico:    `{to}, mi amor,\n\nUn mes parece poco cuando cada día a tu lado ha valido por un año. En treinta días has llenado mi vida de colores que no sabía que le faltaban.\n\nEste es solo el comienzo de algo hermoso.`,
    tierno:     `Mi {to},\n\n¡Un mes juntos! Puede parecer poco, pero yo ya no puedo imaginar mis días sin ti. Gracias por aparecer y hacer todo mejor.\n\nTe quiero mucho, mi amor 🌸`,
    apasionado: `{to},\n\nUn mes contigo y ya sé que encontré algo especial. Cada día me gusta más, me enamoras más, y quiero más. ¡Que vengan muchos meses más!\n\nTuyo/a. 🔥❤️`,
    divertido:  `{to}!! ¡¡Un MES!! 🎉\n\nLlevamos 30 días y todavía me aguantas... eso es amor de verdad 😂. Bromeando. Eres lo mejor y espero que sean infinitos los meses juntos.\n\n¡Feliz mensiversario! 🥳`
  },
  'amor-eterno': {
    poetico:    `{to}, mi amor eterno,\n\nSi existiera una palabra más grande que amor, la usaría para ti. Pero por ahora digo: te amo. Con cada parte de lo que soy y todo lo que seré.\n\nEres constante. Eres mi norte.`,
    tierno:     `{to},\n\nSolo quería escribirte para decirte que te amo. Sin razón especial, sin fecha importante. Solo porque sí y porque lo siento.\n\nTe amo mucho 💛`,
    apasionado: `Amor mío {to},\n\nNo existe un límite para lo que siento por ti. Es inmenso, es intenso, es permanente. Eres lo que busqué sin saber que te buscaba.\n\nPara siempre. ❤️🔥`,
    divertido:  `Oye {to},\n\nSolo te escribo para recordarte que eres mi persona favorita (no se lo digas a nadie más 🤫). Te quiero mucho, montones, un chingo.\n\nSiempre tuyo/a 💌😄`
  }
};

/* ============================================================
   RENDER DE CARTAS
   ============================================================ */
let currentFilter = 'todas';

/**
 * Renderiza las cartas en el grid según el filtro activo
 * @param {string} filter - Categoría a mostrar o 'todas'
 */
function renderCards(filter) {
  const grid     = document.getElementById('cardsGrid');
  const filtered = filter === 'todas' ? cartas : cartas.filter(c => c.cat === filter);
  grid.innerHTML = '';

  filtered.forEach((carta, i) => {
    const div = document.createElement('div');
    div.className = 'card' + (carta.premium ? ' premium' : '');
    div.style.animationDelay = `${i * 0.07}s`;

    if (carta.premium) {
      div.innerHTML = `
        <span class="card-icon">${carta.icon}</span>
        <span class="card-cat">${carta.catLabel}</span>
        <div class="card-title">${carta.title}</div>
        <div class="card-text">${carta.text}</div>
        <div class="premium-overlay" onclick="openModal('premiumModal')">
          <div class="premium-badge">💎 Premium</div>
          <p>Desbloquear esta carta</p>
        </div>`;
    } else {
      div.innerHTML = `
        <span class="card-icon">${carta.icon}</span>
        <span class="card-cat">${carta.catLabel}</span>
        <div class="card-title">${carta.title}</div>
        <div class="card-text">${carta.text.substring(0, 160)}...</div>
        <div class="card-actions">
          <button class="btn btn-ghost" onclick="copyCarta(${carta.id})">📋 Copiar</button>
          <button class="btn btn-ghost" onclick="readCarta(${carta.id})">👁 Ver completa</button>
          <button class="btn btn-ghost" onclick="shareCartaWA(${carta.id})">🟢 WA</button>
        </div>`;
    }
    grid.appendChild(div);
  });
}

/**
 * Filtra las cartas y activa el botón de filtro correspondiente
 * @param {string} cat - Categoría
 * @param {Element|null} btn - Botón que activó el filtro
 */
function filterCards(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCards(cat);
  document.getElementById('cartas').scrollIntoView({ behavior: 'smooth' });
}

/* ============================================================
   COPIAR CARTA
   ============================================================ */
/**
 * Copia el texto de una carta al portapapeles
 * @param {number} id - ID de la carta
 */
function copyCarta(id) {
  const carta = cartas.find(c => c.id === id);
  if (!carta) return;

  const copy = () => showCopyFeedback('💌 ¡Carta copiada! Envíasela a tu amor ❤️');

  if (navigator.clipboard) {
    navigator.clipboard.writeText(carta.text).then(copy).catch(() => fallbackCopy(carta.text, copy));
  } else {
    fallbackCopy(carta.text, copy);
  }
}

function fallbackCopy(text, callback) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity  = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  if (callback) callback();
}

function showCopyFeedback(msg) {
  const el = document.getElementById('copyFeedback');
  el.textContent = msg || '💌 ¡Carta copiada! Envíasela a tu amor ❤️';
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3200);
}

/* ============================================================
   VER CARTA COMPLETA (en el previsualizador)
   ============================================================ */
function readCarta(id) {
  const carta = cartas.find(c => c.id === id);
  if (!carta) return;
  document.getElementById('prevTitle').textContent = carta.title;
  document.getElementById('prevBody').textContent  = carta.text;
  document.getElementById('prevSign').textContent  = '— ' + carta.catLabel;
  document.getElementById('crear').scrollIntoView({ behavior: 'smooth' });
}

/* ============================================================
   COMPARTIR CARTA EN WHATSAPP
   ============================================================ */
function shareCartaWA(id) {
  const carta = cartas.find(c => c.id === id);
  if (!carta) return;
  const msg = encodeURIComponent(`💌 *${carta.title}*\n\n${carta.text}\n\n---\nEncontrada en CartasdeAmor.co ❤️`);
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}

/* ============================================================
   GENERADOR DE CARTAS
   ============================================================ */
function updatePreview() {
  const to   = document.getElementById('toName').value   || 'Mi amor';
  const from = document.getElementById('fromName').value || 'Tu amor';
  const occ  = document.getElementById('occasion').value;

  const titleMap = {
    'san-valentin': `${to} de mi corazón,`,
    'aniversario':  `${to}, mi vida,`,
    'boda':         `${to}, mi amor eterno,`,
    'cumpleanos':   `¡Feliz cumpleaños, ${to}!`,
    'primer-mes':   `${to}, mi amor,`,
    'amor-eterno':  `${to}, mi todo,`
  };

  document.getElementById('prevTitle').textContent = titleMap[occ] || `${to}, mi amor,`;
  document.getElementById('prevSign').textContent  = `— Con todo mi amor, ${from}`;
  const note = document.getElementById('personalNote').value;
  if (!document.getElementById('prevBody').dataset.generated && note) {
    document.getElementById('prevBody').textContent = note;
  }
}

function generateLetter() {
  const to   = document.getElementById('toName').value   || 'Mi amor';
  const from = document.getElementById('fromName').value || 'Tu amor';
  const occ  = document.getElementById('occasion').value;
  const tone = document.getElementById('tone').value;
  const note = document.getElementById('personalNote').value;

  const templates = letterTemplates[occ] || letterTemplates['amor-eterno'];
  let text = (templates[tone] || templates['poetico'])
    .replace(/\{to\}/g, to)
    .replace(/\{from\}/g, from)
    .replace(/\{years\}/g, Math.floor(Math.random() * 5) + 1);

  if (note) text += `\n\nP.D.: ${note}`;

  const titleMap = {
    'san-valentin': `${to} de mi corazón,`,
    'aniversario':  `${to}, mi vida,`,
    'boda':         `${to}, mi amor eterno,`,
    'cumpleanos':   `¡Feliz cumpleaños, ${to}!`,
    'primer-mes':   `${to}, mi amor,`,
    'amor-eterno':  `${to}, mi todo,`
  };

  document.getElementById('prevTitle').textContent      = titleMap[occ] || `${to}, mi amor,`;
  document.getElementById('prevBody').textContent       = text;
  document.getElementById('prevBody').dataset.generated = 'true';
  document.getElementById('prevSign').textContent       = `— Con todo mi amor, ${from}`;
}

function copyGeneratedLetter() {
  const title = document.getElementById('prevTitle').textContent;
  const body  = document.getElementById('prevBody').textContent;
  const sign  = document.getElementById('prevSign').textContent;
  const full  = `${title}\n\n${body}\n\n${sign}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(full).then(() => showCopyFeedback()).catch(() => fallbackCopy(full, showCopyFeedback));
  } else {
    fallbackCopy(full, showCopyFeedback);
  }
}

/* ============================================================
   MONETIZACIÓN — FUNCIONES DE PAGO
   ============================================================ */

/** Abre PayPal para carta básica ($3) */
function paypalBasic() { window.open(LINKS.paypal_basic, '_blank'); }

/** Abre PayPal para carta premium ($5) */
function paypalPremium() { window.open(LINKS.paypal_premium, '_blank'); }

/** Abre PayPal para descargar PDF ($2) */
function paypalPDF() { window.open(LINKS.paypal_pdf, '_blank'); }

/** Abre donación en PayPal */
function paypalDonate() { window.open(LINKS.paypal_donate, '_blank'); }

/** Abre WhatsApp para pedir carta personalizada */
function orderByWhatsApp() { window.open(LINKS.whatsapp_order, '_blank'); }

/* ============================================================
   COMPARTIR REDES SOCIALES
   ============================================================ */
function shareWhatsApp() {
  const msg = encodeURIComponent('💌 Encontré estas cartas románticas increíbles para San Valentín, aniversarios y más. ¡Envíasela a tu amor! ❤️\n\n' + CONFIG.SITE_URL);
  window.open('https://wa.me/?text=' + msg, '_blank');
}
function shareFacebook() {
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(CONFIG.SITE_URL), '_blank');
}
function shareTwitter() {
  const msg = encodeURIComponent('💌 Cartas románticas hermosas para San Valentín y más 🌹 Perfectas para enviarle a tu amor ❤️');
  window.open('https://twitter.com/intent/tweet?text=' + msg + '&url=' + encodeURIComponent(CONFIG.SITE_URL), '_blank');
}
function copyLink() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(CONFIG.SITE_URL).then(() => showCopyFeedback('🔗 ¡Enlace copiado! Compártelo con amor'));
  } else {
    fallbackCopy(CONFIG.SITE_URL, () => showCopyFeedback('🔗 ¡Enlace copiado! Compártelo con amor'));
  }
}

/* ============================================================
   MODALES
   ============================================================ */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================================
   NAVBAR MÓVIL
   ============================================================ */
function toggleNav() { document.getElementById('navLinks').classList.toggle('open'); }
function closeNav()  { document.getElementById('navLinks').classList.remove('open'); }

/* ============================================================
   GOTO CATEGORY (desde fechas)
   ============================================================ */
function goToCategory(cat) {
  filterCards(cat, null);
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById('cartas').scrollIntoView({ behavior: 'smooth' });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================================
   CANVAS — CORAZONES FLOTANTES
   ============================================================ */
function initHearts() {
  const canvas = document.getElementById('hearts-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, hearts = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Heart() { this.reset(); }
  Heart.prototype.reset = function() {
    this.x     = Math.random() * W;
    this.y     = H + 20;
    this.size  = Math.random() * 14 + 7;
    this.vx    = (Math.random() - 0.5) * 0.9;
    this.vy    = -(Math.random() * 0.8 + 0.4);
    this.alpha = Math.random() * 0.5 + 0.1;
    this.sway  = Math.random() * 0.03 + 0.01;
    this.time  = 0;
    this.color = ['#E8295B','#C0152A','#F9BFCB','#C9963A','#ff6b9d'][Math.floor(Math.random() * 5)];
  };
  Heart.prototype.update = function() {
    this.time += 0.03;
    this.x    += this.vx + Math.sin(this.time) * this.sway * 20;
    this.y    += this.vy;
    this.alpha -= 0.0018;
    if (this.alpha <= 0 || this.y < -30) this.reset();
  };
  Heart.prototype.draw = function() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle   = this.color;
    ctx.translate(this.x, this.y);
    ctx.scale(this.size / 10, this.size / 10);
    ctx.beginPath();
    ctx.moveTo(0, -3.5);
    ctx.bezierCurveTo( 0, -6.5, -5, -6.5, -5, -3.5);
    ctx.bezierCurveTo(-5, -0.5,  0,  3,    0,  6);
    ctx.bezierCurveTo( 0,  3,    5, -0.5,  5, -3.5);
    ctx.bezierCurveTo( 5, -6.5,  0, -6.5,  0, -3.5);
    ctx.fill();
    ctx.restore();
  };

  for (let i = 0; i < 38; i++) {
    const h = new Heart();
    h.y     = Math.random() * H;
    h.alpha = Math.random() * 0.3 + 0.05;
    hearts.push(h);
  }

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    hearts.forEach(h => { h.update(); h.draw(); });
    requestAnimationFrame(loop);
  })();
}

/* ============================================================
   CERRAR MODALES CON CLIC EN BACKDROP
   ============================================================ */
function initModalClose() {
  document.querySelectorAll('.modal-backdrop').forEach(m => {
    m.addEventListener('click', function(e) {
      if (e.target === this) closeModal(this.id);
    });
  });
}

/* ============================================================
   INIT — PUNTO DE ENTRADA
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
  renderCards('todas');
  generateLetter();
  updatePreview();
  initReveal();
  initHearts();
  initModalClose();

  /* Popup automático con delay configurable */
  setTimeout(() => openModal('timedModal'), CONFIG.POPUP_DELAY);
});
