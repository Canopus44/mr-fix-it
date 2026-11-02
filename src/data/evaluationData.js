/**
 * Datos de la Evaluación de Desempeño 270°.
 * Cambia preguntas, competencias, tipos o ponderaciones aquí.
 */

export const EVALUATION_META = {
  role: 'Coordinador de técnicos',
  area: 'Servicio técnico, Hardware y Software',
  notice: 'Tus respuestas no se almacenan; se pierden al recargar la página.',
  scale: [
    { value: 1, label: 'Deficiente', short: 'Deficiente' },
    { value: 2, label: 'Necesita mejorar', short: 'Necesita mejorar' },
    { value: 3, label: 'Cumple parcialmente', short: 'Cumple parcialmente' },
    { value: 4, label: 'Bueno', short: 'Bueno' },
    { value: 5, label: 'Excelente', short: 'Excelente' },
  ],
};

export const EVALUATION_TYPES = [
  {
    id: 'jefe',
    label: 'Jefe directo',
    weight: 0.4,
    icon: 'briefcase',
    description: 'Mirada de quien lidera el área y conoce los resultados.',
  },
  {
    id: 'equipo',
    label: 'Equipo (técnicos)',
    weight: 0.4,
    icon: 'users',
    description: 'Puedes registrar varias evaluaciones; se promedian como una sola fuente.',
  },
  {
    id: 'auto',
    label: 'Autoevaluación',
    weight: 0.2,
    icon: 'compass',
    description: 'Una lectura honesta del propio desempeño.',
  },
];

/** Nombres internos de las fuentes en la consolidación 270°. */
export const SOURCE_LABELS = {
  jefe: 'Jefe directo',
  equipo: 'Equipo técnico',
  auto: 'Autoevaluación',
};

/** Pesos originales. La suma debe ser 1. */
export const EVALUATION_WEIGHTS = {
  jefe: 0.4,
  equipo: 0.4,
  auto: 0.2,
};

export const COMPETENCIES = [
  {
    id: 'A',
    code: 'A',
    short: 'Liderazgo',
    title: 'Liderazgo y manejo de equipo',
    description: 'Cómo organiza, motiva y acompaña a las personas que dependen de su coordinación.',
    questions: [
      {
        id: 'q1',
        number: 1,
        text: 'Organiza y distribuye adecuadamente las actividades del equipo técnico.',
      },
      {
        id: 'q2',
        number: 2,
        text: 'Motiva y mantiene un buen ambiente laboral.',
      },
      {
        id: 'q3',
        number: 3,
        text: 'Gestiona adecuadamente los conflictos entre técnicos.',
      },
      {
        id: 'q4',
        number: 4,
        text: 'Brinda acompañamiento y retroalimentación al personal.',
      },
      {
        id: 'q5',
        number: 5,
        text: 'Promueve el trabajo en equipo y la colaboración.',
      },
    ],
  },
  {
    id: 'B',
    code: 'B',
    short: 'Gestión técnica',
    title: 'Conocimiento y gestión técnica (Hardware y Software)',
    description: 'Dominio del oficio y capacidad para orientar diagnósticos y reparaciones complejas.',
    questions: [
      {
        id: 'q6',
        number: 6,
        text: 'Tiene conocimiento técnico en diagnóstico y reparación de hardware.',
      },
      {
        id: 'q7',
        number: 7,
        text: 'Tiene conocimiento de procesos de software, actualización, flasheo y diagnóstico.',
      },
      {
        id: 'q8',
        number: 8,
        text: 'Orienta correctamente a los técnicos ante fallas complejas.',
      },
      {
        id: 'q9',
        number: 9,
        text: 'Identifica oportunidades para mejorar los procesos de reparación.',
      },
      {
        id: 'q10',
        number: 10,
        text: 'Garantiza que los procedimientos técnicos se ejecuten correctamente.',
      },
    ],
  },
  {
    id: 'C',
    code: 'C',
    short: 'Control operativo',
    title: 'Organización y control operativo',
    description: 'Seguimiento a tiempos, calidad, repuestos y productividad del taller.',
    questions: [
      {
        id: 'q11',
        number: 11,
        text: 'Controla los tiempos de diagnóstico y reparación.',
      },
      {
        id: 'q12',
        number: 12,
        text: 'Realiza seguimiento a los equipos pendientes de reparación.',
      },
      {
        id: 'q13',
        number: 13,
        text: 'Supervisa la calidad de los trabajos realizados.',
      },
      {
        id: 'q14',
        number: 14,
        text: 'Gestiona adecuadamente repuestos, herramientas e insumos.',
      },
      {
        id: 'q15',
        number: 15,
        text: 'Hace seguimiento a la productividad del equipo.',
      },
    ],
  },
  {
    id: 'D',
    code: 'D',
    short: 'Servicio al cliente',
    title: 'Servicio al cliente y solución de problemas',
    description: 'Capacidad de resolver, priorizar y proteger la satisfacción del cliente.',
    questions: [
      {
        id: 'q16',
        number: 16,
        text: 'Gestiona oportunamente los casos técnicos complejos.',
      },
      {
        id: 'q17',
        number: 17,
        text: 'Promueve soluciones efectivas a las reclamaciones y garantías.',
      },
      {
        id: 'q18',
        number: 18,
        text: 'Asegura que los técnicos entreguen información clara y oportuna.',
      },
      {
        id: 'q19',
        number: 19,
        text: 'Prioriza adecuadamente los casos urgentes.',
      },
      {
        id: 'q20',
        number: 20,
        text: 'Se responsabiliza por la satisfacción del cliente.',
      },
    ],
  },
  {
    id: 'E',
    code: 'E',
    short: 'Comunicación',
    title: 'Comunicación y cumplimiento',
    description: 'Claridad para informar, cumplir compromisos y recibir retroalimentación.',
    questions: [
      {
        id: 'q21',
        number: 21,
        text: 'Comunica claramente las instrucciones y prioridades.',
      },
      {
        id: 'q22',
        number: 22,
        text: 'Informa oportunamente los resultados y novedades del área.',
      },
      {
        id: 'q23',
        number: 23,
        text: 'Cumple los compromisos y objetivos establecidos.',
      },
      {
        id: 'q24',
        number: 24,
        text: 'Recibe y aplica adecuadamente la retroalimentación.',
      },
      {
        id: 'q25',
        number: 25,
        text: 'Demuestra responsabilidad, compromiso y sentido de pertenencia.',
      },
    ],
  },
];

