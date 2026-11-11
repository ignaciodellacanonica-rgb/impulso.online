/* ==========================================================================
   js/modules/modal.js
   Modal fullscreen reutilizable (proyectos) y lightbox (certificados).
   - Se cierra con la X, con Escape o tocando afuera.
   - Atrapa el foco adentro mientras está abierto (accesibilidad) y lo
     devuelve al elemento que lo abrió.
   - Frena el scroll suave (Lenis) mientras está abierto.
   ========================================================================== */
import { $ } from "./utils.js";
import { stopScroll, startScroll } from "./smooth.js";

let modal, panel, content, lastFocus;

/** Engancha los eventos del modal (se llama una vez desde main.js) */
export function initModal() {
  modal = $("#modal");
  if (!modal) return;
  panel = $(".modal__panel", modal);
  content = $(".modal__content", modal);

  // Cerrar con X o tocando el fondo
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
  });

  // Escape para cerrar + trampa de foco con Tab
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") trapFocus(e);
  });
}

/**
 * Abre el modal con el HTML indicado.
 * @param {object} o
 * @param {string} o.html       contenido
 * @param {string} [o.label]    título accesible del diálogo
 * @param {"project"|"lightbox"} [o.variant]
 * @param {Function} [o.onOpen] callback con el contenedor ya insertado
 */
export function openModal({ html, label = "", variant = "project", onOpen } = {}) {
  if (!modal) return;
  lastFocus = document.activeElement;
  content.innerHTML = html;
  modal.classList.toggle("modal--lightbox", variant === "lightbox");
  modal.setAttribute("aria-label", label);
  modal.removeAttribute("hidden");
  modal.setAttribute("aria-hidden", "false");
  // Un frame de espera para que la transición CSS se dispare
  requestAnimationFrame(() => modal.classList.add("is-open"));
  panel.scrollTop = 0;
  stopScroll();
  onOpen?.(content);
  setTimeout(() => $(".modal__close", modal)?.focus(), 50);
}

/** Cierra el modal y devuelve el foco */
export function closeModal() {
  if (!modal?.classList.contains("is-open")) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  startScroll();
  setTimeout(() => {
    content.innerHTML = "";
    modal.setAttribute("hidden", "");
  }, 400);
  lastFocus?.focus?.();
}

/* Mantiene el foco dentro del modal */
function trapFocus(e) {
  const focusables = [...modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter((el) => el.offsetParent !== null && el.getAttribute("aria-disabled") !== "true");
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
