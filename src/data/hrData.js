/** Procesos de Gestión Humana. Edita libremente textos, iconos y responsables. */
export const HR_PROCESSES = [
  {
    id: 'atraccion',
    icon: 'search',
    label: 'Atracción y selección',
    eyebrow: '01 · Talento',
    title: 'Buscamos personas que cuiden el detalle.',
    description:
      'Perfiles claros, pruebas reales y una decisión conjunta entre quienes conocen el oficio y quienes cuidan a las personas.',
    points: [
      'Perfil técnico: formación en reparación, diagnóstico de hardware y software, microsoldadura deseable y prueba práctica de 45 minutos.',
      'Perfil vendedor: escucha activa, conocimiento de accesorios, manejo de caja y dominio del protocolo de atención.',
      'Publicación en portales, referidos y entrevista por valores antes de la prueba técnica.',
      'Decisión conjunta entre coordinación técnica, comercial y RRHH; objetivo de contratación: 15 días.',
    ],
    owner: 'Coordinación de RRHH + líder del área',
  },
  {
    id: 'induccion',
    icon: 'door',
    label: 'Incorporación e inducción',
    eyebrow: '02 · Bienvenida',
    title: 'El primer día también se diseña.',
    description:
      'Una llegada clara, con nombre propio y acompañamiento real, para que la persona entienda cómo se trabaja aquí desde el minuto uno.',
    points: [
      'Bienvenida por nombre, recorrido por el taller y presentación del equipo.',
      'Entrega de dotación, herramientas, accesos y protocolos de seguridad.',
      'Inducción de cinco días: cultura, atención al cliente, procesos técnicos y calidad.',
      'Mentor asignado y agenda de seguimiento a los 30, 60 y 90 días.',
    ],
    owner: 'Coordinación de RRHH + mentor del área',
  },
  {
    id: 'capacitacion',
    icon: 'book',
    label: 'Capacitación y desarrollo',
    eyebrow: '03 · Aprendizaje',
    title: 'Aprender hace parte del trabajo.',
    description:
      'La tecnología cambia rápido; nuestro equipo también. La formación es mensual, práctica y conectada con los casos reales del taller.',
    points: [
      'Capacitación mensual obligatoria: hardware, software, atención y seguridad.',
      'Talleres prácticos, clínica de casos y reto diario de diagnóstico de 10 minutos.',
      'Plan de certificaciones y biblioteca técnica interna para consulta del equipo.',
      'Evaluación de aprendizaje y aplicación concreta en el puesto de trabajo.',
    ],
    owner: 'Coordinación técnica + RRHH',
  },
  {
    id: 'desempeno',
    icon: 'chart',
    label: 'Evaluación del desempeño',
    eyebrow: '04 · Crecimiento',
    title: 'Medimos para acompañar, no para señalar.',
    description:
      'Indicadores claros, conversaciones frecuentes y un plan de mejoramiento con fechas. La evaluación 270° completa la mirada del equipo.',
    points: [
      'Indicadores: tiempo de reparación, primera visita resuelta, satisfacción, garantías y cumplimiento de protocolos.',
      'Revisión mensual 1:1 y evaluación 270° semestral: jefe, equipo y autoevaluación.',
      'Retroalimentación descriptiva, acuerdos concretos y plan de mejoramiento.',
      'Seguimiento a compromisos y reconocimiento de los avances.',
    ],
    owner: 'Coordinación de técnicos + RRHH',
  },
  {
    id: 'compensacion',
    icon: 'gift',
    label: 'Compensación y beneficios',
    eyebrow: '05 · Reconocimiento',
    title: 'Lo justo también se nota.',
    description:
      'Compensación clara, incentivos por metas de calidad y detalles que reconocen el esfuerzo del equipo.',
    points: [
      'Salario fijo + incentivo por metas de calidad, productividad y satisfacción.',
      'Bonificaciones por referidos y cumplimiento sostenido de garantías.',
      '“Empleado del mes” y reconocimiento público en la reunión semanal.',
      'Beneficios: descuento en accesorios, día de cumpleaños y apoyo para formación.',
    ],
    owner: 'Dirección + Coordinación de RRHH',
  },
  {
    id: 'bienestar',
    icon: 'heart',
    label: 'Bienestar y relaciones laborales',
    eyebrow: '06 · Cultura',
    title: 'Un buen lugar para trabajar se siente.',
    description:
      'Escucha, seguridad y celebraciones pequeñas que sostienen el clima. La cultura FISH se practica, no se decora.',
    points: [
      'Reuniones semanales de 15 minutos para celebrar, alinear y escuchar.',
      'Pausas activas, ergonomía, protocolos de bioseguridad y matriz de riesgos.',
      'Canal confidencial de escucha y acompañamiento ante conflictos.',
      'Actividades de integración, celebraciones de hitos y “alegrarles el día”.',
    ],
    owner: 'Coordinación de RRHH + auxiliar de SST',
  },
];

export const HR_PRINCIPLES = [
  'Perfiles claros',
  'Pruebas prácticas',
  'Formación mensual',
  'Feedback continuo',
  'Metas con sentido',
  'Bienestar real',
];
