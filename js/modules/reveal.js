/* ==========================================================================
   js/modules/reveal.js
   Fade + slide up de los elementos con [data-reveal] cuando entran en
   pantalla. Los que entran juntos se animan en cascada (stagger).
   El estado inicial (opacity 0, y 40px) está en animations.css y solo se
   aplica si hay animaciones activas.
   ========================================================================== */
import { motionOn } from "./utils.js";

export function initReveal() {
  if (!motionOn()) return;
  const { gsap, ScrollTrigger } = window;

  ScrollTrigger.batch("[data-reveal]", {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, overwrite: true }),
  });
}
