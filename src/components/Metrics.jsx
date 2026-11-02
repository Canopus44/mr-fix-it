import { METRICS } from '../data/companyData.js';
import { useInView } from '../hooks/useInView.js';
import { useCounter } from '../hooks/useCounter.js';
import Reveal from './Reveal.jsx';

function Metric({ metric, index }) {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const value = useCounter(metric.value, { start: inView, duration: 1500 + index * 140 });

  return (
    <Reveal
      as="li"
      className="metric"
      delay={index * 90}
      ref={ref}
      aria-label={`${metric.value}${metric.suffix} ${metric.label}`}
    >
      <span className="metric__index">0{index + 1}</span>
      <p className="metric__value">
        {value}
        <span>{metric.suffix}</span>
      </p>
      <h3>{metric.label}</h3>
      <p className="metric__detail">{metric.detail}</p>
    </Reveal>
  );
}

export default function Metrics() {
  return (
    <section className="metrics" id="metricas" aria-labelledby="metrics-title">
      <div className="container">
        <h2 className="visually-hidden" id="metrics-title">
          Mr. Fix-it en cifras
        </h2>
        <ul className="metrics__grid">
          {METRICS.map((metric, index) => (
            <Metric key={metric.id} metric={metric} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
