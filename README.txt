============================================================
  CartasDeAmor.co — Proyecto Web Completo
  Versión 2.0 | Con monetización PayPal + WhatsApp
============================================================

ESTRUCTURA DEL PROYECTO:
─────────────────────────
/proyecto-cartas/
│
├── index.html          ← Página principal (sube este archivo)
├── css/
│   └── styles.css      ← Todos los estilos
├── js/
│   └── app.js          ← Toda la lógica JavaScript
├── assets/
│   ├── images/         ← (vacío — para fotos/imágenes futuras)
│   ├── icons/          ← (vacío — para iconos personalizados)
│   └── fonts/          ← (vacío — para fuentes locales opcionales)
└── README.txt          ← Este archivo


═══════════════════════════════════════════════
  PASO 1 — CONFIGURAR TUS DATOS DE PAGO
═══════════════════════════════════════════════

Abre js/app.js y edita el bloque CONFIG al inicio:

  const CONFIG = {
    PAYPAL_USER : 'TUUSUARIO',      ← Tu usuario PayPal.me real
    WA_NUMBER   : '18091234567',    ← Tu número WhatsApp (sin + ni espacios)
    ...
  };

También busca en index.html la cadena "TUUSUARIO" y reemplázala
con tu usuario real de PayPal.me (hay varios botones).


═══════════════════════════════════════════════
  PASO 2 — ACTIVAR GOOGLE ADSENSE (opcional)
═══════════════════════════════════════════════

En index.html descomenta estas líneas en el <head>:

  <!-- <script async src="https://pagead2.googlesyndication.com/
       pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
       crossorigin="anonymous"></script> -->

Y reemplaza los 3 bloques .ad-slot con tu código AdSense real.


═══════════════════════════════════════════════
  PASO 3 — SUBIR A HOSTING
═══════════════════════════════════════════════

OPCIÓN A — Hosting tradicional (cPanel, Hostinger, etc.):
  1. Sube toda la carpeta /proyecto-cartas/ via FTP o File Manager
  2. El archivo principal es index.html

OPCIÓN B — GitHub Pages (gratis):
  1. Crea un repositorio en GitHub
  2. Sube los archivos al repositorio
  3. Activa GitHub Pages en Settings → Pages

OPCIÓN C — Netlify (gratis, drag & drop):
  1. Ve a https://netlify.com
  2. Arrastra la carpeta al panel de Netlify
  3. ¡Listo! Obtienes una URL gratis

OPCIÓN D — Vercel (gratis):
  1. Ve a https://vercel.com
  2. Conecta tu repositorio GitHub
  3. Deploy automático


═══════════════════════════════════════════════
  MÉTODOS DE MONETIZACIÓN INCLUIDOS
═══════════════════════════════════════════════

💰 MÉTODO 1 — Cartas personalizadas vía WhatsApp
   • Botón directo a tu WhatsApp para recibir pedidos
   • Precio recomendado: $3 básica / $5 premium

💳 MÉTODO 2 — Pagos directos con PayPal.me
   • Carta básica: $3
   • Carta + PDF:  $5
   • PDF descarga: $2
   • Plan mensual: $4.99

☕ MÉTODO 3 — Donación pasiva (footer)
   • Link a PayPal.me sin monto fijo

📢 MÉTODO 4 — Google AdSense (3 espacios listos)
   • Header: 728×90
   • Medio:  300×250 o 728×90
   • Footer: 728×90


═══════════════════════════════════════════════
  CANALES DE TRÁFICO RECOMENDADOS
═══════════════════════════════════════════════

🎵 TikTok:
   • Graba un video leyendo una carta con música romántica
   • Hashtags: #cartasdeamor #sanvalentin #amor #pareja
   • CTA: "Enlace en bio para más cartas" → tu web

💬 WhatsApp/Grupos:
   • Comparte una carta en grupos de estado
   • "¿Tienes pareja? Envíale esto 💌 [link]"

📸 Instagram:
   • Publica capturas de las cartas como posts
   • Stories con swipe-up al link

🤝 Facebook:
   • Grupos de parejas, amor, relaciones
   • Publica cartas con watermark de tu web


═══════════════════════════════════════════════
  TECNOLOGÍAS USADAS
═══════════════════════════════════════════════
• HTML5 semántico
• CSS3 con variables, animaciones y grid/flexbox
• JavaScript vanilla (sin frameworks — 0 dependencias)
• Google Fonts: Playfair Display, Lato, Great Vibes
• Canvas API para corazones animados
• IntersectionObserver para scroll reveal
• Clipboard API para copiar cartas


============================================================
  Hecho con ❤️ para generar amor y dinero al mismo tiempo
  © 2025 CartasDeAmor.co
============================================================
