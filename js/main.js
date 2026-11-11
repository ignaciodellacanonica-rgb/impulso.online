/* ==========================================================================
   js/main.js
   Punto de entrada: inicializa todos los módulos en el orden correcto.
   1) Contenido generado desde /js/data (trabajos, packs, quiz) y links.
   2) Efectos de interfaz (rolling text, cursor, header, scroll suave).
   3) Animaciones con scroll (split, reveal, showreel, timeline...).
   4) Preloader → intro del hero.
   ========================================================================== */
import { motionOn } from "./modules/utils.js";
import { initWhatsApp } from "./modules/whatsapp.js";
import { initWorks } from "./modules/works.js";
import { initPricing } from "./modules/pricing.js";
import { initQuiz } from "./modules/quiz.js";
import { initModal } from "./modules/modal.js";
import { initAbout } from "./modules/about.js";
import { initFaq } from "./modules/faq.js";
import { initRolling } from "./modules/rolling.js";
import { initCursor } from "./modules/cursor.js";
import { initSmooth } from "./modules/smooth.js";
import { initHeader } from "./modules/header.js";
import { initSplit } from "./modules/split.js";
import { initReveal } from "./modules/reveal.js";
import { initHero, prepareHero, introHero } from "./modules/hero.js";
import { initHeroCanvas } from "./modules/heroCanvas.js";
import { initShowreel } from "./modules/showreel.js";
import { initProcess } from "./modules/process.js";
import { initCtaFinal } from "./modules/ctaFinal.js";
import { runPreloader } from "./modules/preloader.js";

/* Clases en <html> que usa el CSS: .js (hay JS) y .motion (animaciones activas) */
const html = document.documentElement;
if (motionOn()) html.classList.add("motion");
if (window.gsap && window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);

/* 1) Contenido dinámico */
initWhatsApp();
initWorks();
initPricing();
initQuiz();
initModal();
initAbout();
initFaq();

/* 2) Interfaz */
initRolling();
initCursor();
initSmooth();
initHeader();

/* 3) Animaciones */
initSplit();       // divide títulos (incluido el del hero)
prepareHero();     // deja el hero listo para su intro
initHero();
initHeroCanvas(document.querySelector(".hero__canvas"));
initReveal();
initShowreel();
initProcess();
initCtaFinal();

/* 4) Preloader → intro del hero */
runPreloader().then(() => {
  introHero();
  window.ScrollTrigger?.refresh();
});

/* Recalcula posiciones de ScrollTrigger cuando terminan de cargar fuentes e imágenes */
document.fonts?.ready.then(() => window.ScrollTrigger?.refresh());
window.addEventListener("load", () => window.ScrollTrigger?.refresh());

/* Año del footer automático */
const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
