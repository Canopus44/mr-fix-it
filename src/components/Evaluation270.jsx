import { useEffect, useState } from 'react';
import {
  CALCULATION_MESSAGES,
  EVALUATION_META,
  SOURCE_LABELS,
} from '../data/evaluationData.js';
import { getSourceAverages } from '../utils/evaluation.js';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icon.jsx';
import EvaluationWizard from './evaluation/EvaluationWizard.jsx';
import EvaluationResults from './evaluation/EvaluationResults.jsx';

function CalculatingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((current) => Math.min(current + 1, CALCULATION_MESSAGES.length - 1));
    }, 480);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="calculating" role="status" aria-live="polite">
      <div className="calculating__visual" aria-hidden="true">
        <span className="calculating__orbit calculating__orbit--one" />
        <span className="calculating__orbit calculating__orbit--two" />
        <span className="calculating__center">
          <span className="calculating__percent">270°</span>
        </span>
      </div>
      <p className="calculating__eyebrow">Procesando en tu navegador</p>
      <h3>Calculando resultados…</h3>
      <p className="calculating__message">{CALCULATION_MESSAGES[messageIndex]}</p>
      <div className="calculating__bar" aria-hidden="true">
        <span />
      </div>
      <p className="calculating__note">
        <Icon name="shield" size={14} />
        Nada sale de esta pestaña.
      </p>
    </div>
  );
}

function SourceContext({ evaluations, onViewResults }) {
  const sources = getSourceAverages(evaluations);

  return (
    <div className="evaluation-context">
      <div className="evaluation-context__copy">
        <p className="evaluation-context__eyebrow">
          <Icon name="layers" size={15} />
          Consolidación en curso
        </p>
        <h3>
          {evaluations[0]?.meta.evaluatedName} ·{' '}
          {sources.equipo.count
            ? `${sources.equipo.count} ${
                sources.equipo.count === 1 ? 'voz del equipo' : 'voces del equipo'
              }`
            : 'aún sin voces del equipo'}
        </h3>
        <p>
          Las evaluaciones anteriores siguen en memoria. Completa la fuente que falta o consulta el
          resultado parcial.
        </p>
      </div>

      <div className="evaluation-context__sources" aria-label="Estado de las fuentes 270">
        {Object.values(sources).map((source) => (
          <span
            className={`context-source ${source.complete ? 'is-complete' : ''}`}
            key={source.source}
          >
            <i aria-hidden="true" />
            <span>{SOURCE_LABELS[source.source]}</span>
            <strong>{source.complete ? 'Completa' : 'Pendiente'}</strong>
          </span>
        ))}
      </div>

      <button className="btn btn--ghost btn--sm" type="button" onClick={onViewResults}>
        Ver resultado 270°
        <Icon name="arrow-right" size={15} />
      </button>
    </div>
  );
}

export default function Evaluation270() {
  const [phase, setPhase] = useState('form');
  const [evaluations, setEvaluations] = useState([]);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [pendingEvaluation, setPendingEvaluation] = useState(null);
  const [session, setSession] = useState(0);

  // Pantalla de cálculo de 2 segundos antes de mostrar el tablero.
  useEffect(() => {
    if (phase !== 'calculating' || !pendingEvaluation) return undefined;

    const timer = window.setTimeout(() => {
      setEvaluations((current) => [...current, pendingEvaluation]);
      setCurrentEvaluation(pendingEvaluation);
      setPendingEvaluation(null);
      setPhase('results');
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [phase, pendingEvaluation]);

  const handleComplete = (evaluation) => {
    setPendingEvaluation(evaluation);
    setPhase('calculating');
  };

  const handleAddAnother = () => {
    setCurrentEvaluation(null);
    setSession((current) => current + 1);
    setPhase('form');
  };

  const handleRestart = () => {
    setEvaluations([]);
    setCurrentEvaluation(null);
    setPendingEvaluation(null);
    setSession((current) => current + 1);
    setPhase('form');
  };

  const showPreviousResults = () => {
    const last = evaluations[evaluations.length - 1];
    if (!last) return;
    setCurrentEvaluation(last);
    setPhase('results');
  };

  const initialMeta = evaluations[0]
    ? {
        evaluatedName: evaluations[0].meta.evaluatedName,
        period: evaluations[0].meta.period,
      }
    : undefined;

  return (
    <section className="section evaluation" id="evaluacion" aria-labelledby="evaluation-title">
      <div className="evaluation__aura" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          id="evaluation-title"
          eyebrow="Evaluación 270° · Coordinación de técnicos"
          title={
            <>
              Una mirada completa
              <br />
              también se construye.
            </>
          }
          description="Jefe directo, equipo y autoevaluación. Tres perspectivas, una conversación honesta sobre el liderazgo técnico. Todo ocurre en tu navegador."
        />

        <div className="evaluation__meta-strip" aria-label="Características de la evaluación">
          <span>
            <Icon name="clipboard" size={17} />
            25 preguntas · 5 competencias
          </span>
          <span>
            <Icon name="layers" size={17} />
            3 fuentes ponderadas
          </span>
          <span>
            <Icon name="shield" size={17} />
            Sin almacenamiento
          </span>
        </div>

        <div className="evaluation__shell">
          {phase === 'form' && (
            <>
              {evaluations.length > 0 && (
                <SourceContext evaluations={evaluations} onViewResults={showPreviousResults} />
              )}
              <EvaluationWizard
                key={session}
                onComplete={handleComplete}
                initialMeta={initialMeta}
                existingEvaluations={evaluations}
              />
            </>
          )}

          {phase === 'calculating' && <CalculatingScreen />}

          {phase === 'results' && currentEvaluation && (
            <EvaluationResults
              evaluation={currentEvaluation}
              evaluations={evaluations}
              onAddAnother={handleAddAnother}
              onRestart={handleRestart}
            />
          )}
        </div>

        <p className="evaluation__privacy">
          <Icon name="shield" size={15} />
          {EVALUATION_META.notice} No se usa localStorage, sessionStorage ni se envían datos a
          ningún servidor.
        </p>
      </div>
    </section>
  );
}
