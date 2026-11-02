import { useState } from 'react';
import { LOYALTY, STRATEGIES } from '../data/companyData.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icon.jsx';

function LoyaltyCard() {
  const [visits, setVisits] = useState(0);
  const progress = (visits / 6) * 100;
  const unlockedDiscount = visits >= 6 ? 20 : visits >= 3 ? 10 : 0;

  const status =
    visits >= 6
      ? '¡20% desbloqueado! Gracias por seguir confiando.'
      : visits >= 3
        ? `10% desbloqueado. Te faltan ${6 - visits} ${6 - visits === 1 ? 'visita' : 'visitas'} para el 20%.`
        : `Te faltan ${3 - visits} ${3 - visits === 1 ? 'visita' : 'visitas'} para desbloquear tu 10%.`;

  const registerVisit = () => setVisits((current) => Math.min(6, current + 1));

  return (
    <Reveal as="aside" className="loyalty" delay={120} aria-label="Programa de fidelización">
      <div className="loyalty__glow" aria-hidden="true" />
      <div className="loyalty__head">
        <p className="loyalty__eyebrow">{LOYALTY.eyebrow}</p>
        <span className="loyalty__badge">
          <Icon name="star" size={14} />
          Club Mr. Fix-it
        </span>
      </div>

      <h3>{LOYALTY.title}</h3>
      <p className="loyalty__copy">{LOYALTY.description}</p>

      <div className="loyalty__discount" aria-live="polite">
        <span className="loyalty__discount-value">{unlockedDiscount}%</span>
        <span className="loyalty__discount-label">
          {unlockedDiscount ? 'descuento desbloqueado' : 'por desbloquear'}
        </span>
      </div>

      <div className="loyalty__bar-wrap">
        <div className="loyalty__bar-head">
          <span>Tu avance</span>
          <strong>
            {visits} <span>/ 6 visitas</span>
          </strong>
        </div>
        <div className="loyalty__range-wrap" style={{ '--progress': `${progress}%` }}>
          <input
            className="loyalty__range"
            type="range"
            min="0"
            max="6"
            step="1"
            value={visits}
            onChange={(event) => setVisits(Number(event.target.value))}
            aria-label="Visitas registradas en el club de fidelización"
            aria-valuetext={`${visits} de 6 visitas. ${status}`}
          />
          <span className="loyalty__milestone loyalty__milestone--10" aria-hidden="true">
            10%
          </span>
          <span className="loyalty__milestone loyalty__milestone--20" aria-hidden="true">
            20%
          </span>
        </div>
        <div className="loyalty__milestones">
          {LOYALTY.milestones.map((milestone) => (
            <span
              key={milestone.visits}
              className={`loyalty__milestone-label ${
                visits >= milestone.visits ? 'is-unlocked' : ''
              }`}
            >
              <Icon name={visits >= milestone.visits ? 'check-circle' : 'gift'} size={15} />
              {milestone.label} · {milestone.discount}%
            </span>
          ))}
        </div>
      </div>

      <p className="loyalty__status" aria-live="polite">
        {status}
      </p>

      <div className="loyalty__actions">
        <button
          className="btn btn--primary btn--sm"
          type="button"
          onClick={registerVisit}
          disabled={visits >= 6}
        >
          <Icon name="plus" size={16} />
          Registrar visita
        </button>
        <button
          className="loyalty__reset"
          type="button"
          onClick={() => setVisits(0)}
          disabled={visits === 0}
        >
          Reiniciar
        </button>
      </div>

      <p className="loyalty__disclaimer">{LOYALTY.disclaimer}</p>
    </Reveal>
  );
}

export default function Strategies() {
  return (
    <section className="section strategies" id="estrategias" aria-labelledby="strategies-title">
      <div className="container">
        <SectionHeading
          id="strategies-title"
          eyebrow="La experiencia Mr. Fix-it"
          title={
            <>
              Más que una reparación.
              <br />
              Una razón para volver.
            </>
          }
          description="Cuidamos el equipo, pero sobre todo cuidamos la experiencia de la persona que lo trae. Estos son los detalles que hacen la diferencia."
        />

        <div className="strategies__layout">
          <div className="strategies__benefits">
            {STRATEGIES.map((strategy, index) => (
              <Reveal
                as="article"
                className="benefit-card"
                key={strategy.id}
                delay={index * 80}
              >
                <span className="benefit-card__icon">
                  <Icon name={strategy.icon} size={23} />
                </span>
                <div>
                  <h3>{strategy.title}</h3>
                  <p>{strategy.text}</p>
                </div>
                <span className="benefit-card__index" aria-hidden="true">
                  0{index + 1}
                </span>
              </Reveal>
            ))}
          </div>

          <LoyaltyCard />
        </div>
      </div>
    </section>
  );
}
