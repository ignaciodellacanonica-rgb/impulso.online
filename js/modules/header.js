/* ==========================================================================
   js/modules/header.js
   Header fijo + menú fullscreen.
   - El header toma fondo al bajar y se esconde al scrollear hacia abajo.
   - El botón circular abre/cierra el menú (también Escape).
   - Al tocar un link del menú, se cierra y scrollea a la sección.
   ========================================================================== */
import { $, $$ } from "./utils.js";
import { stopScroll, startScroll } from "./smooth.js";

export function initHeader() {
  const header = $(".header");
  const btn = $(".menu-btn");
  const menu = $("#menu");
  if (!header || !btn || !menu) return;

  /* ---- Estado del header según el scroll ---- */
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    // Se esconde solo si bajás y ya pasaste el hero
    header.classList.toggle("is-hidden", y > lastY && y > window.innerHeight * 0.6 && !isOpen());
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Menú ---- */
  const isOpen = () => menu.classList.contains("is-open");

  const open = () => {
    menu.classList.add("is-open");
    menu.removeAttribute("inert");
    menu.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Cerrar menú");
    stopScroll();
    setTimeout(() => $("a", menu)?.focus({ preventScroll: true }), 350);
  };
  const close = (returnFocus = true) => {
    menu.classList.remove("is-open");
    menu.setAttribute("inert", "");
    menu.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Abrir menú");
    startScroll();
    if (returnFocus) btn.focus({ preventScroll: true });
  };

  btn.addEventListener("click", () => (isOpen() ? close() : open()));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) close();
  });
  // Cerrar al elegir una sección (el scroll lo hace smooth.js)
  $$("a", menu).forEach((a) => a.addEventListener("click", () => close(false)));
}
