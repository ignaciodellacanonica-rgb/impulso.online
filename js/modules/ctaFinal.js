/* ==========================================================================
   js/modules/ctaFinal.js
   CTA final: flechitas naranjas que suben de fondo (símbolo de crecimiento)
   mientras el bloque está en pantalla.
   ========================================================================== */
import { $, motionOn } from "./utils.js";

export function initCtaFinal() {
  const box = $(".cta-final__arrows");
  if (!box || !motionOn()) return;
  const { gsap, ScrollTrigger } = window;

  // Creamos las flechas con posiciones y velocidades al azar
  const arrows = Array.from({ length: 14 }, () => {
    const s = document.createElement("span");
    s.style.left = `${Math.random() * 100}%`;
    s.style.transform = `scale(${0.5 + Math.random()})`;
    box.append(s);
    return s;
  });

  const tweens = arrows.map((a) =>
    gsap.fromTo(a, { y: 0, opacity: 0 }, {
      y: () => -(box.offsetHeight + 80),
      opacity: () => 0.15 + Math.random() * 0.35,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 4,
      ease: "none",
      repeat: -1,
      paused: true,
    })
  );

  // Solo corren cuando el bloque se ve
  ScrollTrigger.create({
    trigger: box.parentElement,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => tweens.forEach((t) => (self.isActive ? t.play() : t.pause())),
  });
}
