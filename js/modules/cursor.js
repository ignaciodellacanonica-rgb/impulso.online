/* ==========================================================================
   js/modules/cursor.js
   Cursor personalizado (solo desktop con mouse y sin movimiento reducido):
   un punto naranja + un círculo que lo sigue con retraso y crece sobre
   links, botones y elementos con [data-cursor].
   ========================================================================== */
import { $, hasFinePointer, reducedMotion } from "./utils.js";

export function initCursor() {
  const cursor = $(".cursor");
  if (!cursor || !hasFinePointer() || reducedMotion()) return;

  document.documentElement.classList.add("has-cursor");
  const dot = $(".cursor__dot", cursor);
  const ring = $(".cursor__ring", cursor);

  let mx = innerWidth / 2, my = innerHeight / 2; // posición del mouse
  let rx = mx, ry = my;                            // posición del círculo (con inercia)

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    cursor.classList.remove("is-hidden");
  }, { passive: true });

  // Animación del círculo: interpolación suave en cada frame
  const loop = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(loop);
  };
  loop();

  // Crece sobre elementos interactivos
  const HOVER = "a, button, [data-cursor], label, summary";
  document.addEventListener("mouseover", (e) => {
    cursor.classList.toggle("is-hover", !!e.target.closest(HOVER));
  });
  // Se oculta cuando el mouse sale de la ventana
  document.addEventListener("mouseleave", () => cursor.classList.add("is-hidden"));
}
