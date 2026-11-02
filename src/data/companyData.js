/**
 * Todo el contenido editorial de la landing vive aquí.
 * Cambia estos textos sin tocar la lógica de los componentes.
 */

export const NAV_LINKS = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Misión y visión', href: '#mision-vision' },
  { label: 'Valores', href: '#valores' },
  { label: 'Organigrama', href: '#organigrama' },
  { label: 'Gestión Humana', href: '#gestion-humana' },
  { label: 'Evaluación 270°', href: '#evaluacion' },
];

export const HERO = {
  eyebrow: 'Servicio técnico · Medellín, Colombia',
  titleLines: ['Tu celular,', 'en buenas', 'manos.'],
  description:
    'Diagnóstico, mantenimiento y reparación de celulares con la calma de saber que tu equipo está en un lugar que cuida cada detalle.',
  primaryCta: { label: 'Agendar diagnóstico', href: '#contacto' },
  secondaryCta: { label: 'Conoce Mr. Fix-it', href: '#nosotros' },
  proof: [
    { value: '4.9/5', label: 'valoración de clientes' },
    { value: '90 días', label: 'de garantía real' },
    { value: 'Medellín', label: 'taller especializado' },
  ],
  phone: {
    status: 'Diagnóstico en curso',
    device: 'iPhone 13 · Mr. Fix-it',
    chips: [
      { tone: 'blue', label: 'Batería', value: '87%' },
      { tone: 'green', label: 'Pantalla', value: 'OK' },
      { tone: 'red', label: 'Cámara', value: 'Fallo detectado' },
    ],
    progressLabel: 'Analizando hardware y software',
    progress: 76,
  },
};

export const METRICS = [
  {
    id: 'reparaciones',
    value: 4800,
    suffix: '+',
    label: 'equipos recuperados',
    detail: 'Confianza construida equipo por equipo.',
  },
  {
    id: 'diagnostico',
    value: 35,
    suffix: ' min',
    label: 'diagnóstico promedio',
    detail: 'Claridad antes de intervenir.',
  },
  {
    id: 'garantia',
    value: 90,
    suffix: ' días',
    label: 'de garantía real',
    detail: 'Respaldo en cada reparación.',
  },
  {
    id: 'satisfaccion',
    value: 98,
    suffix: '%',
    label: 'clientes satisfechos',
    detail: 'Una experiencia que se recuerda.',
  },
];

export const STORY = [
  {
    id: 'origen',
    kicker: '01 · Los días difíciles',
    title: 'Un sueño que empezó lejos del taller.',
    text: 'El fundador trabajaba como domiciliario en una pollería. La pandemia puso sobre la mesa una certeza incómoda: necesitaba un cambio, y estaba dispuesto a construirlo.',
  },
  {
    id: 'decision',
    kicker: '02 · La decisión',
    title: 'Ahorrar, estudiar y empezar de nuevo.',
    text: 'Con disciplina ahorró lo necesario y estudió una tecnología en reparación de celulares. Cada clase era una apuesta por un futuro distinto.',
  },
  {
    id: 'socio',
    kicker: '03 · El encuentro',
    title: 'Un socio que creyó en el proyecto.',
    text: 'Al graduarse encontró a alguien que vio lo mismo que él: una oportunidad para hacer las cosas bien. Juntos decidieron convertir el conocimiento en empresa.',
  },
  {
    id: 'nacimiento',
    kicker: '04 · Nace Mr. Fix-it',
    title: 'Del pequeño taller a un lugar de confianza.',
    text: 'Después de la pandemia dieron vida a Mr. Fix-it. Lo que comenzó como un taller pequeño hoy es un espacio donde la confianza, la calidad y la dedicación sostienen cada reparación.',
  },
  {
    id: 'hoy',
    kicker: '05 · Hoy',
    title: 'Soluciones reales, sin olvidar el origen.',
    text: 'Nuestro propósito es ofrecer soluciones reales y accesibles, recordando siempre de dónde venimos y hacia dónde queremos llegar.',
  },
];

export const PURPOSE = {
  mission:
    'Brindamos los mejores productos con calidad, mantenimiento y soporte técnico especializado para tu dispositivo móvil, trabajando para generarte satisfacción.',
  vision:
    'Para 2030, ampliar el catálogo de productos y servicios, atraer más clientes, incrementar el personal técnico y comercial y expandirnos con nuevas sucursales a nivel nacional e internacional, para mejorar la experiencia de nuestros usuarios.',
  objective:
    'Brindar servicios integrales de diagnóstico, mantenimiento y reparación de celulares y equipos tecnológicos, garantizando calidad, eficiencia y confianza, para prolongar la vida útil de los dispositivos con soluciones técnicas seguras, innovadoras y sostenibles.',
  specific: [
    'Impulsar las ventas y los servicios técnicos con nuevos catálogos.',
    'Implementar procesos de reclutamiento y selección de personal calificado.',
    'Expandirnos con nuevas sucursales y una operación más cercana.',
  ],
};

