import { useEffect, useRef } from 'react';
import { HERO } from '../data/companyData.js';
import { useMouseTilt } from '../hooks/useMouseTilt.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';
import MagneticButton from './MagneticButton.jsx';
import Icon from './Icon.jsx';

function DiagnosticPhone() {
  const { ref, tiltProps } = useMouseTilt({ max: 7.5, scale: 1.02 });
  const { phone } = HERO;

  return (
    <div className="hero__stage" aria-label="Vista previa del diagnóstico de un celular">
      <div className="hero__orbit hero__orbit--one" aria-hidden="true" />
      <div className="hero__orbit hero__orbit--two" aria-hidden="true" />

      <div className="hero__phone-float">
        <div className="hero__phone-tilt" ref={ref} {...tiltProps}>
          <div className="phone" role="img" aria-label="Celular mostrando un diagnóstico técnico en curso">
            <div className="phone__frame">
              <div className="phone__notch" aria-hidden="true" />
              <div className="phone__screen">
                <div className="phone__status">
                  <span>9:41</span>
                  <span className="phone__status-icons" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>

                <div className="phone__appbar">
                  <span className="phone__app-icon">M</span>
                  <span>
                    <strong>Mr. Fix-it</strong>
                    <small>{phone.device}</small>
                  </span>
                  <span className="phone__live-dot" aria-hidden="true" />
                </div>

                <div className="phone__diagnosis">
                  <span className="phone__status-line">
                    <span className="phone__pulse" aria-hidden="true" />
                    {phone.status}
                  </span>
                  <p className="phone__diagnosis-title">Todo bajo control.</p>
                  <p>Revisamos hardware, software y batería antes de intervenir.</p>

                  <div className="phone__scan" aria-hidden="true">
                    <span className="phone__scan-line" />
                    <div className="phone__scan-grid" />
                    <Icon name="phone" size={54} strokeWidth={1.2} />
                  </div>

                  <div className="phone__chips">
                    {phone.chips.map((chip) => (
                      <span key={chip.label} className={`phone-chip phone-chip--${chip.tone}`}>
                        <span>{chip.label}</span>
                        <strong>{chip.value}</strong>
                      </span>
                    ))}
                  </div>

                  <div className="phone__progress">
                    <div className="phone__progress-head">
                      <span>{phone.progressLabel}</span>
                      <strong>{phone.progress}%</strong>
                    </div>
                    <div className="phone__progress-track">
                      <span style={{ width: `${phone.progress}%` }} />
                    </div>
                  </div>

                  <div className="phone__verdict">
                    <span className="phone__verdict-icon">
                      <Icon name="alert" size={15} />
                    </span>
                    <span>
                      <strong>Cámara: revisión requerida</strong>
                      <small>Te explicaremos el diagnóstico antes de reparar.</small>
                    </span>
                  </div>
                </div>

                <div className="phone__home" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="hero-float-card hero-float-card--top">
            <span className="hero-float-card__icon">
              <Icon name="check-circle" size={18} />
            </span>
            <span>
              <strong>Diagnóstico claro</strong>
              <small>Sin sorpresas</small>
            </span>
          </div>

          <div className="hero-float-card hero-float-card--bottom">
            <span className="hero-float-card__icon hero-float-card__icon--red">
              <Icon name="shield" size={18} />
            </span>
            <span>
              <strong>90 días de garantía</strong>
              <small>Respaldo real</small>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const frame = useRef(0);

  // Resplandor que sigue al cursor + parallax suave al hacer scroll.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const onPointerMove = (event) => {
      if (reducedMotion || event.pointerType === 'touch') return;
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mx', `${x}%`);
      hero.style.setProperty('--my', `${y}%`);
    };

    const onScroll = () => {
      if (reducedMotion) return;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${(y * 0.06).toFixed(1)}px, 0)`;
        }
        if (visualRef.current) {
          visualRef.current.style.transform = `translate3d(0, ${(y * 0.11).toFixed(1)}px, 0)`;
        }
      });
    };

    hero.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      hero.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame.current);
    };
  }, [reducedMotion]);

  return (
    <section className="hero" id="inicio" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero__noise" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__blob hero__blob--red" aria-hidden="true" />
      <div className="hero__blob hero__blob--blue" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content" ref={contentRef}>
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            {HERO.eyebrow}
          </p>

          <h1 className="hero__title" id="hero-title">
            {HERO.titleLines.map((line, index) => (
              <span
                className={`hero__title-line ${index === HERO.titleLines.length - 1 ? 'is-accent' : ''}`}
                key={line}
                style={{ '--line-index': index }}
              >
                <span>
                  {index === HERO.titleLines.length - 1 ? (
                    <>
                      {line.slice(0, -1)}
                      <span className="hero__dot">.</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero__description">{HERO.description}</p>

          <div className="hero__actions">
            <MagneticButton className="btn btn--primary btn--lg" href={HERO.primaryCta.href}>
              {HERO.primaryCta.label}
              <Icon name="arrow-right" size={18} />
            </MagneticButton>
            <MagneticButton className="btn btn--ghost btn--lg" href={HERO.secondaryCta.href}>
              {HERO.secondaryCta.label}
            </MagneticButton>
          </div>

          <ul className="hero__proof" aria-label="Datos de confianza">
            {HERO.proof.map((item) => (
              <li key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual" ref={visualRef}>
          <DiagnosticPhone />
        </div>
      </div>

      <a className="hero__scroll" href="#metricas" aria-label="Desliza para conocer más">
        <span className="hero__scroll-line" aria-hidden="true" />
        <span>Desliza</span>
      </a>
    </section>
  );
}
