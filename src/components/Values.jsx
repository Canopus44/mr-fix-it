import { useRef } from 'react';
import { VALUES } from '../data/companyData.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icon.jsx';

function ValueCard({ value, index }) {
  const cardRef = useRef(null);

  // El brillo sigue al cursor sin provocar re-renders.
  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <Reveal className={`value-card-wrap value-card-wrap--${index + 1}`} delay={index * 80}>
      <article className="value-card" ref={cardRef} onPointerMove={handlePointerMove}>
        <div className="value-card__top">
          <span className="value-card__icon">
            <Icon name={value.icon} size={25} />
          </span>
          <span className="value-card__number">{value.number}</span>
        </div>
        <h3>{value.title}</h3>
        <p>{value.text}</p>
        <span className="value-card__line" aria-hidden="true" />
        <span className="value-card__glow" aria-hidden="true" />
      </article>
    </Reveal>
  );
}

export default function Values() {
  return (
    <section className="section values" id="valores" aria-labelledby="values-title">
      <div className="values__aura" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          id="values-title"
          eyebrow="Lo que nos sostiene"
          title={
            <>
              Cinco valores.
              <br />
              Una forma de tratar a las personas.
            </>
          }
          description="No están en una pared para decorar. Están en el diagnóstico que explicamos, en el precio que cotizamos y en la forma en que devolvemos cada equipo."
          tone="light"
        />

        <div className="values__grid">
          {VALUES.map((value, index) => (
            <ValueCard key={value.id} value={value} index={index} />
          ))}
        </div>

        <Reveal className="values__quote" delay={180}>
          <Icon name="sparkles" size={20} />
          <p>
            La tecnología cambia. La manera de tratar a alguien, también debería.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
