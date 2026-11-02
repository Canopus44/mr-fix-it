/**
 * Iconografía propia, sin librerías ni imágenes externas.
 * Todos los iconos heredan currentColor.
 */
export default function Icon({ name, size = 24, strokeWidth = 1.8, className = '', ...rest }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: `icon ${className}`.trim(),
    'aria-hidden': true,
    focusable: false,
    ...rest,
  };

  switch (name) {
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3 4.8 5.7v5.5c0 4.4 2.9 8.2 7.2 9.5 4.3-1.3 7.2-5.1 7.2-9.5V5.7L12 3Z" />
          <path d="m8.7 12 2.2 2.2 4.5-4.7" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg {...common}>
          <path d="m12 3 1.5 4.4L18 9l-4.5 1.6L12 15l-1.5-4.4L6 9l4.5-1.6L12 3Z" />
          <path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
          <path d="m5 14 .6 1.7 1.9.7-1.9.6L5 19l-.6-2L2.5 16.4l1.9-.7L5 14Z" />
        </svg>
      );
    case 'bolt':
      return (
        <svg {...common}>
          <path d="M13.2 2.5 4.8 13h6l-.9 8.5L18.4 11h-6l.8-8.5Z" />
        </svg>
      );
    case 'lifebuoy':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.6" />
          <path d="m5.6 5.6 3.8 3.8M14.6 14.6l3.8 3.8M18.4 5.6l-3.8 3.8M9.4 14.6l-3.8 3.8" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...common}>
          <path d="M20.8 8.6c0 5.1-8.8 10.1-8.8 10.1S3.2 13.7 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z" />
        </svg>
      );
    case 'plug':
      return (
        <svg {...common}>
          <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8Z" />
          <path d="M12 17v4" />
        </svg>
      );
    case 'bag':
      return (
        <svg {...common}>
          <path d="M5 8h14l-1 12H6L5 8Z" />
          <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
        </svg>
      );
    case 'chat':
      return (
        <svg {...common}>
          <path d="M20 11.5a7.5 7.5 0 0 1-10.8 6.8L4 20l1.4-4.8A7.5 7.5 0 1 1 20 11.5Z" />
          <path d="M8.5 10.5h7M8.5 13.5h4.5" />
        </svg>
      );
    case 'gift':
      return (
        <svg {...common}>
          <path d="M4 10h16v10H4V10ZM3 7h18v3H3V7ZM12 7v13" />
          <path d="M12 7H8.4a2.2 2.2 0 1 1 0-4.4C11 2.6 12 7 12 7Zm0 0h3.6a2.2 2.2 0 1 0 0-4.4C13 2.6 12 7 12 7Z" />
        </svg>
      );
    case 'game':
      return (
        <svg {...common}>
          <path d="M7 8h10a5 5 0 0 1 4.7 6.8l-1 2.8a2.6 2.6 0 0 1-4.3 1L14 16h-4l-2.4 2.6a2.6 2.6 0 0 1-4.3-1l-1-2.8A5 5 0 0 1 7 8Z" />
          <path d="M8 11v4M6 13h4M16.5 12h.01M18 14h.01" />
        </svg>
      );
    case 'smile':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 14.4a4.3 4.3 0 0 0 7 0M9 9.5h.01M15 9.5h.01" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...common}>
          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="2.8" />
        </svg>
      );
    case 'users':
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3.5 20v-1.5A5.5 5.5 0 0 1 9 13h1a5.5 5.5 0 0 1 5.5 5.5V20" />
          <path d="M16 5.2a3.2 3.2 0 0 1 0 6M17 13.4a5.5 5.5 0 0 1 3.5 5.1V20" />
        </svg>
      );
    case 'compass':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
        </svg>
      );
    case 'layers':
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
        </svg>
      );
    case 'hand':
      return (
        <svg {...common}>
          <path d="M7.2 12V5.5a1.7 1.7 0 0 1 3.4 0V11M10.6 10.8V4.2a1.7 1.7 0 0 1 3.4 0v6.6M14 10.9V5.6a1.7 1.7 0 1 1 3.4 0V13" />
          <path d="M17.4 10.2a1.7 1.7 0 0 1 3.4 0v3.1c0 4.3-2.8 7.7-7 7.7h-.8a6.2 6.2 0 0 1-4.4-1.8L5 15.6a1.8 1.8 0 0 1 2.5-2.6l2 1.9" />
        </svg>
      );
    case 'quote':
      return (
        <svg {...common}>
          <path d="M9.5 6.5H5.7A1.7 1.7 0 0 0 4 8.2v4.1a1.7 1.7 0 0 0 1.7 1.7h2.1a1.7 1.7 0 0 1 1.7 1.7v.6A2.2 2.2 0 0 1 7.3 18.5" />
          <path d="M19.5 6.5h-3.8A1.7 1.7 0 0 0 14 8.2v4.1a1.7 1.7 0 0 0 1.7 1.7h2.1a1.7 1.7 0 0 1 1.7 1.7v.6a2.2 2.2 0 0 1-2.2 2.2" />
        </svg>
      );
    case 'search':
      return (
        <svg {...common}>
          <circle cx="10.8" cy="10.8" r="6.3" />
          <path d="m15.4 15.4 4.3 4.3" />
        </svg>
      );
    case 'door':
      return (
        <svg {...common}>
          <path d="M5 21V4.5L15 3v18M5 21h14M15 21h4V8.5" />
          <path d="M11.5 12.5h.01" />
        </svg>
      );
    case 'book':
      return (
        <svg {...common}>
          <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z" />
          <path d="M4 19a2.5 2.5 0 0 1 2.5-2H20M8 6h8M8 9h5" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...common}>
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2.5" />
          <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12h18M10 12v2h4v-2" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <path d="m4.5 12.5 4.7 4.7L19.5 6.8" />
        </svg>
      );
    case 'check-circle':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12.2 2.7 2.7 5.5-5.8" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...common}>
          <path d="M4 12h16M14 6l6 6-6 6" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg {...common}>
          <path d="M20 12H4M10 6l-6 6 6 6" />
        </svg>
      );
    case 'arrow-up-right':
      return (
        <svg {...common}>
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      );
    case 'download':
      return (
        <svg {...common}>
          <path d="M12 3v12M7 10l5 5 5-5M4 20h16" />
        </svg>
      );
    case 'print':
      return (
        <svg {...common}>
          <path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <path d="M7 14h10v7H7v-7Z" />
        </svg>
      );
    case 'reset':
      return (
        <svg {...common}>
          <path d="M4 5v5h5" />
          <path d="M5.5 10a7.5 7.5 0 1 1-.2 4.5" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'minus':
      return (
        <svg {...common}>
          <path d="M5 12h14" />
        </svg>
      );
    case 'close':
      return (
        <svg {...common}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case 'star':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3-5.7-3-5.7 3 1.1-6.3L2.8 9.5l6.4-.9L12 2.8Z" />
        </svg>
      );
    case 'battery':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="16" height="10" rx="2.5" />
          <path d="M21 10v4M7 10v4M11 10v4" />
        </svg>
      );
    case 'alert':
      return (
        <svg {...common}>
          <path d="M12 3 2.8 20h18.4L12 3Z" />
          <path d="M12 9v5M12 17.4h.01" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg {...common}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case 'target':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2.5" />
          <path d="M7 3v4M17 3v4M3 10h18" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4.5V3h6v1.5M9 9h6M9 13h6M9 17h4" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...common}>
          <rect x="7" y="2.5" width="10" height="19" rx="3" />
          <path d="M10.5 5h3M11 18.5h2" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...common}>
          <path d="M20 10c0 5.3-8 11-8 11S4 15.3 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.7" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case 'trash':
      return (
        <svg {...common}>
          <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
