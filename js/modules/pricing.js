/* ==========================================================================
   js/modules/pricing.js
   Genera las cards de PACKS desde js/data/packs.js y les agrega:
   - Tilt 3D suave al pasar el mouse.
   - Brillo que sigue al cursor (variables --mx / --my).
   Exporta packCardHTML() para reusar la card en el resultado del quiz.
   ========================================================================== */
import { PACKS } from "../data/packs.js";
import { waLink, WA_MESSAGES } from "../data/config.js";
import { $, esc, ICONS, hasFinePointer, reducedMotion } from "./utils.js";

/** HTML de una card de pack */
export function packCardHTML(pack, { message } = {}) {
  const msg = message ?? WA_MESSAGES.pack(pack.name);
  return `
    <article class="pack${pack.featured ? " pack--featured" : ""}" data-pack="${esc(pack.id)}">
      ${pack.featured ? '<span class="badge badge--naranja pack__star">⭐ El más elegido</span>' : ""}
      <h3 class="pack__name">${esc(pack.name)}</h3>
      <p class="pack__tagline">${esc(pack.tagline)}</p>
      <p class="pack__price">
        <span class="pack__amount">${esc(pack.price)}</span>
        <span class="pack__period">${esc(pack.period)}</span>
      </p>
      <p class="pack__extra">${esc(pack.extra || "")}</p>
      <ul class="pack__list">
        ${pack.features.map((f) => `<li>${ICONS.check}<span>${esc(f)}</span></li>`).join("")}
      </ul>
      ${pack.bonus ? `<p class="pack__bonus">🎁 Bonus: <b>${esc(pack.bonus)}</b></p>` : ""}
      <a class="btn ${pack.featured ? "btn--primary" : "btn--ghost"} btn--block" href="${waLink(msg)}" target="_blank" rel="noopener">
        ${ICONS.whatsapp}<span class="js-roll">Quiero el pack ${esc(pack.name)}</span>
      </a>
    </article>`;
}

/** Dibuja la grilla y activa el tilt */
export function initPricing() {
  const grid = $("#packsGrid");
  if (!grid) return;
  grid.innerHTML = PACKS.map((p) => `<div data-reveal>${packCardHTML(p)}</div>`).join("");
  grid.querySelectorAll(".pack").forEach(addTilt);
}

/** Tilt 3D + brillo (solo con mouse y sin movimiento reducido) */
export function addTilt(card) {
  if (!hasFinePointer() || reducedMotion()) return;
  const MAX = 7; // grados máximos de inclinación

  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;  // 0 … 1
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
    card.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * MAX}deg) rotateY(${(x - 0.5) * MAX}deg) translateY(-6px)`;
  });
  card.addEventListener("pointerleave", () => { card.style.transform = ""; });
}
