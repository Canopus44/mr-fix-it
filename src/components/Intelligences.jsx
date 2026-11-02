import { INTELLIGENCES } from '../data/companyData.js';
import { useInView } from '../hooks/useInView.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icon.jsx';

const SIZE = 420;
const CENTER = SIZE / 2;
const RADIUS = 100;
const AXES = INTELLIGENCES.length;

function polarPoint(index, ratio) {
  const angle = (Math.PI * 2 * index) / AXES - Math.PI / 2;
  return {
    x: CENTER + Math.cos(angle) * RADIUS * ratio,
    y: CENTER + Math.sin(angle) * RADIUS * ratio,
  };
}

function pointsToString(points) {
  return points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ');
}

function TeamRadar() {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const dataPoints = INTELLIGENCES.map((item, index) => polarPoint(index, item.value / 100));
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className={`intel-radar ${inView ? 'is-visible' : ''}`} ref={ref}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Mapa radial de las inteligencias del equipo">
        <defs>
          <radialGradient id="intelFill" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#0A84FF" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#0A84FF" stopOpacity="0.06" />
          </radialGradient>
          <linearGradient id="intelStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A84FF" />
            <stop offset="65%" stopColor="#E5202E" />
            <stop offset="100%" stopColor="#0A84FF" />
          </linearGradient>
        </defs>

        {gridLevels.map((level) => (
          <polygon
            key={level}
            className="intel-radar__grid"
            points={pointsToString(
              INTELLIGENCES.map((_, index) => polarPoint(index, level)),
            )}
          />
        ))}

        {INTELLIGENCES.map((item, index) => {
          const end = polarPoint(index, 1);
          return (
            <line
              key={item.id}
              className="intel-radar__axis"
              x1={CENTER}
              y1={CENTER}
              x2={end.x}
              y2={end.y}
            />
          );
        })}

        <polygon
          className="intel-radar__shape"
          points={pointsToString(dataPoints)}
          fill="url(#intelFill)"
          stroke="url(#intelStroke)"
        />

        {dataPoints.map((point, index) => (
          <circle
            className="intel-radar__dot"
            key={INTELLIGENCES[index].id}
            cx={point.x}
            cy={point.y}
            r="4"
            style={{ '--dot-index': index }}
          />
        ))}

        {INTELLIGENCES.map((item, index) => {
          const angle = (Math.PI * 2 * index) / AXES - Math.PI / 2;
          const labelRadius = RADIUS + 26;
          const x = CENTER + Math.cos(angle) * labelRadius;
          const y = CENTER + Math.sin(angle) * labelRadius;
          const anchor = Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
          return (
            <text
              key={item.id}
              className="intel-radar__label"
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
            >
              <tspan x={x} dy="-3">
                {item.short}
              </tspan>
              <tspan x={x} dy="15" className="intel-radar__value">
                {item.value}%
              </tspan>
            </text>
          );
        })}
      </svg>
      <div className="intel-radar__caption">
        <span className="intel-radar__caption-dot" aria-hidden="true" />
        Promedio del equipo · 86%
      </div>
    </div>
  );
}

export default function Intelligences() {
  return (
    <section className="section intel" id="inteligencias" aria-labelledby="intel-title">
      <div className="container">
        <SectionHeading
          id="intel-title"
          eyebrow="Inteligencias clave del equipo"
          title={
            <>
              No solo reparamos.
              <br />
              También sabemos cómo.
            </>
          }
          description="Un buen taller necesita manos precisas, mirada atenta y palabras claras. Estas son las inteligencias que más se mueven en nuestro equipo."
        />

        <div className="intel__layout">
          <Reveal className="intel__visual" delay={80}>
            <TeamRadar />
          </Reveal>

          <div className="intel__list">
            {INTELLIGENCES.map((item, index) => (
              <Reveal as="article" className="intel-item" key={item.id} delay={index * 70}>
                <div className="intel-item__head">
                  <span className="intel-item__icon">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <h3>{item.label}</h3>
                  <span className="intel-item__value">{item.value}%</span>
                </div>
                <p>{item.description}</p>
                <div className="intel-item__bar" aria-hidden="true">
                  <span style={{ '--value': `${item.value}%` }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="intel__note" delay={120}>
          <Icon name="sparkles" size={18} />
          <p>
            La inteligencia del equipo no es la suma de los títulos. Es la forma en que se combinan
            para resolver lo que llega al taller.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
