import { CONTACT, NAV_LINKS } from '../data/companyData.js';
import Logo from './Logo.jsx';
import Icon from './Icon.jsx';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="contacto">
      <div className="footer__aura" aria-hidden="true" />
      <div className="container">
        <div className="footer__cta">
          <div>
            <p className="footer__eyebrow">Hablemos de tu equipo</p>
            <h2>
              Tu celular,
              <br />
              en buenas manos<span>.</span>
            </h2>
            <p>
              Cuéntanos qué está pasando. Te escuchamos, revisamos y te explicamos el siguiente paso
              antes de intervenir.
            </p>
            <a className="btn btn--primary btn--lg" href={`mailto:${CONTACT.email}`}>
              Agendar diagnóstico
              <Icon name="arrow-up-right" size={18} />
            </a>
          </div>

          <div className="footer__contact-card">
            <p className="footer__contact-title">Visítanos o escríbenos</p>
            <ul>
              <li>
                <span><Icon name="pin" size={18} /></span>
                <div>
                  <strong>Taller</strong>
                  <p>{CONTACT.city}</p>
                  <small>{CONTACT.address}</small>
                </div>
              </li>
              <li>
                <span><Icon name="mail" size={18} /></span>
                <div>
                  <strong>Correo</strong>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </div>
              </li>
              <li>
                <span><Icon name="clock" size={18} /></span>
                <div>
                  <strong>Horario</strong>
                  <p>{CONTACT.schedule}</p>
                </div>
              </li>
            </ul>
            <div className="footer__social">
              {CONTACT.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {social.label}
                  <Icon name="arrow-up-right" size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__main">
          <div className="footer__brand">
            <a href="#inicio">
              <Logo variant="onDark" showTagline />
              <span className="visually-hidden">Volver al inicio</span>
            </a>
            <p>
              Servicio técnico de celulares, mantenimiento, diagnóstico y accesorios tecnológicos en
              Medellín, Colombia.
            </p>
          </div>

          <nav className="footer__nav" aria-label="Enlaces del pie de página">
            <p className="footer__column-title">Explorar</p>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
              <li>
                <a href="#inicio">Inicio</a>
              </li>
            </ul>
          </nav>

          <div className="footer__promise">
            <p className="footer__column-title">Nuestra promesa</p>
            <p>
              Diagnóstico honesto.<br />
              Precio justo.<br />
              Garantía real.
            </p>
            <span className="footer__promise-mark">
              <Icon name="shield" size={20} />
              90 días de respaldo
            </span>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} Mr. Fix-it. Todos los derechos reservados.</p>
          <p>Hecho con cuidado en Medellín, Colombia.</p>
          <a href="#inicio" className="footer__back-top">
            Volver arriba
            <Icon name="arrow-up-right" size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
