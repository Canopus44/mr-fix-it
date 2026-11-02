# Mr. Fix-it — Landing page

Landing page de **Mr. Fix-it**, servicio técnico de celulares en Medellín, Colombia. Construida con React 18 + Vite, JavaScript (JSX) y CSS puro, con una dirección visual inspirada en Apple: espacio negativo, tipografía grande, glassmorphism, movimiento sutil y foco real en el contenido.

**Sitio publicado:** [https://canopus44.github.io/mr-fix-it/](https://canopus44.github.io/mr-fix-it/)

---

## Lo que incluye

- Hero a pantalla completa con teléfono en CSS/SVG, diagnóstico simulado, parallax y tilt 3D.
- Contadores animados, reveal on scroll, navbar glass que se oculta al bajar y menú móvil.
- Historia narrativa, sección propia de **Misión y visión** con el texto oficial y objetivos en un bento grid.
- Valores y estrategias con tarjetas interactivas y programa de fidelización jugable.
- Organigrama construido con código: datos en árbol, conectores SVG animados con `stroke-dasharray`, ramas colapsables, navegación por teclado y `role="tree"`.
- Gestión humana con seis procesos en tabs accesibles.
- Cultura FISH con tarjetas flip 3D y responsables por acción.
- Mapa radial de inteligencias del equipo.
- **Evaluación 270°** completa: wizard de 8 pasos, 25 preguntas, preguntas abiertas, plan de mejoramiento, cálculo ponderado, consolidación de tres fuentes, comparativo por competencia, brecha de percepción, descarga `.txt`, impresión/PDF y reinicio.

Todo el estado de la evaluación vive **solo en memoria**. No se usa `localStorage`, `sessionStorage` ni se envían respuestas a un servidor.

---

## Ejecutar en local

Requiere Node.js 18 o superior.

```bash
npm install
npm run dev
```

La app queda disponible en la URL que imprime Vite (por el `base`, normalmente `http://localhost:5173/mr-fix-it/`).

Para revisar el build de producción:

```bash
npm run build
npm run preview
```

---

## Estructura

```text
mr-fix-it/
├── .github/workflows/deploy.yml   # Publicación automática en GitHub Pages
├── public/
│   ├── favicon.svg
│   ├── og-cover.svg
│   └── og-cover.png               # Imagen Open Graph
├── src/
│   ├── components/
│   │   ├── evaluation/            # Wizard, resultados, radar y consolidación
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Metrics.jsx
│   │   ├── About.jsx
│   │   ├── MissionVision.jsx
│   │   ├── Values.jsx
│   │   ├── Strategies.jsx
│   │   ├── OrgChart.jsx
│   │   ├── HRManagement.jsx
│   │   ├── FishCulture.jsx
│   │   ├── Intelligences.jsx
│   │   ├── Evaluation270.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   ├── companyData.js         # Historia, valores, estrategias, FISH, contacto
│   │   ├── orgData.js             # Árbol del organigrama y funciones
│   │   ├── hrData.js              # Seis procesos de gestión humana
│   │   └── evaluationData.js      # Preguntas, escala, tipos y pesos
│   ├── hooks/
│   │   ├── useInView.js
│   │   ├── useCounter.js
│   │   ├── useMouseTilt.js
│   │   └── usePrefersReducedMotion.js
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── animations.css
│   │   ├── components.css
│   │   ├── sections.css
│   │   ├── org.css
│   │   ├── evaluation.css
│   │   └── print.css
│   ├── utils/
│   │   ├── evaluation.js          # Promedios, niveles, consolidación 270°
│   │   └── exportSummary.js       # Resumen descargable con Blob
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## Personalización rápida

### 1. Colores y tipografía

Los tokens están en `src/styles/tokens.css`:

```css
:root {
  --red: #e5202e;
  --black: #0a0a0b;
  --ink: #1d1d1f;
  --gray: #86868b;
  --gray-light: #f5f5f7;
  --blue: #0a84ff;
  --white: #ffffff;
}
```

Cambia esos valores y todo el sistema visual se actualiza. La tipografía es **Inter** desde Google Fonts, con fallback a `-apple-system`, `SF Pro Display` y `Segoe UI`.

### 2. Logo

Está dibujado en SVG en `src/components/Logo.jsx`. El componente `LogoMark` contiene los dos celulares y el destornillador. Los colores del texto se controlan con `.logo__mr`, `.logo__fix` y `.logo__it` en `src/styles/components.css`.

### 3. Organigrama

Edita `src/data/orgData.js`. Cada nodo tiene:

```js
{
  id: 'tecnicos',
  name: 'Coordinación de técnicos',
  role: 'Coordinador de técnicos',
  level: 'coordinator', // director | coordinator | assistant
  initials: 'CT',
  functions: ['...', '...'],
  children: [/* nodos hijos */]
}
```

- Los niveles y sus colores se definen en `ORG_LEVELS`.
- El árbol se renderiza recursivamente en `src/components/OrgChart.jsx`.
- Los conectores se recalculan con la geometría real de las tarjetas y se dibujan con SVG.
- Si agregas niveles nuevos, ajusta `aria-level` y los estilos de `.org-node--...` si quieres un acento distinto.

### 4. Preguntas y ponderaciones de la evaluación

Todo está en `src/data/evaluationData.js`:

- `COMPETENCIES`: cinco competencias y sus 25 preguntas.
- `OPEN_QUESTIONS`: preguntas abiertas.
- `EVALUATION_TYPES`: tarjetas de jefe, equipo y autoevaluación.
- `EVALUATION_WEIGHTS`: ponderaciones. Por defecto:

```js
export const EVALUATION_WEIGHTS = {
  jefe: 0.4,
  equipo: 0.4,
  auto: 0.2,
};
```

La suma debe ser `1`. La lógica de promedios, renormalización cuando falta una fuente, niveles de desempeño y brecha está en `src/utils/evaluation.js`. Si cambias los cortes de los niveles, actualiza también `PERFORMANCE_LEVELS` y `getPerformanceLevel()` para que coincidan sin solapamientos.

La evaluación se guarda únicamente en el estado de React de `src/components/Evaluation270.jsx`. Al recargar se pierde, por diseño.

### 5. Textos, contactos y redes

- Textos generales, historia, valores, FISH, inteligencias y contacto: `src/data/companyData.js`.
- Procesos de gestión humana: `src/data/hrData.js`.
- El correo `hola@mrfixit.co` y los enlaces sociales son valores de ejemplo. Actualízalos en `CONTACT` antes de publicar una versión comercial.

### 6. Imagen Open Graph

`public/og-cover.png` es la imagen que se comparte en redes. Si cambias el diseño, reemplázala manteniendo 1200 × 630 px y actualiza las rutas absolutas de `index.html` si cambia el dominio o el nombre del repositorio.

---

## Despliegue

### GitHub Pages (configurado)

El workflow `.github/workflows/deploy.yml` construye el sitio y lo publica con GitHub Actions en cada push a `main`.

1. En **Settings → Pages**, la fuente debe ser **GitHub Actions**.
2. El `base` de Vite debe coincidir con el nombre del repositorio:

```js
// vite.config.js
export default defineConfig({
  base: '/mr-fix-it/',
});
```

3. Si renombras el repositorio, actualiza también:
   - `base` en `vite.config.js`.
   - `link rel="canonical"`, `og:url`, `og:image` y `twitter:image` en `index.html`.

URL esperada: `https://canopus44.github.io/mr-fix-it/`.

### Vercel

1. Importa el repositorio en Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Si el proyecto no está en la raíz del repo, configura **Root Directory** como `mr-fix-it`.
6. En Vercel no necesitas el `base` de GitHub Pages. Puedes cambiarlo a `'/'` o hacerlo condicional:

```js
base: process.env.VERCEL ? '/' : '/mr-fix-it/',
```

### Netlify

1. Importa el repositorio.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Si el proyecto está dentro de `mr-fix-it/`, configura ese directorio como base.
5. Ajusta `base` de Vite a `'/'` para un dominio propio.

---

## Accesibilidad y rendimiento

- Navegación por teclado en el organigrama con flechas, `Home`, `End`, `Enter` y `Espacio`.
- Roles `tree` / `treeitem`, `aria-expanded`, `aria-selected` y foco visible.
- Wizard con `role="progressbar"`, `aria-live` para validaciones, labels asociados y foco visible.
- `prefers-reduced-motion` respetado: se eliminan parallax, flotaciones y transiciones largas.
- Contraste AA y jerarquía semántica revisados con Lighthouse (Accessibility 100, SEO 100 en la versión publicada).
- Sin imágenes externas: toda la gráfica es SVG inline, CSS y gradientes.

---

## Comandos

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción en dist/
npm run preview   # Sirve el build localmente
```

---

Hecho con cuidado en Medellín. **Tu celular, en buenas manos.**
