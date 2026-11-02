import {
  COMPETENCIES,
  EVALUATION_WEIGHTS,
  SOURCE_LABELS,
} from '../../data/evaluationData.js';
import { formatScore, getScoreTone } from '../../utils/evaluation.js';
import Icon from '../Icon.jsx';

const SOURCES = ['jefe', 'equipo', 'auto'];

function SourceStatus({ source, normalizedWeight }) {
  const originalWeight = EVALUATION_WEIGHTS[source.source];
  return (
    <article className={`source-card ${source.complete ? 'is-complete' : 'is-pending'}`}>
      <div className="source-card__top">
        <span className={`source-card__dot ${source.complete ? 'is-on' : ''}`} aria-hidden="true" />
        <span className="source-card__label">{source.label}</span>
        <span className="source-card__status">
          {source.complete ? 'Completa' : 'Pendiente'}
        </span>
      </div>
      <div className="source-card__score">
        {source.complete ? formatScore(source.overall) : '—'}
        <span>/ 5.00</span>
      </div>
      <div className="source-card__meta">
        <span>
          Peso base <strong>{Math.round(originalWeight * 100)}%</strong>
        </span>
        <span>
          {source.complete
            ? `Aplicado ${Math.round(normalizedWeight * 100)}%`
            : 'Sin datos'}
        </span>
      </div>
      {source.source === 'equipo' && (
        <p className="source-card__note">
          {source.count
            ? `${source.count} ${
                source.count === 1 ? 'evaluación considerada' : 'evaluaciones consideradas'
              }`
            : 'Puedes registrar varias evaluaciones del equipo.'}
        </p>
      )}
    </article>
  );
}

