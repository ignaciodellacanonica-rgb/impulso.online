/* ==========================================================================
   js/modules/works.js
   Genera las cards de "Trabajos" desde js/data/projects.js.
   - Hover / foco: el mockup sube y la captura hace scroll hacia abajo.
   - Click en proyecto real: abre el modal con detalle.
   - Click en lugar libre: abre WhatsApp ("quiero ser el próximo proyecto").
   ========================================================================== */
import { PROJECTS } from "../data/projects.js";
import { waLink, WA_MESSAGES } from "../data/config.js";
import { $, esc, ICONS } from "./utils.js";
import { mockupHTML, measureMockups } from "./mockup.js";
import { openModal } from "./modal.js";

/** Dibuja la grilla de trabajos */
export function initWorks() {
  const grid = $("#worksGrid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(cardHTML).join("");
  measureMockups(grid);

  // Auto-scroll de la captura al pasar el mouse o enfocar con teclado
  grid.querySelectorAll(".work:not(.work--empty)").forEach((card) => {
    const on = () => card.classList.add("is-scrolling");
    const off = () => card.classList.remove("is-scrolling");
    card.addEventListener("mouseenter", on);
    card.addEventListener("mouseleave", off);
    card.addEventListener("focus", on);
    card.addEventListener("blur", off);

    // Click → modal del proyecto
    card.addEventListener("click", () => {
      const project = PROJECTS.find((p) => p.id === card.dataset.id);
      if (project) openProject(project);
    });
  });
}

/* HTML de una card */
function cardHTML(p) {
  const info = `
    <div class="work__info">
      <div>
        <h3 class="work__name">${esc(p.name)}</h3>
        <span class="work__cat">${esc(p.category)}</span>
      </div>
      <span class="work__arrow" aria-hidden="true">${ICONS.arrowUpRight}</span>
    </div>`;

  // Lugar libre → link directo a WhatsApp
  if (p.type === "empty") {
    return `
      <li data-reveal>
        <a class="work work--empty" href="${waLink(WA_MESSAGES.proximoProyecto)}" target="_blank" rel="noopener"
           aria-label="Tu negocio puede estar acá: escribime por WhatsApp para ser el próximo proyecto">
          <div class="work__media">${mockupHTML({ empty: true })}</div>
          ${info}
        </a>
      </li>`;
  }

  // Proyecto real → botón que abre el modal
  return `
    <li data-reveal>
      <button type="button" class="work" data-id="${esc(p.id)}" aria-haspopup="dialog"
              aria-label="Ver proyecto ${esc(p.name)}">
        <div class="work__media">${mockupHTML({ desktop: p.desktop, mobile: p.mobile, alt: `Web de ${p.name}` })}</div>
        ${info}
      </button>
    </li>`;
}

/* Abre el modal con el detalle del proyecto */
function openProject(p) {
  const hasUrl = /^https?:\/\//.test(p.url || "");
  const liveBtn = hasUrl
    ? `<a class="btn btn--primary" href="${esc(p.url)}" target="_blank" rel="noopener"><span class="js-roll">Ver web en vivo</span> ${ICONS.arrowUpRight}</a>`
    : `<a class="btn btn--primary" aria-disabled="true" tabindex="-1">Ver web en vivo (link próximamente)</a>`; // [PLACEHOLDER] se activa solo al cargar la URL en projects.js

  const html = `
    <article class="project">
      <div class="project__mock is-looping">${mockupHTML({ desktop: p.desktop, mobile: p.mobile, alt: `Web de ${p.name}`, lazy: false })}</div>
      <div class="project__info">
        <span class="project__cat">${esc(p.category)}</span>
        <h2 class="project__name">${esc(p.name)}</h2>
        <div class="tags">${p.services.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
        <div class="project__block"><h3>// el desafío</h3><p>${esc(p.challenge)}</p></div>
        <div class="project__block"><h3>// qué hicimos</h3><p>${esc(p.solution)}</p></div>
        <div class="project__actions">
          ${liveBtn}
          <a class="btn btn--ghost" href="${waLink(WA_MESSAGES.auditoria)}" target="_blank" rel="noopener">${ICONS.whatsapp}<span class="js-roll">Quiero algo así</span></a>
        </div>
      </div>
    </article>`;

  openModal({
    html,
    label: `Proyecto ${p.name}`,
    onOpen: (root) => {
      measureMockups(root);
      // Los botones nuevos también llevan rolling text
      import("./rolling.js").then((m) => m.initRolling(root));
    },
  });
}
