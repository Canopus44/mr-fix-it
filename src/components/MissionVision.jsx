import { PURPOSE } from '../data/companyData.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icon.jsx';

export default function MissionVision() {
  return (
    <section
      className="section mission-vision"
      id="mision-vision"
      aria-labelledby="mission-vision-title"
    >
      <div className="mission-vision__aura" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          id="mission-vision-title"
          eyebrow="Propósito · En nuestras palabras"
          title={
            <>
              Misión
              <br />y visión.
            </>
          }
          description="Lo que hacemos hoy y el horizonte que perseguimos, con el texto oficial de Mr. Fix-it."
        />

        <div className="mission-vision__grid">
          <Reveal as="article" className="purpose-card purpose-card--mission" delay={40}>
            <div className="purpose-card__top">
              <span className="purpose-card__index">01 / 02</span>
              <span className="purpose-card__pill">
                <Icon name="check-circle" size={13} />
                Texto oficial
              </span>
            </div>

            <h3>Misión</h3>
            <blockquote className="purpose-card__text">
              <p>{PURPOSE.mission}</p>
            </blockquote>

            <div className="purpose-card__footer">
              <span className="purpose-card__icon">
                <Icon name="target" size={19} />
              </span>
              <span>
                <strong>Nuestro presente</strong>
                Lo que hacemos cada día, equipo por equipo.
              </span>
            </div>

            <span className="purpose-card__watermark" aria-hidden="true">
              M
            </span>
          </Reveal>

          <Reveal as="article" className="purpose-card purpose-card--vision" delay={130}>
            <div className="purpose-card__top">
              <span className="purpose-card__index">02 / 02</span>
              <span className="purpose-card__pill purpose-card__pill--blue">
                <Icon name="arrow-up-right" size={13} />
                Horizonte 2030
              </span>
            </div>

            <h3>Visión</h3>
            <blockquote className="purpose-card__text">
              <p>{PURPOSE.vision}</p>
            </blockquote>

            <div className="purpose-card__footer">
              <span className="purpose-card__icon">
                <Icon name="compass" size={19} />
              </span>
              <span>
                <strong>Hacia dónde vamos</strong>
                Crecer sin perder el cuidado que nos trajo hasta aquí.
              </span>
            </div>

            <span className="purpose-card__watermark" aria-hidden="true">
              2030
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
