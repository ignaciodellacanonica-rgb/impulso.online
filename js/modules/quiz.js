/* ==========================================================================
   js/modules/quiz.js
   Recomendador de pack: 3 preguntas paso a paso con barra de progreso.
   Lógica por puntos: cada respuesta suma a Presencia, Impulso o Ventas
   y gana el que más suma. (Para ajustar la recomendación, cambiá los
   puntos en QUESTIONS.)
   ========================================================================== */
import { PACKS } from "../data/packs.js";
import { waLink, WA_MESSAGES } from "../data/config.js";
import { $, esc } from "./utils.js";
import { packCardHTML, addTilt } from "./pricing.js";
import { initRolling } from "./rolling.js";

/* Preguntas y puntos que suma cada respuesta */
const QUESTIONS = [
  {
    q: "¿Tu negocio tiene página web?",
    options: [
      { label: "Sí", score: { impulso: 1, ventas: 1 } },
      { label: "No", score: { presencia: 2 } },
    ],
  },
  {
    q: "¿Quién maneja tus redes hoy?",
    options: [
      { label: "Yo, cuando puedo", score: { impulso: 2 } },
      { label: "Nadie", score: { impulso: 1, presencia: 1 } },
      { label: "Alguien más", score: { ventas: 2 } },
    ],
  },
  {
    q: "¿Qué necesitás más?",
    options: [
      { label: "Que me encuentren", score: { presencia: 3 } },
      { label: "Más seguidores", score: { impulso: 3 } },
      { label: "Más ventas YA", score: { ventas: 3 } },
    ],
  },
];

export function initQuiz() {
  const root = $("#quiz");
  if (!root) return;
  const body = $(".quiz__body", root);
  const bar = $(".quiz__bar", root);
  const stepLabel = $(".quiz__step-label", root);
  const progress = $(".quiz__progress", root);

  let step = 0;
  let answers = [];

  /* Barra de progreso */
  const setProgress = (n) => {
    const pct = Math.round((n / QUESTIONS.length) * 100);
    bar.style.width = `${pct}%`;
    progress.setAttribute("aria-valuenow", String(pct));
    stepLabel.textContent = n < QUESTIONS.length ? `Pregunta ${n + 1} de ${QUESTIONS.length}` : "¡Listo!";
  };

  /* Pinta una pregunta */
  const renderStep = (focus = false) => {
    const { q, options } = QUESTIONS[step];
    body.innerHTML = `
      <div class="quiz__step">
        <h3 class="quiz__q" tabindex="-1">${esc(q)}</h3>
        <div class="quiz__options quiz__options--${options.length}">
          ${options.map((o, i) => `<button type="button" class="quiz__opt" data-i="${i}">${esc(o.label)}</button>`).join("")}
        </div>
        ${step > 0 ? '<button type="button" class="quiz__back">← Volver</button>' : ""}
      </div>`;
    setProgress(step);
    if (focus) $(".quiz__q", body).focus({ preventScroll: true });
  };

  /* Calcula y muestra el resultado */
  const renderResult = () => {
    const totals = { presencia: 0, impulso: 0, ventas: 0 };
    answers.forEach((a) => Object.entries(a).forEach(([k, v]) => (totals[k] += v)));
    // En caso de empate gana el pack más completo (orden: ventas > impulso > presencia)
    const winnerId = ["ventas", "impulso", "presencia"].reduce((best, id) => (totals[id] > totals[best] ? id : best), "ventas");
    const pack = PACKS.find((p) => p.id === winnerId);

    setProgress(QUESTIONS.length);
    body.innerHTML = `
      <div class="quiz__result" aria-live="polite">
        <p class="quiz__result-label">// tu pack recomendado</p>
        <h3 class="quiz__q" tabindex="-1">Te conviene el pack <span class="hl">${esc(pack.name)}</span></h3>
        ${packCardHTML({ ...pack, featured: false }, { message: WA_MESSAGES.quiz(pack.name) })}
        <div class="quiz__actions">
          <a class="btn btn--primary" href="${waLink(WA_MESSAGES.quiz(pack.name))}" target="_blank" rel="noopener"><span class="js-roll">Quiero mi auditoría gratis</span></a>
          <button type="button" class="btn btn--ghost quiz__restart"><span class="js-roll">Volver a empezar</span></button>
        </div>
      </div>`;
    initRolling(body);
    body.querySelectorAll(".pack").forEach(addTilt);
    $(".quiz__q", body).focus({ preventScroll: true });
  };

  /* Clicks (delegación de eventos) */
  body.addEventListener("click", (e) => {
    const opt = e.target.closest(".quiz__opt");
    if (opt) {
      answers[step] = QUESTIONS[step].options[+opt.dataset.i].score;
      step++;
      if (step < QUESTIONS.length) renderStep(true);
      else renderResult();
      return;
    }
    if (e.target.closest(".quiz__back")) { step = Math.max(0, step - 1); renderStep(true); return; }
    if (e.target.closest(".quiz__restart")) { step = 0; answers = []; renderStep(true); }
  });

  renderStep();
}
