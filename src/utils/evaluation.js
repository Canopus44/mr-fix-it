import {
  COMPETENCIES,
  EVALUATION_WEIGHTS,
  PERFORMANCE_LEVELS,
  SOURCE_LABELS,
} from '../data/evaluationData.js';

export const round2 = (value) => Math.round((Number(value) + Number.EPSILON) * 100) / 100;

export const formatScore = (value) => (Number.isFinite(value) ? round2(value).toFixed(2) : '—');

export const clampScore = (value) => Math.min(5, Math.max(1, Number(value)));

/** Niveles corregidos, sin solapamientos. */
export function getPerformanceLevel(score) {
  if (!Number.isFinite(score)) return null;
  if (score < 2) return PERFORMANCE_LEVELS[0];
  if (score < 3) return PERFORMANCE_LEVELS[1];
  if (score <= 3.8) return PERFORMANCE_LEVELS[2];
  if (score <= 4.5) return PERFORMANCE_LEVELS[3];
  return PERFORMANCE_LEVELS[4];
}

/** Semáforo solicitado: rojo < 3, neutro 3–3.8, azul > 3.8. */
export function getScoreTone(score) {
  if (score < 3) return 'red';
  if (score <= 3.8) return 'neutral';
  return 'blue';
}

export function average(values = []) {
  const valid = values.filter((value) => Number.isFinite(Number(value))).map(Number);
  if (!valid.length) return 0;
  return round2(valid.reduce((total, value) => total + value, 0) / valid.length);
}

/** Promedio de cada competencia a partir de las respuestas { q1: 4, ... }. */
export function calculateCompetenceScores(answers = {}) {
  return COMPETENCIES.reduce((result, competency) => {
    result[competency.id] = average(
      competency.questions.map((question) => answers[question.id]).filter(Boolean),
    );
    return result;
  }, {});
}

/** Promedio general de las 25 preguntas. */
export function calculateOverall(answers = {}) {
  return average(Object.values(answers).filter((value) => Number(value) >= 1));
}

export function countAnswered(answers = {}) {
  return Object.values(answers).filter((value) => Number(value) >= 1).length;
}

/** Crea el objeto de evaluación que vive en memoria. */
export function buildEvaluation({ fields, answers, openAnswers, plan }) {
  const competenceScores = calculateCompetenceScores(answers);
  const overall = calculateOverall(answers);

  return {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `eval-${Date.now()}`,
    createdAt: new Date().toISOString(),
    meta: {
      evaluatedName: fields.evaluatedName.trim(),
      role: fields.role,
      area: fields.area,
      period: fields.period,
      evaluatorName: fields.evaluatorName.trim(),
      type: fields.type,
    },
    answers,
    competenceScores,
    overall,
    openAnswers,
    plan: plan.map((row, index) => ({
      id: row.id ?? `plan-${index + 1}`,
      aspect: row.aspect.trim(),
      action: row.action.trim(),
      date: row.date,
    })),
  };
}

/** Agrupa las evaluaciones por fuente y promedia las múltiples del equipo. */
export function getSourceAverages(evaluations = []) {
  const groups = {
    jefe: evaluations.filter((evaluation) => evaluation.meta.type === 'jefe'),
    equipo: evaluations.filter((evaluation) => evaluation.meta.type === 'equipo'),
    auto: evaluations.filter((evaluation) => evaluation.meta.type === 'auto'),
  };

  return Object.fromEntries(
    Object.entries(groups).map(([source, entries]) => {
      const competenceScores = COMPETENCIES.reduce((scores, competency) => {
        scores[competency.id] = average(
          entries.map((evaluation) => evaluation.competenceScores?.[competency.id]),
        );
        return scores;
      }, {});

      return [
        source,
        {
          source,
          label: SOURCE_LABELS[source],
          evaluations: entries,
          count: entries.length,
          complete: entries.length > 0,
          overall: average(entries.map((evaluation) => evaluation.overall)),
          competenceScores,
        },
      ];
    }),
  );
}

/**
 * Consolidación 270°:
 * - Jefe 40% · Equipo 40% · Autoevaluación 20%.
 * - Si falta una fuente, renormaliza los pesos de las disponibles.
 */
export function consolidateEvaluation(evaluations = []) {
  const sources = getSourceAverages(evaluations);
  const available = Object.values(sources).filter((source) => source.complete);
  if (!available.length) return null;

  const availableWeight = available.reduce(
    (total, source) => total + EVALUATION_WEIGHTS[source.source],
    0,
  );

  const normalizedWeights = Object.fromEntries(
    Object.entries(EVALUATION_WEIGHTS).map(([source, weight]) => [
      source,
      sources[source].complete && availableWeight ? weight / availableWeight : 0,
    ]),
  );

  const competenceScores = COMPETENCIES.reduce((scores, competency) => {
    scores[competency.id] = round2(
      available.reduce(
        (total, source) =>
          total +
          source.competenceScores[competency.id] *
            (EVALUATION_WEIGHTS[source.source] / availableWeight || 0),
        0,
      ),
    );
    return scores;
  }, {});

  const overall = round2(
    available.reduce(
      (total, source) =>
        total +
        source.overall * (EVALUATION_WEIGHTS[source.source] / availableWeight || 0),
      0,
    ),
  );

  const missing = Object.keys(EVALUATION_WEIGHTS).filter(
    (source) => !sources[source].complete,
  );

  const externalSources = ['jefe', 'equipo'].filter((source) => sources[source].complete);
  const externalWeights = externalSources.reduce(
    (total, source) => total + EVALUATION_WEIGHTS[source],
    0,
  );
  const externalAverage = externalWeights
    ? round2(
        externalSources.reduce(
          (total, source) =>
            total +
            sources[source].overall * (EVALUATION_WEIGHTS[source] / externalWeights),
          0,
        ),
      )
    : null;
  const selfAverage = sources.auto.complete ? sources.auto.overall : null;
  const selfGap =
    selfAverage !== null && externalAverage !== null ? round2(selfAverage - externalAverage) : null;

  return {
    sources,
    availableCount: available.length,
    partial: missing.length > 0,
    missing,
    availableWeight,
    normalizedWeights,
    competenceScores,
    overall,
    level: getPerformanceLevel(overall),
    externalAverage,
    selfAverage,
    selfGap,
    teamCount: sources.equipo.count,
  };
}

/** Ordena competencias por puntaje para resaltar fortalezas y oportunidades. */
export function rankCompetencies(competenceScores = {}) {
  return COMPETENCIES.map((competency) => ({
    ...competency,
    score: competenceScores[competency.id] ?? 0,
  })).sort((a, b) => b.score - a.score);
}
