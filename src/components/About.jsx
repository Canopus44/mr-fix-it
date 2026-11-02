import { PURPOSE, STORY } from '../data/companyData.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import { LogoMark } from './Logo.jsx';
import Icon from './Icon.jsx';

export default function About() {
  return (
    <section className="section about" id="nosotros" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          id="about-title"
          eyebrow="Nosotros · Nuestra historia"
          title={
            <>
              Un sueño construido
              <br />
              en tiempos difíciles.
            </>
          }
          description="No nacimos de una franquicia ni de un plan perfecto. Nacimos de una decisión valiente, de un socio que creyó y de un taller que aprendió a ganarse la confianza."
        />

        <div className="about__story">
          <div className="about__timeline" aria-label="Línea de tiempo de Mr. Fix-it">
            <span className="about__timeline-line" aria-hidden="true" />
            {STORY.map((item, index) => (
              <Reveal
                as="article"
                className="timeline-item"
                key={item.id}
                delay={index * 80}
              >
                <span className="timeline-item__dot" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="timeline-item__body">
                  <p className="timeline-item__kicker">{item.kicker}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal as="aside" className="about__manifesto" delay={140}>
            <div className="about__manifesto-top">
              <span className="about__manifesto-mark">
                <LogoMark />
              </span>
              <span className="about__manifesto-pill">Hecho en Medellín</span>
            </div>
            <blockquote>
              “La confianza no se promete:
              <br />
              se repara, pieza por pieza.”
            </blockquote>
            <div className="about__manifesto-bottom">
              <span className="about__manifesto-signature">Mr. Fix-it</span>
              <span className="about__manifesto-meta">
                Servicio técnico
                <br />
                desde el corazón del taller
              </span>
            </div>
            <div className="about__manifesto-glow" aria-hidden="true" />
          </Reveal>
        </div>

        <div className="about__purpose" aria-label="Objetivo general y objetivos específicos">
          <Reveal as="article" className="bento bento--objective" delay={40}>
            <div className="bento__icon">
              <Icon name="compass" size={22} />
            </div>
            <p className="bento__label">Objetivo general</p>
            <h3>Soluciones seguras, eficientes y sostenibles.</h3>
            <p>{PURPOSE.objective}</p>
          </Reveal>

          <Reveal as="article" className="bento bento--specific" delay={120}>
            <p className="bento__label">Objetivos específicos</p>
            <ul className="bento__list">
              {PURPOSE.specific.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
