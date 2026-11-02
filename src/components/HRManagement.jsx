import { useRef, useState } from 'react';
import { HR_PRINCIPLES, HR_PROCESSES } from '../data/hrData.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icon.jsx';

export default function HRManagement() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const active = HR_PROCESSES[activeIndex];

  const selectTab = (index) => {
    setActiveIndex(index);
  };

  const handleTabKeyDown = (event, index) => {
    let nextIndex = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      nextIndex = (index + 1) % HR_PROCESSES.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      nextIndex = (index - 1 + HR_PROCESSES.length) % HR_PROCESSES.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = HR_PROCESSES.length - 1;
    } else {
      return;
    }
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      className="section hr"
      id="gestion-humana"
      aria-labelledby="hr-title"
    >
      <div className="container">
        <SectionHeading
          id="hr-title"
          eyebrow="Gestión humana · El equipo detrás del taller"
          title={
            <>
              Cuidar a las personas
              <br />
              también es servicio técnico.
            </>
          }
          description="Seis procesos para que cada persona llegue, aprenda, crezca y se quede por las razones correctas. Sin discursos: con prácticas concretas."
        />

        <div className="hr__layout">
          <Reveal className="hr__tabs-wrap" delay={60}>
            <div
              className="hr__tabs"
              role="tablist"
              aria-label="Procesos de gestión humana"
              aria-orientation="vertical"
            >
              {HR_PROCESSES.map((process, index) => (
                <button
                  className={`hr-tab ${activeIndex === index ? 'is-active' : ''}`}
                  key={process.id}
                  type="button"
                  role="tab"
                  id={`hr-tab-${process.id}`}
                  aria-selected={activeIndex === index}
                  aria-controls={`hr-panel-${process.id}`}
                  tabIndex={activeIndex === index ? 0 : -1}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  onClick={() => selectTab(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  <span className="hr-tab__icon">
                    <Icon name={process.icon} size={20} />
                  </span>
                  <span className="hr-tab__label">{process.label}</span>
                  <span className="hr-tab__number">0{index + 1}</span>
                </button>
              ))}
            </div>

            <div className="hr__principles">
              <p>Principios que se practican</p>
              <ul>
                {HR_PRINCIPLES.map((principle) => (
                  <li key={principle}>{principle}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="hr__panel-wrap" delay={130}>
            <div
              className="hr-panel"
              key={active.id}
              role="tabpanel"
              id={`hr-panel-${active.id}`}
              aria-labelledby={`hr-tab-${active.id}`}
              tabIndex={0}
            >
              <div className="hr-panel__top">
                <span className="hr-panel__icon">
                  <Icon name={active.icon} size={30} />
                </span>
                <div className="hr-panel__index">
                  <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                  <small>/ 06</small>
                </div>
              </div>

              <p className="hr-panel__eyebrow">{active.eyebrow}</p>
              <h3>{active.title}</h3>
              <p className="hr-panel__description">{active.description}</p>

              <ul className="hr-panel__points">
                {active.points.map((point, index) => (
                  <li key={point}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{point}</p>
                  </li>
                ))}
              </ul>

              <div className="hr-panel__footer">
                <span className="hr-panel__owner-label">Responsable</span>
                <strong>{active.owner}</strong>
              </div>

              <div className="hr-panel__glow" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
