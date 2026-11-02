import { useEffect, useRef, useState } from 'react';
import {
  COMPETENCIES,
  DEFAULT_PLAN,
  EVALUATION_META,
  EVALUATION_TYPES,
  OPEN_ANSWER_MAX,
  OPEN_ANSWER_MIN,
  OPEN_QUESTIONS,
  PLAN_MAX_ROWS,
  PLAN_MIN_ROWS,
  STEP_TITLES,
} from '../../data/evaluationData.js';
import { buildEvaluation } from '../../utils/evaluation.js';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import Icon from '../Icon.jsx';
import ScaleSelector from './ScaleSelector.jsx';

const TOTAL_STEPS = 8;

function getCurrentPeriod() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export default function EvaluationWizard({ onComplete, initialMeta, existingEvaluations = [] }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [fields, setFields] = useState({
    evaluatedName: initialMeta?.evaluatedName ?? '',
    period: initialMeta?.period ?? getCurrentPeriod(),
    evaluatorName: '',
    type: initialMeta?.type ?? '',
    role: EVALUATION_META.role,
    area: EVALUATION_META.area,
  });
  const [answers, setAnswers] = useState({});
  const [openAnswers, setOpenAnswers] = useState({});
  const [plan, setPlan] = useState(DEFAULT_PLAN.map((row) => ({ ...row })));
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const today = getToday();

  const lockedName = Boolean(initialMeta?.evaluatedName);
  const lockedTypes = new Set(
    existingEvaluations
      .filter((evaluation) => evaluation.meta.type !== 'equipo')
      .map((evaluation) => evaluation.meta.type),
  );

  const activeCompetency = step >= 1 && step <= 5 ? COMPETENCIES[step - 1] : null;
  const progress = (step / (TOTAL_STEPS - 1)) * 100;
  const hasErrors = Object.keys(errors).length > 0;

  // Al cambiar de bloque, subimos al inicio del formulario.
  useEffect(() => {
    if (step === 0) return;
    formRef.current?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [step, reducedMotion]);

  const clearError = (key) => {
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const updateField = (name, value) => {
    setFields((current) => ({ ...current, [name]: value }));
    clearError(name);
  };

  const setRating = (questionId, value) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
    clearError(questionId);
    clearError('answers');
  };

  const updatePlanRow = (id, field, value) => {
    setPlan((current) =>
      current.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
    clearError(`${id}-${field}`);
    clearError('plan');
  };

  const addPlanRow = () => {
    if (plan.length >= PLAN_MAX_ROWS) return;
    const newRow = {
      id: `plan-${Date.now()}`,
      aspect: '',
      action: '',
      date: '',
    };
    setPlan((current) => [...current, newRow]);
  };

  const removePlanRow = (id) => {
    if (plan.length <= PLAN_MIN_ROWS) return;
    setPlan((current) => current.filter((row) => row.id !== id));
    setErrors((current) => {
      const next = { ...current };
      Object.keys(next).forEach((key) => {
        if (key.startsWith(id)) delete next[key];
      });
      return next;
    });
  };

  const validateStep = () => {
    const nextErrors = {};

    if (step === 0) {
      if (fields.evaluatedName.trim().length < 2) {
        nextErrors.evaluatedName = 'Escribe el nombre de la persona evaluada.';
      }
      if (!fields.period) {
        nextErrors.period = 'Selecciona el periodo evaluado.';
      }
      if (fields.evaluatorName.trim().length < 2) {
        nextErrors.evaluatorName = 'Escribe el nombre de quien evalúa.';
      }
      if (!fields.type) {
        nextErrors.type = 'Selecciona el tipo de evaluación.';
      } else if (lockedTypes.has(fields.type)) {
        nextErrors.type = 'Esta fuente ya tiene una evaluación registrada.';
      }
    }

    if (activeCompetency) {
      activeCompetency.questions.forEach((question) => {
        if (!answers[question.id]) {
          nextErrors[question.id] = 'Selecciona una opción del 1 al 5.';
        }
      });
      if (Object.keys(nextErrors).length) {
        nextErrors.answers = 'Responde todas las preguntas antes de continuar.';
      }
    }

    if (step === 6) {
      OPEN_QUESTIONS.forEach((question) => {
        const value = (openAnswers[question.id] ?? '').trim();
        if (value.length < OPEN_ANSWER_MIN) {
          nextErrors[question.id] = `Escribe al menos ${OPEN_ANSWER_MIN} caracteres.`;
        }
      });
      if (Object.keys(nextErrors).length) {
        nextErrors.open = 'Completa las cinco respuestas abiertas.';
      }
    }

    if (step === 7) {
      if (plan.length < PLAN_MIN_ROWS) {
        nextErrors.plan = `El plan debe tener al menos ${PLAN_MIN_ROWS} filas.`;
      }
      plan.forEach((row) => {
        if (!row.aspect.trim()) {
          nextErrors[`${row.id}-aspect`] = 'Describe el aspecto por mejorar.';
        }
        if (!row.action.trim()) {
          nextErrors[`${row.id}-action`] = 'Escribe la acción propuesta.';
        }
        if (!row.date) {
          nextErrors[`${row.id}-date`] = 'Selecciona una fecha.';
        } else if (row.date < today) {
          nextErrors[`${row.id}-date`] = 'Elige una fecha de hoy en adelante.';
        }
      });
      if (Object.keys(nextErrors).length) {
        nextErrors.plan = 'Completa todas las filas del plan de mejoramiento.';
      }
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateStep();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => {
        const firstInvalid = formRef.current?.querySelector('[aria-invalid="true"]');
        firstInvalid?.focus?.();
      });
      return;
    }

    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((current) => current + 1);
      return;
    }

    onComplete(
      buildEvaluation({
        fields,
        answers,
        openAnswers,
        plan,
      }),
    );
  };

  const goBack = () => {
    if (step === 0) return;
    setDirection(-1);
    setStep((current) => current - 1);
  };

  const renderStep = () => {
    if (step === 0) {
      return (
        <div className="wizard-step" key="step-0">
          <div className="wizard-step__heading">
            <p className="wizard-step__eyebrow">Paso 01 · Contexto</p>
            <h3>Datos generales</h3>
            <p>
              Identifica la evaluación. El cargo y el área vienen definidos para este formato de
              coordinación técnica.
            </p>
          </div>

          <div className="form-grid">
            <div className="field field--full">
              <label htmlFor="evaluatedName">Nombre del evaluado</label>
              <input
                id="evaluatedName"
                name="evaluatedName"
                type="text"
                value={fields.evaluatedName}
                onChange={(event) => updateField('evaluatedName', event.target.value)}
                placeholder="Ej. Arturo Angulo"
                autoComplete="name"
                readOnly={lockedName}
                aria-invalid={Boolean(errors.evaluatedName)}
                aria-describedby={errors.evaluatedName ? 'error-evaluatedName' : undefined}
              />
              {lockedName && (
                <p className="field__hint">
                  <Icon name="check-circle" size={14} />
                  Consolidando las evaluaciones de esta misma persona.
                </p>
              )}
              {errors.evaluatedName && (
                <p className="field-error" id="error-evaluatedName">
                  {errors.evaluatedName}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="role">Cargo</label>
              <div className="field__fixed">
                <Icon name="briefcase" size={17} />
                <input id="role" name="role" type="text" value={fields.role} readOnly />
              </div>
            </div>

            <div className="field">
              <label htmlFor="area">Área</label>
              <div className="field__fixed">
                <Icon name="layers" size={17} />
                <input id="area" name="area" type="text" value={fields.area} readOnly />
              </div>
            </div>

            <div className="field">
              <label htmlFor="period">Periodo evaluado</label>
              <input
                id="period"
                name="period"
                type="month"
                value={fields.period}
                onChange={(event) => updateField('period', event.target.value)}
                aria-invalid={Boolean(errors.period)}
                aria-describedby={errors.period ? 'error-period' : undefined}
              />
              {errors.period && (
                <p className="field-error" id="error-period">
                  {errors.period}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="evaluatorName">Nombre del evaluador</label>
              <input
                id="evaluatorName"
                name="evaluatorName"
                type="text"
                value={fields.evaluatorName}
                onChange={(event) => updateField('evaluatorName', event.target.value)}
                placeholder="¿Quién responde esta evaluación?"
                autoComplete="name"
                aria-invalid={Boolean(errors.evaluatorName)}
                aria-describedby={errors.evaluatorName ? 'error-evaluatorName' : undefined}
              />
              {errors.evaluatorName && (
                <p className="field-error" id="error-evaluatorName">
                  {errors.evaluatorName}
                </p>
              )}
            </div>
          </div>

          <fieldset className="type-fieldset">
            <legend id="type-label">Tipo de evaluación</legend>
            <p className="type-fieldset__hint">
              La mirada 270° se construye con tres fuentes. La ponderación se aplica al consolidar.
            </p>
            <div
              className="type-grid"
              role="radiogroup"
              aria-labelledby="type-label"
              aria-invalid={Boolean(errors.type)}
              aria-describedby={errors.type ? 'error-type' : undefined}
            >
              {EVALUATION_TYPES.map((type) => {
                const locked = lockedTypes.has(type.id);
                return (
                  <label
                    className={`type-card ${fields.type === type.id ? 'is-selected' : ''} ${
                      locked ? 'is-locked' : ''
                    }`}
                    key={type.id}
                  >
                    <input
                      type="radio"
                      name="evaluationType"
                      value={type.id}
                      checked={fields.type === type.id}
                      disabled={locked}
                      onChange={() => updateField('type', type.id)}
                    />
                    <span className="type-card__top">
                      <span className="type-card__icon">
                        <Icon name={type.icon} size={21} />
                      </span>
                      <span className="type-card__weight">{Math.round(type.weight * 100)}%</span>
                    </span>
                    <strong>{type.label}</strong>
                    <span className="type-card__description">{type.description}</span>
                    <span className="type-card__radio" aria-hidden="true">
                      <span />
                    </span>
                    {locked && (
                      <span className="type-card__locked">
                        <Icon name="check" size={12} /> Ya registrada
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
            {errors.type && (
              <p className="field-error" id="error-type">
                {errors.type}
              </p>
            )}
          </fieldset>
        </div>
      );
    }

    if (activeCompetency) {
      return (
        <div className="wizard-step" key={`step-${step}`}>
          <div className="wizard-step__heading wizard-step__heading--competency">
            <div className="wizard-step__competency-code">{activeCompetency.code}</div>
            <div>
              <p className="wizard-step__eyebrow">
                Competencia {step} de 5 · Preguntas {(step - 1) * 5 + 1}–
                {(step - 1) * 5 + 5} de 25
              </p>
              <h3>{activeCompetency.title}</h3>
              <p>{activeCompetency.description}</p>
            </div>
          </div>

          <div className="scale-legend" aria-label="Escala de valoración">
            <span className="scale-legend__title">Escala</span>
            {EVALUATION_META.scale.map((option) => (
              <span className={`scale-legend__item scale-legend__item--${option.value}`} key={option.value}>
                <strong>{option.value}</strong>
                {option.label}
              </span>
            ))}
          </div>

          <div className="questions">
            {activeCompetency.questions.map((question) => (
              <article
                className={`question ${errors[question.id] ? 'has-error' : ''}`}
                key={question.id}
              >
                <div className="question__head">
                  <span className="question__number">{String(question.number).padStart(2, '0')}</span>
                  <p id={`question-label-${question.id}`}>{question.text}</p>
                </div>
                <ScaleSelector
                  id={question.id}
                  value={answers[question.id]}
                  onChange={(value) => setRating(question.id, value)}
                  labelId={`question-label-${question.id}`}
                />
                {errors[question.id] && (
                  <p className="field-error" role="alert">
                    {errors[question.id]}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (step === 6) {
      return (
        <div className="wizard-step" key="step-6">
          <div className="wizard-step__heading">
            <p className="wizard-step__eyebrow">Paso 07 · Mirada cualitativa</p>
            <h3>Preguntas abiertas</h3>
            <p>
              Lo que los números no alcanzan a decir. Responde desde tu experiencia, con ejemplos
              concretos si es posible.
            </p>
          </div>

          <div className="open-questions">
            {OPEN_QUESTIONS.map((question) => {
              const value = openAnswers[question.id] ?? '';
              return (
                <div className={`field field--full ${errors[question.id] ? 'has-error' : ''}`} key={question.id}>
                  <div className="field__label-row">
                    <label htmlFor={question.id}>
                      <span className="field__number">{String(question.number).padStart(2, '0')}</span>
                      {question.text}
                    </label>
                    <span className="field__counter">
                      {value.length} / {OPEN_ANSWER_MAX}
                    </span>
                  </div>
                  <textarea
                    id={question.id}
                    name={question.id}
                    value={value}
                    maxLength={OPEN_ANSWER_MAX}
                    rows={4}
                    placeholder="Escribe tu respuesta…"
                    onChange={(event) => {
                      setOpenAnswers((current) => ({
                        ...current,
                        [question.id]: event.target.value,
                      }));
                      clearError(question.id);
                      clearError('open');
                    }}
                    aria-invalid={Boolean(errors[question.id])}
                    aria-describedby={`${question.id}-help ${
                      errors[question.id] ? `${question.id}-error` : ''
                    }`}
                  />
                  <p className="field__hint" id={`${question.id}-help`}>
                    Mínimo {OPEN_ANSWER_MIN} caracteres. Se guarda solo en la memoria de esta pestaña.
                  </p>
                  {errors[question.id] && (
                    <p className="field-error" id={`${question.id}-error`}>
                      {errors[question.id]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="wizard-step" key="step-7">
        <div className="wizard-step__heading">
          <p className="wizard-step__eyebrow">Paso 08 · Acción</p>
          <h3>Plan de mejoramiento</h3>
          <p>
            Convierte las oportunidades en compromisos concretos. Mínimo tres filas, con
            responsable y fecha de cumplimiento.
          </p>
        </div>

        <div className="plan">
          <div className="plan__toolbar">
            <span>
              <Icon name="calendar" size={16} />
              Mínimo {PLAN_MIN_ROWS} · máximo {PLAN_MAX_ROWS} filas
            </span>
            <button
              className="btn btn--ghost btn--sm"
              type="button"
              onClick={addPlanRow}
              disabled={plan.length >= PLAN_MAX_ROWS}
            >
              <Icon name="plus" size={15} />
              Agregar fila
            </button>
          </div>

          <div className="plan__table-wrap">
            <table className="plan__table">
              <caption className="visually-hidden">
                Plan de mejoramiento con aspecto, acción y fecha de cumplimiento
              </caption>
              <thead>
                <tr>
                  <th scope="col">Aspecto por mejorar</th>
                  <th scope="col">Acción propuesta</th>
                  <th scope="col">Fecha de cumplimiento</th>
                  <th scope="col">
                    <span className="visually-hidden">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {plan.map((row, index) => (
                  <tr key={row.id}>
                    <td data-label="Aspecto por mejorar">
                      <textarea
                        rows={2}
                        value={row.aspect}
                        onChange={(event) => updatePlanRow(row.id, 'aspect', event.target.value)}
                        placeholder={`Aspecto ${index + 1}`}
                        aria-label={`Aspecto por mejorar, fila ${index + 1}`}
                        aria-invalid={Boolean(errors[`${row.id}-aspect`])}
                      />
                      {errors[`${row.id}-aspect`] && (
                        <span className="field-error">{errors[`${row.id}-aspect`]}</span>
                      )}
                    </td>
                    <td data-label="Acción propuesta">
                      <textarea
                        rows={2}
                        value={row.action}
                        onChange={(event) => updatePlanRow(row.id, 'action', event.target.value)}
                        placeholder="¿Qué haremos?"
                        aria-label={`Acción propuesta, fila ${index + 1}`}
                        aria-invalid={Boolean(errors[`${row.id}-action`])}
                      />
                      {errors[`${row.id}-action`] && (
                        <span className="field-error">{errors[`${row.id}-action`]}</span>
                      )}
                    </td>
                    <td data-label="Fecha de cumplimiento">
                      <input
                        type="date"
                        value={row.date}
                        min={today}
                        onChange={(event) => updatePlanRow(row.id, 'date', event.target.value)}
                        aria-label={`Fecha de cumplimiento, fila ${index + 1}`}
                        aria-invalid={Boolean(errors[`${row.id}-date`])}
                      />
                      {errors[`${row.id}-date`] && (
                        <span className="field-error">{errors[`${row.id}-date`]}</span>
                      )}
                    </td>
                    <td className="plan__actions" data-label="Acciones">
                      <button
                        type="button"
                        className="plan__remove"
                        onClick={() => removePlanRow(row.id)}
                        disabled={plan.length <= PLAN_MIN_ROWS}
                        aria-label={`Eliminar fila ${index + 1}`}
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {errors.plan && (
            <p className="field-error" role="alert">
              {errors.plan}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="wizard" ref={formRef} id="evaluacion-formulario">
      <div className="wizard__top">
        <div className="wizard__top-copy">
          <span className="wizard__badge">
            <Icon name="clipboard" size={15} />
            Formato 270°
          </span>
          <h3>Evaluación de desempeño</h3>
          <p>{EVALUATION_META.role} · {EVALUATION_META.area}</p>
        </div>
        <div className="wizard__privacy">
          <Icon name="shield" size={16} />
          <p>{EVALUATION_META.notice}</p>
        </div>
      </div>

      <div className="wizard__progress-wrap">
        <div className="wizard__progress-head">
          <span>
            Paso {step + 1} de {TOTAL_STEPS} · {STEP_TITLES[step]}
          </span>
          <strong>{Math.round(progress)}%</strong>
        </div>
        <div
          className="wizard__progress"
          role="progressbar"
          aria-label="Progreso del formulario de evaluación 270°"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(progress)}
          aria-valuetext={`Paso ${step + 1} de ${TOTAL_STEPS}: ${STEP_TITLES[step]}`}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="wizard__steps" aria-hidden="true">
          {STEP_TITLES.map((title, index) => (
            <span
              key={title}
              className={`wizard__step-dot ${index < step ? 'is-complete' : ''} ${
                index === step ? 'is-current' : ''
              }`}
            >
              {index < step ? <Icon name="check" size={10} strokeWidth={3} /> : index + 1}
            </span>
          ))}
        </div>
      </div>

      <form className="wizard__form" onSubmit={handleSubmit} noValidate>
        <div
          className={`wizard__step-stage ${
            direction > 0 ? 'is-forward' : 'is-backward'
          }`}
        >
          {renderStep()}
        </div>

        <div className="wizard__feedback" aria-live="assertive">
          {hasErrors && (
            <p className="wizard__error-summary" role="alert">
              <Icon name="alert" size={17} />
              Revisa los campos marcados para continuar.
            </p>
          )}
        </div>

        <div className="wizard__footer">
          <button
            className="btn btn--ghost btn--md"
            type="button"
            onClick={goBack}
            disabled={step === 0}
          >
            <Icon name="arrow-left" size={17} />
            Atrás
          </button>

          <span className="wizard__enter-hint">
            Presiona <kbd>Enter</kbd> para continuar
          </span>

          <button className="btn btn--primary btn--md" type="submit">
            {step === TOTAL_STEPS - 1 ? (
              <>
                Calcular resultados
                <Icon name="chart" size={17} />
              </>
            ) : (
              <>
                Siguiente
                <Icon name="arrow-right" size={17} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
