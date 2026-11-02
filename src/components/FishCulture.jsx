import { useState } from 'react';
import { FISH_CULTURE } from '../data/companyData.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icon.jsx';

function FishCard({ item, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Reveal className="fish-card-wrap" delay={index * 90}>
      <button
        type="button"
        className={`fish-card fish-card--${item.accent} ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((current) => !current)}
        aria-pressed={flipped}
        aria-label={`${item.title}. ${flipped ? 'Ver presentación' : 'Ver acciones y responsables'}`}
      >
        <span className="fish-card__inner">
          <span className="fish-card__face fish-card__front" aria-hidden={flipped}>
            <span className="fish-card__top">
              <span className="fish-card__icon">
                <Icon name={item.icon} size={28} />
              </span>
              <span className="fish-card__index">0{index + 1}</span>
            </span>
            <span className="fish-card__title">{item.title}</span>
            <span className="fish-card__subtitle">{item.subtitle}</span>
            <span className="fish-card__prompt">
              Ver acciones
              <span className="fish-card__prompt-icon">
                <Icon name="arrow-up-right" size={15} />
              </span>
            </span>
            <span className="fish-card__shape" aria-hidden="true" />
          </span>

          <span className="fish-card__face fish-card__back" aria-hidden={!flipped}>
            <span className="fish-card__back-top">
              <span className="fish-card__back-label">{item.title}</span>
              <Icon name="reset" size={16} />
            </span>
            <span className="fish-card__back-title">En la práctica</span>
            <span className="fish-card__actions">
              {item.actions.map((action) => (
                <span className="fish-card__action" key={action}>
                  <span aria-hidden="true" />
                  {action}
                </span>
              ))}
            </span>
            <span className="fish-card__owner">
              <span>Responsable</span>
              {item.owner}
            </span>
          </span>
        </span>
      </button>
    </Reveal>
  );
}

export default function FishCulture() {
  return (
    <section className="section fish" id="cultura" aria-labelledby="fish-title">
      <div className="fish__wave" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          id="fish-title"
          eyebrow="Cultura FISH · Cómo se siente trabajar aquí"
          title={
            <>
              Cuatro formas de hacer
              <br />
              que el día valga la pena.
            </>
          }
          description="La cultura no es un póster: es lo que pasa en el mostrador, en el taller y en la reunión de los lunes. Estas son las acciones que practicamos."
          tone="light"
          align="center"
        />

        <div className="fish__grid">
          {FISH_CULTURE.map((item, index) => (
            <FishCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <Reveal className="fish__footer" delay={160}>
          <span className="fish__footer-icon">
            <Icon name="heart" size={18} />
          </span>
          <p>
            <strong>La regla es simple:</strong> si una acción no mejora el día de alguien, no es
            cultura. Es costumbre.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
