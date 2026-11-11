/* ==========================================================================
   js/modules/faq.js
   Acordeón de preguntas frecuentes.
   - Abre/cierra con click o teclado (son <button>).
   - Mantiene aria-expanded actualizado.
   - Al abrir una, cierra las demás.
   La animación de altura está en CSS (grid-template-rows 0fr → 1fr).
   ========================================================================== */
import { $$ } from "./utils.js";

export function initFaq() {
  const items = $$(".faq__item");
  items.forEach((item) => {
    const btn = item.querySelector(".faq__q");
    btn.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");
      items.forEach((other) => setOpen(other, false));
      setOpen(item, willOpen);
    });
  });
}

function setOpen(item, open) {
  item.classList.toggle("is-open", open);
  item.querySelector(".faq__q").setAttribute("aria-expanded", String(open));
  const panel = item.querySelector(".faq__a");
  if (open) panel.removeAttribute("inert");
  else panel.setAttribute("inert", "");
}
