import { useEffect, useState } from 'react';
import {
  COMPETENCIES,
  EVALUATION_META,
  OPEN_QUESTIONS,
  SOURCE_LABELS,
} from '../../data/evaluationData.js';
import { useCounter } from '../../hooks/useCounter.js';
import {
  consolidateEvaluation,
  formatScore,
  getPerformanceLevel,
  getScoreTone,
  rankCompetencies,
} from '../../utils/evaluation.js';
import { downloadSummaryText } from '../../utils/exportSummary.js';
import Icon from '../Icon.jsx';
import RadarChart from './RadarChart.jsx';
import ConsolidationPanel from './ConsolidationPanel.jsx';

function formatPeriod(value) {
  if (!value) return '—';
  const [year, month] = value.split('-');
  if (!year || !month) return value;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });
}

function ScoreRing({ score }) {
  const offset = 100 - (score / 5) * 100;
  const animatedScore = useCounter(score, { start: true, decimals: 2, duration: 1600 });

  return (
    <div className="score-ring">
      <svg viewBox="0 0 132 132" aria-hidden="true">
        <circle className="score-ring__track" cx="66" cy="66" r="56" />
        <circle
          className="score-ring__value"
          cx="66"
          cy="66"
          r="56"
          pathLength="100"
          strokeDasharray="100"
          style={{ '--ring-offset': offset }}
        />
      </svg>
      <div className="score-ring__center">
        <strong>{animatedScore}</strong>
        <span>de 5.00</span>
      </div>
    </div>
  );
}

