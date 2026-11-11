/* ==========================================================================
   js/modules/hero.js
   Hero:
   - Palabra animada que rota: "venda más" → "tenga más clientes" → ...
   - Monograma IO con tilt 3D que sigue al mouse (desktop) o que se mueve
     solo, suave (celular).
   - Animación de entrada cuando termina el preloader.
   ========================================================================== */
import { $, $$, motionOn, hasFinePointer } from "./utils.js";

let introTl = null;

/** Prepara estados iniciales (se llama ANTES de que termine el preloader) */
export function prepareHero() {
  if (!motionOn()) return;
  const { gsap } = window;

  // Intro: todo arranca oculto y entra con introHero()
  introTl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
  introTl
    .from(".mono", { scale: 0.6, opacity: 0, rotateY: -50, duration: 1.4, ease: "expo.out" }, 0)
    .from(".hero__title .split-inner", { yPercent: 110, rotate: 4, duration: 1, stagger: 0.05 }, 0.1)
    .from(".rotator", { opacity: 0, y: 20, duration: 0.8 }, 0.45)
    .from(".hero__right > *", { opacity: 0, y: 30, duration: 0.9, stagger: 0.1 }, 0.35)
    .from(".scroll-ind, .marquee", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, 0.6);
}

/** Dispara la intro (después del preloader) */
export function introHero() {
  introTl?.play();
}

/** Rotador de palabras + tilt del monograma */
export function initHero() {
  initRotator();
  initTilt();
}

/* ---- Palabra que rota ---- */
function initRotator() {
  const items = $$(".rotator__item");
  if (items.length < 2 || !motionOn()) return;
  const { gsap } = window;

  let i = 0;
  gsap.set(items.slice(1), { yPercent: 100, opacity: 0 });

  setInterval(() => {
    const current = items[i];
    i = (i + 1) % items.length;
    const next = items[i];
    gsap.to(current, { yPercent: -100, opacity: 0, duration: 0.6, ease: "power3.in" });
    gsap.fromTo(next, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.35 });
    items.forEach((el) => el.classList.toggle("is-active", el === next));
  }, 2600);
}

/* ---- Tilt 3D del monograma ---- */
function initTilt() {
  const mono = $(".mono");
  if (!mono || !motionOn()) return;
  const { gsap } = window;
  gsap.set(mono, { transformPerspective: 900, transformOrigin: "50% 50%" });

  if (hasFinePointer()) {
    // Desktop: sigue al mouse por toda la ventana
    const rotX = gsap.quickTo(mono, "rotationX", { duration: 0.8, ease: "power3.out" });
    const rotY = gsap.quickTo(mono, "rotationY", { duration: 0.8, ease: "power3.out" });
    window.addEventListener("mousemove", (e) => {
      const x = e.clientX / innerWidth - 0.5;  // -0.5 … 0.5
      const y = e.clientY / innerHeight - 0.5;
      rotY(x * 34);
      rotX(-y * 26);
    }, { passive: true });
  } else {
    // Celular: movimiento automático suave
    gsap.to(mono, { rotationY: 14, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.fromTo(mono, { rotationX: 6 }, { rotationX: -8, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
  }
}
