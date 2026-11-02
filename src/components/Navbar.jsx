import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '../data/companyData.js';
import Logo from './Logo.jsx';
import Icon from './Icon.jsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const lastScroll = useRef(0);
  const ticking = useRef(false);

  // Navbar que se esconde al bajar y reaparece al subir.
  useEffect(() => {
    lastScroll.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        setScrolled(current > 24);
        if (!menuOpen) {
          setHidden(current > 220 && current > lastScroll.current + 4);
        }
        lastScroll.current = current;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  // Enlace activo según la sección que cruza el centro del viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-42% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Bloqueo de scroll y cierre con Escape mientras el menú móvil está abierto.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <nav className="navbar__inner" aria-label="Navegación principal">
        <a className="navbar__brand" href="#inicio">
          <Logo />
          <span className="visually-hidden">Ir al inicio</span>
        </a>

        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                className={`navbar__link ${activeId === link.href ? 'is-active' : ''}`}
                href={link.href}
                aria-current={activeId === link.href ? 'true' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a className="btn btn--primary btn--sm navbar__cta" href="#contacto">
          Agendar diagnóstico
          <Icon name="arrow-up-right" size={16} />
        </a>

        <button
          className={`navbar__burger ${menuOpen ? 'is-open' : ''}`}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span />
          <span />
        </button>
      </nav>

      <div
        id="menu-movil"
        className={`navbar__mobile ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? '' : undefined}
      >
        <div className="navbar__mobile-inner">
          <p className="navbar__mobile-eyebrow">Explora Mr. Fix-it</p>
          <ul>
            {NAV_LINKS.map((link, index) => (
              <li key={link.href} style={{ '--menu-index': index }}>
                <a href={link.href} onClick={closeMenu}>
                  <span>{link.label}</span>
                  <Icon name="arrow-up-right" size={20} />
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--primary navbar__mobile-cta" href="#contacto" onClick={closeMenu}>
            Agendar diagnóstico
            <Icon name="arrow-right" size={18} />
          </a>
          <p className="navbar__mobile-note">Medellín, Colombia · Lun a sáb, 9:00–18:00</p>
        </div>
      </div>
    </header>
  );
}
