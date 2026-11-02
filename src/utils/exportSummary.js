import { COMPETENCIES, OPEN_QUESTIONS, SOURCE_LABELS } from '../data/evaluationData.js';
import { formatScore, getPerformanceLevel, rankCompetencies } from './evaluation.js';

const line = '='.repeat(64);
const thinLine = '-'.repeat(64);

/** Genera el resumen descargable sin enviar información a ningún servidor. */
export function buildSummaryText(evaluation, consolidation) {
  if (!evaluation) return '';

  const lines = [
    'MR. FIX-IT',
    'Evaluación de desempeño 270°',
    line,
    `Evaluado: ${evaluation.meta.evaluatedName}`,
    `Cargo: ${evaluation.meta.role}`,
    `Área: ${evaluation.meta.area}`,
    `Periodo: ${evaluation.meta.period}`,
    `Evaluador: ${evaluation.meta.evaluatorName}`,
    `Tipo de evaluación: ${SOURCE_LABELS[evaluation.meta.type]}`,
    `Fecha de registro: ${new Date(evaluation.createdAt).toLocaleString('es-CO')}`,
    line,
    'RESULTADO DE ESTA EVALUACIÓN',
    `Promedio general: ${formatScore(evaluation.overall)} / 5.00`,
    `Nivel: ${getPerformanceLevel(evaluation.overall)?.label ?? '—'}`,
    '',
    'Promedio por competencia:',
    ...COMPETENCIES.map(
      (competency) =>
        `  ${competency.code}. ${competency.title}: ${formatScore(
          evaluation.competenceScores[competency.id],
        )}`,
    ),
    '',
    'Fortalezas destacadas:',
    ...rankCompetencies(evaluation.competenceScores)
      .slice(0, 2)
      .map((competency) => `  + ${competency.title} (${formatScore(competency.score)})`),
    'Oportunidades de mejora:',
    ...rankCompetencies(evaluation.competenceScores)
      .slice(-2)
      .reverse()
      .map((competency) => `  - ${competency.title} (${formatScore(competency.score)})`),
  ];

  if (consolidation) {
    lines.push(
      '',
      line,
      'CONSOLIDACIÓN 270°',
      `Fuentes completas: ${consolidation.availableCount} de 3`,
      consolidation.partial
        ? 'Estado: RESULTADO PARCIAL (pesos renormalizados entre fuentes disponibles)'
        : 'Estado: RESULTADO FINAL',
      `Resultado ponderado: ${formatScore(consolidation.overall)} / 5.00`,
      `Nivel: ${consolidation.level?.label ?? '—'}`,
      '',
      'Fuentes:',
      ...Object.values(consolidation.sources).map((source) => {
        const weight = consolidation.normalizedWeights[source.source];
        return `  ${source.label}: ${
          source.complete ? `${source.count} ${source.count === 1 ? 'evaluación' : 'evaluaciones'} · ${formatScore(source.overall)}` : 'Pendiente'
        } · peso aplicado ${(weight * 100).toFixed(1)}%`;
      }),
    );

    if (consolidation.selfGap !== null) {
      const direction = consolidation.selfGap >= 0 ? 'por encima' : 'por debajo';
      lines.push(
        `Brecha autoevaluación vs. percepción externa: ${consolidation.selfGap >= 0 ? '+' : ''}${formatScore(
          consolidation.selfGap,
        )} (${Math.abs(consolidation.selfGap).toFixed(2)} puntos ${direction}).`,
      );
    }

    lines.push('', 'Comparativo por competencia:');
    COMPETENCIES.forEach((competency) => {
      lines.push(
        `  ${competency.code}. ${competency.title}`,
        `     Jefe: ${formatScore(
          consolidation.sources.jefe.competenceScores[competency.id],
        )} · Equipo: ${formatScore(
          consolidation.sources.equipo.competenceScores[competency.id],
        )} · Auto: ${formatScore(
          consolidation.sources.auto.competenceScores[competency.id],
        )}`,
      );
    });
  }

  lines.push('', line, 'PREGUNTAS ABIERTAS');
  OPEN_QUESTIONS.forEach((question) => {
    const answer = evaluation.openAnswers?.[question.id] || 'Sin respuesta.';
    lines.push('', `${question.number}. ${question.text}`, answer);
  });

  lines.push('', line, 'PLAN DE MEJORAMIENTO');
  evaluation.plan.forEach((row, index) => {
    lines.push(
      '',
      `${index + 1}. Aspecto por mejorar: ${row.aspect}`,
      `   Acción propuesta: ${row.action}`,
      `   Fecha de cumplimiento: ${row.date}`,
    );
  });

  lines.push(
    '',
    thinLine,
    'Documento generado localmente en el navegador.',
    'Mr. Fix-it · Medellín, Colombia · Tu celular, en buenas manos.',
  );

  return lines.join('\n');
}

/** Descarga el resumen como .txt usando Blob (sin servidor). */
export function downloadSummaryText(evaluation, consolidation) {
  const text = buildSummaryText(evaluation, consolidation);
  if (!text) return;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const safeName = evaluation.meta.evaluatedName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  anchor.href = url;
  anchor.download = `evaluacion-270-${safeName || 'coordinador-tecnicos'}-${evaluation.meta.period || 'periodo'}.txt`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
