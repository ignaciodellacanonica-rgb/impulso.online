/* ==========================================================================
   js/modules/utils.js
   Helpers compartidos: selectores, detección de movimiento reducido,
   dispositivo táctil, disponibilidad de GSAP e íconos SVG reutilizables.
   ========================================================================== */

/* Selectores cortos */
export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ¿El usuario pidió menos movimiento en su sistema? */
export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ¿Hay mouse real? (desktop). En celulares/tablets da false */
export const hasFinePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ¿Cargó GSAP desde el CDN? Si falla, el sitio funciona igual sin animaciones */
export const hasGSAP = () => typeof window.gsap !== "undefined";
export const hasScrollTrigger = () => hasGSAP() && typeof window.ScrollTrigger !== "undefined";

/* Animaciones activas = GSAP disponible + sin movimiento reducido */
export const motionOn = () => hasScrollTrigger() && !reducedMotion();

/* Escapa texto para insertarlo como HTML de forma segura */
export const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Íconos SVG inline (heredan el color con currentColor) */
export const ICONS = {
  whatsapp:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.3-1.95 1.35-.5.05-.97.23-3.27-.68-2.76-1.09-4.5-3.92-4.64-4.1-.13-.18-1.1-1.47-1.1-2.8 0-1.33.7-1.99.95-2.26.24-.27.53-.34.71-.34l.51.01c.16.01.38-.06.6.46.24.55.8 1.92.87 2.06.07.14.12.3.02.48-.09.18-.14.3-.27.46l-.41.48c-.14.13-.28.28-.12.55.16.27.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.6-.14.25.09 1.57.74 1.84.88.27.14.45.2.52.32.07.11.07.66-.17 1.34Z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  arrowUpRight:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
  check:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  close:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
};
