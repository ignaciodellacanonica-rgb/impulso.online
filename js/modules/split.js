/* ==========================================================================
   js/modules/split.js
   Divide títulos en palabras o letras (spans) y los anima con GSAP cuando
   entran en pantalla.
   Uso en HTML:
     <h2 data-split="words">...</h2>  → entra palabra por palabra
     <h2 data-split="chars">...</h2>  → entra letra por letra
   Respeta los spans internos (por ej. <span class="hl">) y los <br>.
   ========================================================================== */
import { $$, motionOn } from "./utils.js";

/** Divide el texto de un elemento. Devuelve los spans internos a animar */
export function splitText(el, mode = "words") {
  const inners = [];
  if (mode === "chars") el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());

  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      // Nodo de texto → lo partimos
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(document.createTextNode(" ")); return; }
          const word = document.createElement("span");
          word.className = "split-word";
          if (mode === "chars") {
            word.setAttribute("aria-hidden", "true");
            [...part].forEach((c) => {
              const ch = document.createElement("span");
              ch.className = "split-inner";
              ch.textContent = c;
              word.append(ch);
              inners.push(ch);
            });
          } else {
            const inner = document.createElement("span");
            inner.className = "split-inner";
            inner.textContent = part;
            word.append(inner);
            inners.push(inner);
          }
          frag.append(word);
        });
        child.replaceWith(frag);
      }
      // Elemento (span.hl, strong...) → entramos y seguimos partiendo
      else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "BR" && !child.hasAttribute("data-nosplit")) {
        walk(child);
      }
    });
  };
  walk(el);
  return inners;
}

/** Busca todos los [data-split] (fuera del hero) y los anima con scroll */
export function initSplit() {
  if (!motionOn()) return;
  const { gsap } = window;

  $$("[data-split]").forEach((el) => {
    const mode = el.dataset.split;
    const inners = splitText(el, mode);
    if (el.closest(".hero")) return; // el hero tiene su propia intro (hero.js)

    gsap.from(inners, {
      yPercent: 110,
      rotate: mode === "chars" ? 8 : 4,
      duration: mode === "chars" ? 0.8 : 1,
      ease: "power4.out",
      stagger: mode === "chars" ? 0.018 : 0.06,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}
