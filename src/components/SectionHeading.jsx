import Reveal from './Reveal.jsx';

/** Cabecera editorial reutilizable para todas las secciones. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className = '',
  id,
}) {
  return (
    <div className={`section-heading section-heading--${align} section-heading--${tone} ${className}`.trim()}>
      {eyebrow && (
        <Reveal as="p" className="eyebrow" delay={20}>
          <span className="eyebrow__dot" aria-hidden="true" />
          {eyebrow}
        </Reveal>
      )}
      <Reveal as="h2" className="section-title" delay={80} id={id}>
        {title}
      </Reveal>
      {description && (
        <Reveal as="p" className="section-copy" delay={140}>
          {description}
        </Reveal>
      )}
    </div>
  );
}
