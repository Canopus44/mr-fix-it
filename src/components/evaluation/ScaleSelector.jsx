import { EVALUATION_META } from '../../data/evaluationData.js';

/** Escala 1–5 con radios nativos para conservar navegación por teclado. */
export default function ScaleSelector({ id, value, onChange, labelId }) {
  const selected = EVALUATION_META.scale.find((option) => option.value === value);

  return (
    <div className="scale" role="radiogroup" aria-labelledby={labelId}>
      <div className="scale__options">
        {EVALUATION_META.scale.map((option) => (
          <label
            className={`scale__option scale__option--${option.value} ${
              value === option.value ? 'is-selected' : ''
            }`}
            key={option.value}
          >
            <input
              type="radio"
              name={`rating-${id}`}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="scale__number">{option.value}</span>
            <span className="visually-hidden">
              {option.value} · {option.label}
            </span>
          </label>
        ))}
      </div>
      <span className="scale__selected" aria-live="polite">
        {selected ? (
          <>
            <strong>{selected.value}</strong> · {selected.label}
          </>
        ) : (
          'Sin responder'
        )}
      </span>
    </div>
  );
}