export const VALUES = [
  {
    id: 'integridad',
    number: '01',
    icon: 'shield',
    title: 'Integridad',
    text: 'Diagnósticos precisos y precios justos. Decimos lo que encontramos y explicamos lo que sigue.',
  },
  {
    id: 'innovacion',
    number: '02',
    icon: 'sparkles',
    title: 'Innovación',
    text: 'Incorporamos nuevas tecnologías y métodos de mantenimiento para cuidar mejor cada dispositivo.',
  },
  {
    id: 'eficiencia',
    number: '03',
    icon: 'bolt',
    title: 'Eficiencia',
    text: 'Procesos optimizados para reducir el tiempo de espera sin sacrificar la calidad.',
  },
  {
    id: 'responsabilidad',
    number: '04',
    icon: 'lifebuoy',
    title: 'Responsabilidad',
    text: 'Cumplimos los compromisos y cuidamos los equipos como si fueran nuestros.',
  },
  {
    id: 'compromiso',
    number: '05',
    icon: 'heart',
    title: 'Compromiso',
    text: 'Damos lo mejor en cada reparación, incluso en los detalles que nadie ve.',
  },
];

export const LOYALTY = {
  eyebrow: 'Un detalle por seguir confiando',
  title: 'Tu fidelidad tiene recompensa.',
  description:
    'Cada visita suma. En la tercera visita desbloqueas un 10% de descuento y en la sexta llegas al 20%. Sin letra pequeña, sin complicaciones.',
  milestones: [
    { visits: 3, discount: 10, label: 'Tercera visita' },
    { visits: 6, discount: 20, label: 'Sexta visita' },
  ],
  disclaimer: 'Demostración interactiva. El descuento se aplica según las condiciones vigentes en el taller.',
};

export const STRATEGIES = [
  {
    id: 'accesorios',
    icon: 'plug',
    title: 'Accesorios para cada dispositivo',
    text: 'Variedad de protectores, cargadores, audífonos y complementos seleccionados para acompañar tu día a día.',
  },
  {
    id: 'online',
    icon: 'bag',
    title: 'Compra también en línea',
    text: 'Venta en plataformas digitales para que encuentres lo que necesitas sin desplazarte.',
  },
  {
    id: 'atencion',
    icon: 'chat',
    title: 'Atención plena',
    text: 'Te saludamos por tu nombre, escuchamos con atención y te explicamos el proceso en palabras sencillas.',
  },
  {
    id: 'detalles',
    icon: 'gift',
    title: 'Detalles que alegran el día',
    text: 'Limpieza gratuita al recoger tu equipo, un sticker tecnológico de obsequio y un mensaje personalizado al entregar.',
  },
];

export const FISH_CULTURE = [
  {
    id: 'jugar',
    icon: 'game',
    title: 'Jugar',
    subtitle: 'El trabajo también puede sentirse vivo.',
    accent: 'red',
    actions: [
      'Reto diario de diagnóstico de 10 minutos.',
      'Torneo interno de eficiencia y calidad.',
      'Celebramos los logros del equipo en voz alta.',
    ],
    owner: 'Coordinación técnica y ventas',
  },
  {
    id: 'actitud',
    icon: 'smile',
    title: 'Escoge tu actitud',
    subtitle: 'La energía se elige y se contagia.',
    accent: 'blue',
    actions: [
      'Check-in emocional al iniciar la jornada.',
      'Lenguaje positivo incluso en días complejos.',
      'Convertimos cada queja en una acción concreta.',
    ],
    owner: 'Todo el equipo · líderes con el ejemplo',
  },
  {
    id: 'presente',
    icon: 'eye',
    title: 'Estar presente',
    subtitle: 'La mejor tecnología es la atención.',
    accent: 'white',
    actions: [
      'Saludo por el nombre y contacto visual.',
      'Escuchar sin interrumpir antes de proponer.',
      'Una conversación a la vez, sin distracciones.',
    ],
    owner: 'Atención al cliente y coordinaciones',
  },
  {
    id: 'alegrar',
    icon: 'gift',
    title: 'Alegrarles el día',
    subtitle: 'Lo pequeño también deja huella.',
    accent: 'green',
    actions: [
      'Limpieza gratuita al entregar el equipo.',
      'Sticker tecnológico de obsequio.',
      'Mensaje personalizado en cada entrega.',
    ],
    owner: 'Técnicos y auxiliares de atención',
  },
];

export const INTELLIGENCES = [
  {
    id: 'interpersonal',
    label: 'Interpersonal',
    short: 'Interpersonal',
    value: 92,
    description: 'Escuchar, coordinar y construir confianza con clientes y compañeros.',
    icon: 'users',
  },
  {
    id: 'intrapersonal',
    label: 'Intrapersonal',
    short: 'Intrapersonal',
    value: 88,
    description: 'Autoconocimiento y regulación emocional para decidir con calma.',
    icon: 'compass',
  },
  {
    id: 'visual',
    label: 'Visual-espacial',
    short: 'Visual',
    value: 84,
    description: 'Leer el detalle, imaginar soluciones y trabajar con precisión.',
    icon: 'layers',
  },
  {
    id: 'corporal',
    label: 'Corporal-kinestésica',
    short: 'Kinestésica',
    value: 80,
    description: 'Destreza manual fina para reparaciones y microsoldadura.',
    icon: 'hand',
  },
  {
    id: 'verbal',
    label: 'Verbal-lingüística',
    short: 'Verbal',
    value: 86,
    description: 'Explicar lo técnico de forma clara, cercana y sin tecnicismos.',
    icon: 'quote',
  },
];

export const CONTACT = {
  city: 'Medellín, Colombia',
  address: 'Taller de servicio técnico · atención con cita previa',
  email: 'hola@mrfixit.co',
  schedule: 'Lunes a sábado · 9:00 a 18:00',
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
  ],
};
