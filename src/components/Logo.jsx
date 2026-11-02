/**
 * Marca Mr. Fix-it: dos celulares y un destornillador.
 * El icono hereda currentColor para adaptarse a fondos claros u oscuros.
 */
export function LogoMark({ className = '' }) {
  return (
    <svg
      className={`logo__mark ${className}`.trim()}
      viewBox="0 0 58 52"
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="7" width="19" height="35" rx="5" />
        <path d="M11.5 11.5h8M15.5 37.5h.01" />
        <rect x="27.5" y="12" width="18" height="31" rx="4.5" transform="rotate(15 36.5 27.5)" />
        <path d="M33 16.5h8" transform="rotate(15 37 16.5)" />
        <path d="M42.5 5.5 48 11l-4.7 4.8-5.5-5.5 4.7-4.8Z" fill="currentColor" stroke="none" />
        <path d="M38.5 14.5 24 29l-1.6 5.6 5.6-1.6L42.5 18.5" />
      </g>
    </svg>
  );
}

/**
 * variant: 'onLight' (por defecto) | 'onDark'
 */
export default function Logo({ variant = 'onLight', showTagline = false, className = '' }) {
  return (
    <span className={`logo logo--${variant} ${className}`.trim()}>
      <span className="logo__icon-wrap">
        <LogoMark />
      </span>
      <span className="logo__text">
        <span className="logo__wordmark">
          <span className="logo__mr">Mr.</span>
          <span className="logo__fix">FIX</span>
          <span className="logo__it">-IT.</span>
        </span>
        {showTagline && <span className="logo__tagline">Tecnología en buenas manos</span>}
      </span>
    </span>
  );
}
