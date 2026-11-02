import { INDUCTION_DOC } from '../data/resourcesData.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icon.jsx';

const BASE = import.meta.env.BASE_URL;
const DOCX_URL = `${BASE}docs/${INDUCTION_DOC.docxFile}`;
const PDF_URL = `${BASE}docs/${INDUCTION_DOC.pdfFile}`;

export default function InductionDocument() {
  return (
    <section className="section induction" id="induccion" aria-labelledby="induction-title">
      <div className="induction__aura" aria-hidden="true" />
      <div className="container">
        <div className="induction__top">
          <SectionHeading
            id="induction-title"
            eyebrow="Formación · Documento oficial"
            title={
              <>
                Inducción
                <br />
                Mr. Fix-it.
              </>
            }
            description="Lee el documento completo directamente en la página: historia, cultura, seguridad y salud en el trabajo, políticas, recorrido por la empresa e inducción al cargo."
          />

          <div className="induction__actions">
            <div className="induction__meta">
              <span>
                <Icon name="book" size={16} />
                {INDUCTION_DOC.pages} páginas
              </span>
              <span>
                <Icon name="clipboard" size={16} />
                DOCX + PDF
              </span>
            </div>
            <a
              className="btn btn--primary btn--lg"
              href={DOCX_URL}
              download={INDUCTION_DOC.downloadName}
            >
              <Icon name="download" size={18} />
              Descargar inducción
            </a>
          </div>
        </div>

        <Reveal className="induction__reader" delay={70}>
          <div className="induction__reader-bar">
            <div className="induction__reader-title">
              <span className="induction__status-dot" aria-hidden="true" />
              <span>
                <strong>Documento de inducción</strong>
                <small>
                  {INDUCTION_DOC.docxFile} · {INDUCTION_DOC.pages} páginas
                </small>
              </span>
            </div>

            <div className="induction__reader-actions">
              <a href={PDF_URL} target="_blank" rel="noreferrer noopener">
                <Icon name="arrow-up-right" size={15} />
                Abrir PDF
              </a>
              <a href={DOCX_URL} download={INDUCTION_DOC.downloadName}>
                <Icon name="download" size={15} />
                DOCX
              </a>
            </div>
          </div>

          <div className="induction__frame">
            <iframe
              src={`${PDF_URL}#view=FitH`}
              title="Documento de inducción de Mr. Fix-it, 16 páginas"
              loading="lazy"
            />
          </div>

          <div className="induction__reader-foot">
            <p>
              <Icon name="shield" size={15} />
              El documento completo se muestra sin resúmenes. Si la vista integrada no carga en tu
              navegador, abre el PDF o descarga el archivo original.
            </p>
            <a href={PDF_URL} target="_blank" rel="noreferrer noopener">
              Ver PDF en pantalla completa
              <Icon name="arrow-up-right" size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
