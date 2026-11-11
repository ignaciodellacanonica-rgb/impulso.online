/* ==========================================================================
   js/modules/showreel.js
   Sección SHOWREEL:
   - Si SHOWREEL_VIDEO (config.js) tiene valor → video en loop, sin sonido.
   - Si está vacío → mockup monitor + celular con las capturas de Einar
     haciendo scroll en loop (así la sección se ve terminada sin video).
   - Efecto de "expansión": el bloque empieza chico y se agranda hasta
     ocupar la pantalla (ScrollTrigger con pin + scrub).
   ========================================================================== */
import { SHOWREEL_VIDEO } from "../data/config.js";
import { PROJECTS } from "../data/projects.js";
import { $, esc, motionOn, reducedMotion } from "./utils.js";
import { mockupHTML, measureMockups } from "./mockup.js";

export function initShowreel() {
  const stage = $(".showreel__stage");
  const frame = $(".showreel__frame");
  if (!stage || !frame) return;

  /* ---- Contenido ---- */
  if (SHOWREEL_VIDEO) {
    stage.innerHTML = `
      <video class="showreel__video" src="${esc(SHOWREEL_VIDEO)}" muted loop playsinline preload="metadata"
             ${reducedMotion() ? "" : "autoplay"} aria-label="Showreel de impulso.online"></video>`;
    stage.style.padding = "0";
  } else {
    const p = PROJECTS.find((x) => x.type === "real");
    if (p) {
      stage.innerHTML = mockupHTML({ desktop: p.desktop, mobile: p.mobile, alt: `Web de ${p.name}` });
      stage.classList.add("is-looping");
      measureMockups(stage);
    }
  }

  /* ---- Expansión con scroll ---- */
  if (!motionOn()) return;
  const { gsap } = window;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".showreel__pin",
      start: "top top",
      end: "+=110%",
      scrub: 0.6,
      pin: true,
      anticipatePin: 1,
    },
  });
  tl.fromTo(frame, { clipPath: "inset(14% 8% round 32px)" }, { clipPath: "inset(0% 0% round 0px)", ease: "none" }, 0)
    .fromTo(".showreel__title", { scale: 0.8 }, { scale: 1, ease: "none" }, 0)
    .fromTo(".showreel__stage", { scale: 0.92 }, { scale: 1, ease: "none" }, 0);
}
