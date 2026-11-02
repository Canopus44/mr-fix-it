/**
 * Marca Mr. Fix-it.
 *
 * El símbolo está construido con dos celulares y un destornillador:
 * - El cuerpo hereda currentColor para funcionar sobre fondos claros u oscuros.
 * - Las pantallas usan --logo-screen para conservar el contraste sin imágenes.
 * - El teléfono inclinado lleva un contorno del color del fondo para separar
 *   las siluetas cuando se superponen.
 */
export function LogoMark({ className = '' }) {
  return (
    <svg
      className={`logo__mark ${className}`.trim()}
      viewBox="0 0 98 64"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {/* Celular vertical */}
        <rect x="1.5" y="2" width="28" height="56" rx="6" />
        <rect className="logo__screen" x="5.4" y="8.4" width="20.2" height="37.4" rx="2.4" />
        <rect className="logo__screen" x="10.3" y="4.6" width="10.4" height="1.6" rx="0.8" />
        <circle className="logo__screen" cx="15.5" cy="52" r="2.1" />

        {/* Celular inclinado */}
        <g transform="rotate(68 50 39)">
          <rect
            className="logo__outline"
            x="36.5"
            y="14.8"
            width="27"
            height="49"
            rx="5.6"
          />
          <rect className="logo__screen" x="40.2" y="21.6" width="19.6" height="34" rx="2.3" />
          <rect className="logo__screen" x="45.9" y="17.9" width="8.2" height="1.5" rx="0.75" />
          <circle className="logo__screen" cx="50" cy="58.9" r="2" />
        </g>

        {/* Destornillador */}
        <g transform="translate(72 2) rotate(-20)">
          <path d="M-1.8 0H1.8L2.4 7H-2.4Z" />
          <rect x="-1.7" y="6" width="3.4" height="19" rx="1" />
          <rect x="-3.4" y="23.4" width="6.8" height="3.8" rx="1.4" />
          <rect x="-5.6" y="26.2" width="11.2" height="22.5" rx="5.6" />
          <rect className="logo__screen" x="-1.15" y="32.2" width="2.3" height="9.5" rx="1.15" />
        </g>
      </g>
    </svg>
  );
}

/**
 * variant: 'onLight' (por defecto) | 'onDark'
 * layout:  'horizontal' (navbar) | 'stacked' (footer)
 */
export default function Logo({
  variant = 'onLight',
  layout = 'horizontal',
  showTagline = false,
  className = '',
}) {
  return (
    <span
      className={`logo logo--${variant} logo--${layout} ${className}`.trim()}
      data-brand="mr-fix-it"
    >
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