function ComparisonChart({ consolidation }) {
  return (
    <div className="compare">
      <div className="compare__head">
        <div>
          <p className="compare__eyebrow">Comparativo por fuente</p>
          <h4>Jefe vs. equipo vs. autoevaluación</h4>
        </div>
        <div className="compare__legend" aria-label="Leyenda del comparativo">
          {SOURCES.map((source) => (
            <span key={source} className={`compare__legend-item compare__legend-item--${source}`}>
              <i aria-hidden="true" />
              {SOURCE_LABELS[source]}
            </span>
          ))}
        </div>
      </div>

      <div className="compare__chart" role="img" aria-label="Barras agrupadas por competencia y fuente">
        {COMPETENCIES.map((competency) => (
          <div className="compare__group" key={competency.id}>
            <div className="compare__bars">
              {SOURCES.map((source) => {
                const data = consolidation.sources[source];
                const score = data.complete ? data.competenceScores[competency.id] : null;
                return (
                  <span
                    className={`compare__bar compare__bar--${source} ${
                      score === null ? 'is-missing' : ''
                    }`}
                    key={source}
                    style={{ '--bar-height': score ? `${(score / 5) * 100}%` : '0%' }}
                    title={`${SOURCE_LABELS[source]} · ${competency.short}: ${
                      score === null ? 'Pendiente' : `${formatScore(score)} / 5`
                    }`}
                  >
                    <span className="compare__bar-fill" />
                    <span className="compare__bar-value">
                      {score === null ? '—' : formatScore(score)}
                    </span>
                  </span>
                );
              })}
            </div>
            <span className="compare__group-label">
              <strong>{competency.code}</strong>
              {competency.short}
            </span>
          </div>
        ))}
      </div>

      <table className="visually-hidden">
        <caption>Promedios por competencia y fuente</caption>
        <thead>
          <tr>
            <th>Competencia</th>
            {SOURCES.map((source) => (
              <th key={source}>{SOURCE_LABELS[source]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPETENCIES.map((competency) => (
            <tr key={competency.id}>
              <th>{competency.title}</th>
              {SOURCES.map((source) => (
                <td key={source}>
                  {consolidation.sources[source].complete
                    ? formatScore(
                        consolidation.sources[source].competenceScores[competency.id],
                      )
                    : 'Pendiente'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ConsolidationPanel({ consolidation }) {
  if (!consolidation) return null;

  const gap = consolidation.selfGap;
  const gapPositive = gap !== null && gap >= 0;

  return (
    <section className="consolidation" aria-labelledby="consolidation-title">
      <div className="consolidation__header">
        <div>
          <p className="consolidation__eyebrow">
            <Icon name="layers" size={16} />
            Resultado 270°
          </p>
          <h3 id="consolidation-title">
            {consolidation.partial ? 'Lectura parcial, ya útil.' : 'La mirada completa.'}
          </h3>
          <p>
            {consolidation.partial
              ? 'Aún faltan fuentes. Mientras llegan, renormalizamos los pesos entre las evaluaciones disponibles para no distorsionar el resultado.'
              : 'Las tres fuentes están completas. El resultado pondera jefe directo 40%, equipo 40% y autoevaluación 20%.'}
          </p>
        </div>

        <div className="consolidation__score-block">
          <span
            className={`consolidation__badge ${
              consolidation.partial ? 'is-partial' : 'is-final'
            }`}
          >
            {consolidation.partial ? 'Resultado parcial' : 'Resultado final'}
          </span>
          <div className="consolidation__score">
            {formatScore(consolidation.overall)}
            <span>/ 5.00</span>
          </div>
          <strong className={`level-tag level-tag--${consolidation.level?.tone}`}>
            {consolidation.level?.label}
          </strong>
          <small>
            {consolidation.availableCount} de 3 fuentes ·{' '}
            {consolidation.teamCount
              ? `${consolidation.teamCount} ${
                  consolidation.teamCount === 1 ? 'técnico' : 'técnicos'
                } en la fuente de equipo`
              : 'sin voces del equipo todavía'}
          </small>
        </div>
      </div>

      <div className="consolidation__sources">
        {SOURCES.map((source) => (
          <SourceStatus
            key={source}
            source={consolidation.sources[source]}
            normalizedWeight={consolidation.normalizedWeights[source]}
          />
        ))}
      </div>

      {consolidation.partial && (
        <div className="consolidation__notice">
          <span className="consolidation__notice-icon">
            <Icon name="alert" size={18} />
          </span>
          <div>
            <strong>
              Falta{consolidation.missing.length === 1 ? '' : 'n'}{' '}
              {consolidation.missing.map((source) => SOURCE_LABELS[source]).join(' y ')}.
            </strong>
            <p>
              Puedes agregar otra evaluación para completar la foto 270°. El peso de las fuentes
              disponibles se renormalizó así:{' '}
              {SOURCES.filter((source) => consolidation.sources[source].complete)
                .map(
                  (source) =>
                    `${SOURCE_LABELS[source]} ${Math.round(
                      consolidation.normalizedWeights[source] * 100,
                    )}%`,
                )
                .join(' · ')}
              .
            </p>
          </div>
        </div>
      )}

      <div className="consolidation__grid">
        <ComparisonChart consolidation={consolidation} />

        <div className="gap-card">
          <p className="gap-card__eyebrow">Brecha de percepción</p>
          {gap === null ? (
            <>
              <h4>Falta una mirada para comparar.</h4>
              <p>
                Necesitamos la autoevaluación y al menos una fuente externa (jefe o equipo) para
                medir la brecha entre cómo se percibe la persona y cómo la perciben los demás.
              </p>
            </>
          ) : (
            <>
              <div className={`gap-card__value ${gapPositive ? 'is-positive' : 'is-negative'}`}>
                {gapPositive ? '+' : ''}
                {formatScore(gap)}
              </div>
              <h4>
                {Math.abs(gap) < 0.15
                  ? 'Percepción alineada.'
                  : gapPositive
                    ? 'La autoevaluación se percibe por encima.'
                    : 'La autoevaluación se percibe por debajo.'}
              </h4>
              <p>
                La autoevaluación promedia{' '}
                <strong>{formatScore(consolidation.selfAverage)}</strong> y la percepción externa
                (jefe + equipo) promedia{' '}
                <strong>{formatScore(consolidation.externalAverage)}</strong>. Una diferencia de{' '}
                {Math.abs(gap).toFixed(2)} puntos es una conversación útil, no una sentencia.
              </p>
              <div className="gap-card__source-row">
                <span>
                  <i className="gap-source gap-source--self" /> Auto
                  <strong>{formatScore(consolidation.selfAverage)}</strong>
                </span>
                <span>
                  <i className="gap-source gap-source--external" /> Externo
                  <strong>{formatScore(consolidation.externalAverage)}</strong>
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="consolidation__competence-bars">
        <p className="compare__eyebrow">Consolidado por competencia</p>
        {COMPETENCIES.map((competency) => {
          const score = consolidation.competenceScores[competency.id];
          return (
            <div className="consolidation-bar" key={competency.id}>
              <span className="consolidation-bar__label">
                <strong>{competency.code}</strong>
                {competency.short}
              </span>
              <span className="consolidation-bar__track">
                <span
                  className={`consolidation-bar__fill tone-${getScoreTone(score)}`}
                  style={{ '--bar-width': `${(score / 5) * 100}%` }}
                />
              </span>
              <strong className="consolidation-bar__value">{formatScore(score)}</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}
