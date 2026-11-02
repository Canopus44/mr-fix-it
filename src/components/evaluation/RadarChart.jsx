import { COMPETENCIES } from '../../data/evaluationData.js';
import { formatScore } from '../../utils/evaluation.js';

const SIZE = 460;
const CENTER = SIZE / 2;
const RADIUS = 105;
const AXES = COMPETENCIES.length;

function polarPoint(index, ratio) {
  const angle = (Math.PI * 2 * index) / AXES - Math.PI / 2;
  return {
    x: CENTER + Math.cos(angle) * RADIUS * ratio,
    y: CENTER + Math.sin(angle) * RADIUS * ratio,
  };
}

const pointsToString = (points) =>
  points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ');

export default function RadarChart({ competenceScores }) {
  const dataPoints = COMPETENCIES.map((competency) =>
    polarPoint(competency.code.charCodeAt(0) - 65, (competenceScores?.[competency.id] || 0) / 5),
  );

  const accessibleLabel = COMPETENCIES.map(
    (competency) =>
      `${competency.short}: ${formatScore(competenceScores?.[competency.id])} de 5`,
  ).join('. ');

  return (
    <div className="radar">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`Radar de competencias. ${accessibleLabel}.`}>
        <defs>
          <radialGradient id="radarFill" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#E5202E" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#0A84FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0A84FF" stopOpacity="0.08" />
          </radialGradient>
          <linearGradient id="radarStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A84FF" />
            <stop offset="100%" stopColor="#E5202E" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((level) => (
          <polygon
            key={level}
            className="radar__grid"
            points={pointsToString(
              COMPETENCIES.map((_, index) => polarPoint(index, level)),
            )}
          />
        ))}

        {COMPETENCIES.map((competency, index) => {
          const end = polarPoint(index, 1);
          return (
            <line
              key={competency.id}
              className="radar__axis"
              x1={CENTER}
              y1={CENTER}
              x2={end.x}
              y2={end.y}
            />
          );
        })}

        <polygon
          className="radar__shape"
          points={pointsToString(dataPoints)}
          fill="url(#radarFill)"
          stroke="url(#radarStroke)"
        />

        {dataPoints.map((point, index) => (
          <circle
            key={COMPETENCIES[index].id}
            className="radar__dot"
            cx={point.x}
            cy={point.y}
            r="4"
            style={{ '--dot-index': index }}
          />
        ))}

        {COMPETENCIES.map((competency, index) => {
          const angle = (Math.PI * 2 * index) / AXES - Math.PI / 2;
          const labelRadius = RADIUS + 27;
          const x = CENTER + Math.cos(angle) * labelRadius;
          const y = CENTER + Math.sin(angle) * labelRadius;
          const anchor = Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
          return (
            <text
              key={competency.id}
              className="radar__label"
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
            >
              <tspan x={x} dy="-3">
                {competency.code} · {competency.short}
              </tspan>
              <tspan x={x} dy="15" className="radar__label-score">
                {formatScore(competenceScores?.[competency.id])}
              </tspan>
            </text>
          );
        })}
      </svg>
    </div>
  );
}