export const OPEN_QUESTIONS = [
  {
    id: 'open1',
    number: 1,
    short: 'Fortalezas',
    text: '¿Cuáles consideras que son las principales fortalezas del coordinador?',
  },
  {
    id: 'open2',
    number: 2,
    short: 'Oportunidades',
    text: '¿Qué aspectos debería mejorar en su gestión?',
  },
  {
    id: 'open3',
    number: 3,
    short: 'Casos complejos',
    text: '¿Cómo calificas su capacidad para resolver problemas técnicos complejos?',
  },
  {
    id: 'open4',
    number: 4,
    short: 'Acompañamiento',
    text: '¿Consideras que brinda suficiente apoyo y acompañamiento a los técnicos? ¿Por qué?',
  },
  {
    id: 'open5',
    number: 5,
    short: 'Recomendaciones',
    text: '¿Qué acciones recomendarías para mejorar el desempeño del área técnica?',
  },
];

export const OPEN_ANSWER_MAX = 600;
export const OPEN_ANSWER_MIN = 15;

export const PLAN_MIN_ROWS = 3;
export const PLAN_MAX_ROWS = 10;

export const DEFAULT_PLAN = [
  { id: 'plan-1', aspect: '', action: '', date: '' },
  { id: 'plan-2', aspect: '', action: '', date: '' },
  { id: 'plan-3', aspect: '', action: '', date: '' },
];

export const CALCULATION_MESSAGES = [
  'Promediando las respuestas…',
  'Leyendo las competencias…',
  'Identificando fortalezas y oportunidades…',
  'Preparando tu tablero de resultados…',
];

export const PERFORMANCE_LEVELS = [
  {
    key: 'critico',
    min: 1,
    max: 1.999,
    label: 'Crítico',
    tone: 'critical',
    description: 'Se requiere intervención inmediata y un plan de acompañamiento cercano.',
  },
  {
    key: 'bajo',
    min: 2,
    max: 2.999,
    label: 'Bajo',
    tone: 'low',
    description: 'Hay brechas relevantes que conviene atender con prioridad.',
  },
  {
    key: 'satisfactorio',
    min: 3,
    max: 3.8,
    label: 'Satisfactorio',
    tone: 'ok',
    description: 'Cumple lo esperado, con espacio claro para consolidar el desempeño.',
  },
  {
    key: 'alto',
    min: 3.81,
    max: 4.5,
    label: 'Alto',
    tone: 'high',
    description: 'Un desempeño sólido, con oportunidades puntuales de mejora.',
  },
  {
    key: 'sobresaliente',
    min: 4.5001,
    max: 5,
    label: 'Sobresaliente',
    tone: 'outstanding',
    description: 'Un referente para el equipo. Conviene sostener y compartir las prácticas.',
  },
];

export const STEP_TITLES = [
  'Datos generales',
  'Liderazgo y equipo',
  'Gestión técnica',
  'Control operativo',
  'Servicio al cliente',
  'Comunicación y cumplimiento',
  'Preguntas abiertas',
  'Plan de mejoramiento',
];
