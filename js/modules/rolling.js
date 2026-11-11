/* ==========================================================================
   js/modules/rolling.js
   Efecto "rolling text" en botones y links: al hacer hover el texto sube y
   aparece una copia desde abajo. Se aplica a cualquier elemento con la
   clase .js-roll (el CSS está en components.css → ROLLING TEXT).
   ========================================================================== */
import { esc } from "./utils.js";

export function initRolling(root = document) {
  root.querySelectorAll(".js-roll:not(.is-rolled)").forEach((el) => {
    const text = el.textContent.trim();
    el.classList.add("is-rolled");
    el.innerHTML = `<span class="roll"><span class="roll__in" data-text="${esc(text)}">${esc(text)}</span></span>`;
  });
}