function CompetenceBreakdown({ evaluation }) {
  const ranked = rankCompetencies(evaluation.competenceScores);
  const strengths = new Set(ranked.slice(0, 2).map((competency) => competency.id));
  const opportunities = new Set(ranked.slice(-2).map((competency) => competency.id));

  return (
    <section className="result-card result-card--competences" aria-labelledby="competences-title">
      <div className="result-card__head">
        <div>
          <p className="result-card__eyebrow">Análisis</p>
          <h3 id="competences-title">Promedio por competencia</h3>
        </div>
        <div className="semaphore-legend" aria-label="Semáforo de resultados">
          <span><i className="tone-red" /> &lt; 3.0</span>
          <span><i className="tone-neutral" /> 3.0–3.8</span>
          <span><i className="tone-blue" /> &gt; 3.8</span>
        </div>
      </div>

      <div className="breakdown">
        {COMPETENCIES.map((competency) => {
          const score = evaluation.competenceScores[competency.id];
          const tone = getScoreTone(score);
          const isStrength = strengths.has(competency.id);
          const isOpportunity = opportunities.has(competency.id);
          return (
            <article className="breakdown-row" key={competency.id}>
              <div className="breakdown-row__head">
                <span className="breakdown-row__code">{competency.code}</span>
                <span className="breakdown-row__title">{competency.title}</span>
                {isStrength && <span className="result-badge result-badge--strength">Fortaleza</span>}
                {isOpportunity && (
                  <span className="result-badge result-badge--opportunity">Oportunidad</span>
                )}
                <strong className={`breakdown-row__score tone-text-${tone}`}>
                  {formatScore(score)}
                </strong>
              </div>
              <div
                className="breakdown-row__track"
                role="meter"
                aria-label={`${competency.title}: ${formatScore(score)} de 5`}
                aria-valuemin="1"
                aria-valuemax="5"
                aria-valuenow={score}
              >
                <span
                  className={`breakdown-row__fill tone-${tone}`}
                  style={{ '--bar-width': `${(score / 5) * 100}%` }}
                />
              </div>
            </article>
          );
        })}
      </div>

      <div className="result-insights">
        <div className="result-insight result-insight--strength">
          <span className="result-insight__icon">
            <Icon name="sparkles" size={18} />
          </span>
          <div>
            <p>Mayores fortalezas</p>
            <strong>{ranked.slice(0, 2).map((item) => item.short).join(' · ')}</strong>
          </div>
        </div>
        <div className="result-insight result-insight--opportunity">
          <span className="result-insight__icon">
            <Icon name="target" size={18} />
          </span>
          <div>
            <p>Oportunidades de mejora</p>
            <strong>{ranked.slice(-2).reverse().map((item) => item.short).join(' · ')}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EvaluationResults({ evaluation, evaluations, onAddAnother, onRestart }) {
  const [confirmReset, setConfirmReset] = useState(false);
  const level = getPerformanceLevel(evaluation.overall);
  const consolidation = consolidateEvaluation(evaluations);

  useEffect(() => {
    if (!confirmReset) return undefined;
    const timer = window.setTimeout(() => setConfirmReset(false), 5000);
    return () => window.clearTimeout(timer);
  }, [confirmReset]);

  const handleRestart = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    onRestart();
  };

  return (
    <div className="evaluation-results" id="resultado-evaluacion">
      <div className="results-toolbar no-print">
        <div className="results-toolbar__meta">
          <span className="results-toolbar__note">
            <Icon name="shield" size={14} />
            Solo en memoria · se pierde al recargar
          </span>
          <span className="results-toolbar__sources">
            {consolidation.availableCount} de 3 fuentes 270°
          </span>
        </div>
        <div className="results-toolbar__actions">
          <button className="btn btn--primary btn--sm" type="button" onClick={onAddAnother}>
            <Icon name="plus" size={15} />
            Agregar otra evaluación
          </button>
          <button
            className="btn btn--ghost btn--sm"
            type="button"
            onClick={() => downloadSummaryText(evaluation, consolidation)}
          >
            <Icon name="download" size={15} />
            Descargar resumen
          </button>
          <button className="btn btn--ghost btn--sm" type="button" onClick={() => window.print()}>
            <Icon name="print" size={15} />
            Imprimir / PDF
          </button>
          <button
            className={`btn btn--ghost btn--sm results-toolbar__reset ${
              confirmReset ? 'is-confirming' : ''
            }`}
            type="button"
            onClick={handleRestart}
            aria-live="polite"
          >
            <Icon name="reset" size={15} />
            {confirmReset ? 'Confirmar reinicio' : 'Reiniciar todo'}
          </button>
        </div>
      </div>

      <section className="result-hero" aria-labelledby="result-title">
        <div className="result-hero__main">
          <p className="result-hero__eyebrow">
            <span className="result-hero__pulse" aria-hidden="true" />
            Evaluación individual · {SOURCE_LABELS[evaluation.meta.type]}
          </p>
          <h3 id="result-title">Resultado de desempeño</h3>
          <p className="result-hero__person">
            <strong>{evaluation.meta.evaluatedName}</strong>
            <span>{evaluation.meta.role}</span>
          </p>
          <p className="result-hero__description">{level?.description}</p>
          <div className="result-hero__meta">
            <span>
              <Icon name="calendar" size={14} />
              {formatPeriod(evaluation.meta.period)}
            </span>
            <span>
              <Icon name="users" size={14} />
              Evalúa: {evaluation.meta.evaluatorName}
            </span>
            <span>
              <Icon name="layers" size={14} />
              {evaluation.meta.area}
            </span>
          </div>
        </div>

        <div className="result-hero__score">
          <ScoreRing score={evaluation.overall} />
          <span className={`level-tag level-tag--${level?.tone}`}>{level?.label}</span>
          <small>Promedio general</small>
        </div>
      </section>

      <div className="results-grid">
        <CompetenceBreakdown evaluation={evaluation} />

        <section className="result-card result-card--radar" aria-labelledby="radar-title">
          <div className="result-card__head">
            <div>
              <p className="result-card__eyebrow">Mapa visual</p>
              <h3 id="radar-title">Radar de competencias</h3>
            </div>
            <span className="result-card__hint">Escala 1–5</span>
          </div>
          <RadarChart competenceScores={evaluation.competenceScores} />
          <p className="result-card__caption">
            Una forma rápida de ver el equilibrio entre liderazgo, técnica, operación, servicio y
            comunicación.
          </p>
        </section>
      </div>

      <section className="result-card" aria-labelledby="open-title">
        <div className="result-card__head">
          <div>
            <p className="result-card__eyebrow">Mirada cualitativa</p>
            <h3 id="open-title">Respuestas abiertas</h3>
          </div>
          <span className="result-card__hint">Resumen de la evaluación</span>
        </div>
        <div className="open-summary">
          {OPEN_QUESTIONS.map((question) => (
            <article className="open-summary__item" key={question.id}>
              <div className="open-summary__top">
                <span className="open-summary__number">{String(question.number).padStart(2, '0')}</span>
                <span className="open-summary__short">{question.short}</span>
              </div>
              <h4>{question.text}</h4>
              <p>{evaluation.openAnswers?.[question.id] || 'Sin respuesta.'}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="result-card" aria-labelledby="plan-title">
        <div className="result-card__head">
          <div>
            <p className="result-card__eyebrow">Compromisos</p>
            <h3 id="plan-title">Plan de mejoramiento</h3>
          </div>
          <span className="result-card__hint">{evaluation.plan.length} acciones</span>
        </div>
        <div className="plan-summary">
          <table>
            <caption className="visually-hidden">Plan de mejoramiento registrado</caption>
            <thead>
              <tr>
                <th scope="col">Aspecto por mejorar</th>
                <th scope="col">Acción propuesta</th>
                <th scope="col">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {evaluation.plan.map((row) => (
                <tr key={row.id}>
                  <td data-label="Aspecto">{row.aspect}</td>
                  <td data-label="Acción">{row.action}</td>
                  <td data-label="Fecha">
                    <span className="plan-summary__date">
                      <Icon name="calendar" size={13} />
                      {row.date}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {consolidation && <ConsolidationPanel consolidation={consolidation} />}

      <div className="results-footer no-print">
        <p>
          <Icon name="shield" size={16} />
          {EVALUATION_META.notice} El resumen descargado se genera localmente con Blob.
        </p>
        <div className="results-footer__actions">
          <button className="btn btn--primary btn--md" type="button" onClick={onAddAnother}>
            <Icon name="plus" size={16} />
            Agregar otra evaluación
          </button>
          <button
            className="btn btn--ghost btn--md"
            type="button"
            onClick={() => downloadSummaryText(evaluation, consolidation)}
          >
            <Icon name="download" size={16} />
            Descargar resumen
          </button>
          <button className="btn btn--ghost btn--md" type="button" onClick={() => window.print()}>
            <Icon name="print" size={16} />
            Imprimir / PDF
          </button>
        </div>
      </div>
    </div>
  );
}
