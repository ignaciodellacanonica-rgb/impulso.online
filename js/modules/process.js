/* ==========================================================================
   js/modules/process.js
   "Cómo trabajo": la línea naranja se dibuja con el scroll
   (horizontal en desktop, vertical en celular) y cada paso se enciende
   cuando la línea llega a él.
   ========================================================================== */
import { $, $$, motionOn } from "./utils.js";

export function initProcess() {
  const timeline = $(".timeline");
  if (!timeline || !motionOn()) return;
  const { gsap } = window;
  const fill = $(".timeline__fill", timeline);
  const steps = $$(".step", timeline);

  // Enciende los pasos según el avance (0 → 1) de la línea
  const update = (progress) => {
    steps.forEach((s, i) => {
      const at = steps.length > 1 ? i / (steps.length - 1) : 0;
      s.classList.toggle("is-active", progress >= at * 0.98 && progress > 0.01);
    });
  };

  // matchMedia de GSAP: crea/destruye la animación según el ancho
  const mm = gsap.matchMedia();
  const build = (axis) => {
    gsap.fromTo(fill, { [axis]: 0 }, {
      [axis]: 1,
      ease: "none",
      scrollTrigger: {
        trigger: timeline,
        start: "top 75%",
        end: axis === "scaleX" ? "top 30%" : "bottom 60%",
        scrub: 0.5,
        onUpdate: (self) => update(self.progress),
      },
    });
  };
  mm.add("(min-width: 900px)", () => build("scaleX"));
  mm.add("(max-width: 899px)", () => build("scaleY"));
}
