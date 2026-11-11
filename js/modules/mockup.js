/* ==========================================================================
   js/modules/mockup.js
   Arma el mockup MONITOR + CELULAR en HTML/CSS y calcula cuánto tiene que
   "scrollear" cada captura (--dist) para mostrar la web completa.
   Lo usan: works.js (cards y modal) y showreel.js.
   ========================================================================== */
import { esc } from "./utils.js";

/* Código de relleno para las pantallas vacías ("Tu negocio puede estar acá") */
const EMPTY_CODE = `<span class="k">const</span> negocio = {
  nombre: "Tu negocio",
  zona: "zona sur",
  objetivo: "vender más",
};

<span class="k">function</span> lanzar(web) {
  web.whatsapp = <span class="k">true</span>;
  web.google = <span class="k">true</span>;
  <span class="k">return</span> crecer(web);
}

&lt;section class="hero"&gt;
  &lt;h1&gt;Tu marca&lt;/h1&gt;
  &lt;a href="wa.me"&gt;Pedí ya&lt;/a&gt;
&lt;/section&gt;

.cta {
  background: #FF6B2C;
  border-radius: 999px;
}
`;

/* Pantalla vacía (el código está duplicado para que el loop no tenga corte) */
function emptyScreen(small = false) {
  return `
    <div class="screen-empty" aria-hidden="true">
      <div class="screen-empty__code">${EMPTY_CODE}${EMPTY_CODE}</div>
      ${small ? "" : `<p class="screen-empty__text">Tu negocio puede estar acá<small>→ escribime</small></p>`}
    </div>`;
}

/**
 * Devuelve el HTML del mockup.
 * @param {object} o
 * @param {string} [o.desktop] captura desktop (página completa)
 * @param {string} [o.mobile]  captura mobile (página completa)
 * @param {string} [o.alt]     texto alternativo
 * @param {boolean} [o.empty]  true = pantallas con código ("Tu negocio puede estar acá")
 * @param {boolean} [o.lazy]   carga diferida de imágenes
 */
export function mockupHTML({ desktop = "", mobile = "", alt = "", empty = false, lazy = true } = {}) {
  const loading = lazy ? 'loading="lazy"' : "";
  const desk = empty
    ? emptyScreen()
    : `<img class="scrollshot" src="${esc(desktop)}" alt="${esc(alt)} — versión de escritorio" ${loading} decoding="async">`;
  const mob = empty
    ? emptyScreen(true)
    : `<img class="scrollshot" src="${esc(mobile)}" alt="${esc(alt)} — versión celular" ${loading} decoding="async">`;

  return `
    <div class="mockup">
      <div class="monitor">
        <div class="monitor__frame"><div class="monitor__screen">${desk}</div></div>
        <div class="monitor__stand"></div>
        <div class="monitor__base"></div>
      </div>
      <div class="phone">
        <span class="phone__notch"></span>
        <div class="phone__screen">${mob}</div>
      </div>
    </div>`;
}

/* Un solo ResizeObserver para recalcular distancias cuando cambia el tamaño */
const ro = "ResizeObserver" in window ? new ResizeObserver((entries) => entries.forEach((e) => setDist(e.target))) : null;

/* Calcula cuánto debe subir la captura: alto imagen − alto pantalla visible.
   La duración es proporcional a la distancia (velocidad de lectura pareja). */
function setDist(img) {
  const screen = img.parentElement;
  if (!screen) return;
  const dist = Math.max(0, img.offsetHeight - screen.clientHeight);
  img.style.setProperty("--dist", `${dist}px`);
  img.style.setProperty("--dur", `${Math.max(2.5, dist / 260).toFixed(2)}s`);
}

/** Prepara todas las capturas dentro de "root" para el auto-scroll */
export function measureMockups(root) {
  root.querySelectorAll(".scrollshot").forEach((img) => {
    if (img.complete && img.naturalHeight) setDist(img);
    img.addEventListener("load", () => setDist(img), { once: true });
    ro?.observe(img);
  });
}
