import {
  DRESS_CODE,
  FINANCE_CONTROL,
  RESOURCE_LINKS,
} from '../data/resourcesData.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icon.jsx';

function BulletList({ items }) {
  return (
    <ul className="manual-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function DressCodeContent() {
  return (
    <div className="manual-details__body">
      <section className="manual-section">
        <p className="manual-section__eyebrow">01 · Propósito</p>
        <h4>Objetivo</h4>
        <p className="manual-section__copy">{DRESS_CODE.objective}</p>
        <p className="manual-section__note">{DRESS_CODE.objectiveNote}</p>
      </section>

      {DRESS_CODE.sections.map((section, index) => (
        <section className="manual-section" key={section.id}>
          <p className="manual-section__eyebrow">
            {String(index + 2).padStart(2, '0')} · {section.label}
          </p>
          <h4>{section.title}</h4>

          {section.groups && (
            <div className="manual-groups">
              {section.groups.map((group) => (
                <div className="manual-group" key={group.label}>
                  <h5>{group.label}</h5>
                  <BulletList items={group.items} />
                </div>
              ))}
            </div>
          )}

          {section.items && <BulletList items={section.items} />}

          {section.note && <p className="manual-section__note">{section.note}</p>}

          {section.steps && (
            <ol className="manual-steps">
              {section.steps.map((step) => (
                <li key={step.number}>
                  <span className="manual-steps__number">{step.number}</span>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}
    </div>
  );
}

function FinanceContent() {
  return (
    <div className="manual-details__body">
      {FINANCE_CONTROL.sections.map((section, index) => (
        <section className="manual-section" key={section.id}>
          <p className="manual-section__eyebrow">
            {String(index + 1).padStart(2, '0')} · {section.label}
          </p>
          <h4>{section.title}</h4>
          <BulletList items={section.items} />
          {section.note && <p className="manual-section__note">{section.note}</p>}
        </section>
      ))}
    </div>
  );
}

function ManualCard({ tone, icon, badge, title, subtitle, pages, tags, href, cta, children }) {
  return (
    <Reveal
      as="article"
      className={`manual-card manual-card--${tone}`}
      delay={tone === 'dress' ? 50 : 130}
    >
      <div className="manual-card__top">
        <span className="manual-card__icon">
          <Icon name={icon} size={22} />
        </span>
        <span className="manual-card__badge">{badge}</span>
      </div>

      <h3>{title}</h3>
      <p className="manual-card__subtitle">{subtitle}</p>

      <ul className="manual-card__tags" aria-label="Contenido del recurso">
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <div className="manual-card__actions">
        <a
          className={`btn ${tone === 'dress' ? 'btn--primary' : 'btn--ghost'} btn--md`}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
        >
          {cta}
          <Icon name="arrow-up-right" size={17} />
          <span className="visually-hidden">(se abre en una nueva pestaña)</span>
        </a>
        <span className="manual-card__pages">{pages}</span>
      </div>

      <details className="manual-details">
        <summary>
          <span>
            {tone === 'dress' ? 'Ver contenido del manual' : 'Ver resumen de la presentación'}
          </span>
          <Icon name="chevron-down" size={18} />
        </summary>
        {children}
      </details>

      <p className="manual-card__source">
        <Icon name="shield" size={14} />
        Resumen del material oficial compartido en Canva.
      </p>
    </Reveal>
  );
}

export default function Manuals() {
  return (
    <section className="section manuals" id="manuales" aria-labelledby="manuals-title">
      <div className="manuals__aura" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          id="manuals-title"
          eyebrow="Recursos · Equipo Mr. Fix-it"
          title={
            <>
              Manuales
              <br />y protocolos.
            </>
          }
          description="Dos documentos de consulta para cuidar la imagen del equipo y entender cómo se sostienen las áreas del taller. Puedes leer el resumen aquí o abrir la versión original en Canva."
        />

        <div className="manuals__grid">
          <ManualCard
            tone="dress"
            icon="book"
            badge="Manual interno"
            title={DRESS_CODE.title}
            subtitle={DRESS_CODE.subtitle}
            pages={DRESS_CODE.pages}
            tags={DRESS_CODE.tags}
            href={RESOURCE_LINKS.dressCode}
            cta="Abrir manual en Canva"
          >
            <DressCodeContent />
          </ManualCard>

          <ManualCard
            tone="finance"
            icon="chart"
            badge="Presentación institucional"
            title={FINANCE_CONTROL.title}
            subtitle={FINANCE_CONTROL.subtitle}
            pages={FINANCE_CONTROL.pages}
            tags={FINANCE_CONTROL.tags}
            href={RESOURCE_LINKS.financeControl}
            cta="Abrir presentación en Canva"
          >
            <FinanceContent />
          </ManualCard>
        </div>
      </div>
    </section>
  );
}
