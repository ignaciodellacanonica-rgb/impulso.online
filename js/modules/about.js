/* ==========================================================================
   js/modules/about.js
   "Sobre mí": al hacer click en un certificado se abre en un lightbox
   (usa el mismo modal en modo "lightbox").
   ========================================================================== */
import { $$, esc } from "./utils.js";
import { openModal } from "./modal.js";

export function initAbout() {
  $$(".cert").forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = btn.querySelector("img");
      openModal({
        variant: "lightbox",
        label: img.alt,
        html: `<img src="${esc(img.currentSrc || img.src)}" alt="${esc(img.alt)}">`,
      });
    });
  });
}
