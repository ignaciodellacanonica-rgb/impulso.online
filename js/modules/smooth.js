/* ==========================================================================
   js/modules/smooth.js
   Scroll suave con Lenis + integración con GSAP ScrollTrigger.
   También maneja los links internos (href="#seccion") para que usen el
   scroll suave. Si Lenis no cargó o hay movimiento reducido, usa el scroll
   nativo del navegador.
   ========================================================================== */
import { reducedMotion, hasScrollTrigger } from "./utils.js";

let lenis = null;

export const getLenis = () => lenis;

/** Inicializa Lenis y los links de ancla */
export function initSmooth() {
  if (!reducedMotion() && typeof window.Lenis !== "undefined") {
    lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });

    if (hasScrollTrigger()) {
      // Lenis avisa a ScrollTrigger en cada scroll y usa el ticker de GSAP
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add((time) => lenis.raf(time * 1000));
      window.gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  // Links internos → scroll suave hasta la sección
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    scrollToEl(target);
    history.replaceState(null, "", id);
  });
}

/** Scrollea hasta un elemento (con Lenis si está activo) */
export function scrollToEl(target) {
  if (lenis) lenis.scrollTo(target, { duration: 1.4, force: true });
  else target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
  // Mueve el foco a la sección para lectores de pantalla / teclado
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

/* Frenar / reanudar (menú y modal abiertos) */
export function stopScroll() {
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}
export function startScroll() {
  lenis?.start();
  document.documentElement.style.overflow = "";
}
