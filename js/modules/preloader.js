/* ==========================================================================
   js/modules/preloader.js
   Preloader de ~1,5 s: "Somos impulso.online" aparece letra por letra, la
   flecha naranja sube y la pantalla negra se desliza hacia arriba.
   Devuelve una Promise que se resuelve cuando el sitio ya se está revelando
   (así el hero arranca su animación justo a tiempo).
   ========================================================================== */
import { $, motionOn } from "./utils.js";

export function runPreloader() {
  return new Promise((resolve) => {
    const el = $(".preloader");
    const finish = () => {
      document.body.classList.remove("is-loading");
      el?.remove();
      resolve();
    };
    if (!el) return finish();

    // Sin animaciones: lo sacamos directamente
    if (!motionOn()) return finish();

    // Dividimos el texto en letras (cada una en un <span class="ch">)
    const text = $(".preloader__text", el);
    const original = text.textContent.trim();
    const hlFrom = original.indexOf(".online");
    text.setAttribute("aria-label", original);
    text.innerHTML = [...original]
      .map((c, i) => `<span class="ch${i >= hlFrom && hlFrom > -1 ? " ch--hl" : ""}" aria-hidden="true">${c === " " ? "&nbsp;" : c}</span>`)
      .join("");

    const { gsap } = window;
    const arrow = $(".preloader__arrow", el);
    const tl = gsap.timeline({ onComplete: () => el.remove() });

    tl.fromTo(arrow, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "back.out(2)" }, 0)
      .to(text.children, { opacity: 1, y: 0, duration: 0.3, stagger: 0.028, ease: "power3.out" }, 0.1)
      // La flecha sube y se va, el texto se apaga
      .to(arrow, { y: -70, opacity: 0, duration: 0.45, ease: "power3.in" }, 0.95)
      .to(text, { opacity: 0, y: -12, duration: 0.3 }, 1)
      // La cortina negra sube y revela el sitio
      .to(el, { yPercent: -100, duration: 0.65, ease: "power4.inOut" }, 1.1)
      .add(() => { document.body.classList.remove("is-loading"); resolve(); }, 1.2);

    // Seguridad: si algo falla, nunca dejar el sitio tapado
    setTimeout(finish, 4000);
  });
}
