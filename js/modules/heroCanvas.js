/* ==========================================================================
   js/modules/heroCanvas.js
   Fondo del hero: fragmentos de código (HTML/CSS/JS) flotando en un canvas.
   - Tienen distintas "profundidades": los lejanos son más chicos y tenues.
   - Parallax: se desplazan según la posición del mouse.
   - Se alejan del cursor cuando pasa cerca.
   - Se pausa cuando el hero no está visible (ahorra batería).
   - Con movimiento reducido se dibuja una sola vez, quieto.
   ========================================================================== */
import { reducedMotion, hasFinePointer } from "./utils.js";

/* Fragmentos que flotan (recurso gráfico de marca) */
const SNIPPETS = [
  "<html>", "<head>", '<meta charset="UTF-8">', "<body>", "</div>", "</script>",
  ".container {", "display: flex;", "align-items: center;", "justify-content: center;",
  "const impulso = {", "grow: true,", "scale: 1.0", "function init() {", "return growth();",
  "ventas++;", "await clientes();", "<section id=\"hero\">", "color: #FF6B2C;", "if (negocio) vender();",
  "transform: translateY(-8px);", "<a href=\"wa.me\">", "zonaSur.map(crecer)", "@media (max-width: 768px)",
];

export function initHeroCanvas(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const hero = canvas.parentElement;
  const still = reducedMotion();
  let w = 0, h = 0, dpr = 1, items = [], running = false;

  // Mouse (posición en px y parallax normalizado -0.5…0.5)
  const mouse = { x: -9999, y: -9999, px: 0, py: 0, tx: 0, ty: 0 };

  /* Crea los fragmentos según el tamaño de pantalla */
  function build() {
    const count = w < 700 ? 16 : 30;
    items = Array.from({ length: count }, () => {
      const z = 0.25 + Math.random() * 0.75; // profundidad (1 = cerca)
      return {
        text: SNIPPETS[(Math.random() * SNIPPETS.length) | 0],
        x: Math.random() * w,
        y: Math.random() * h,
        z,
        vy: 0.08 + z * 0.25,              // los cercanos suben más rápido
        ox: 0, oy: 0,                     // desplazamiento por repulsión
        hot: Math.random() < 0.12,        // algunos en naranja
      };
    });
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
    if (still) draw();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    // Parallax suavizado
    mouse.px += (mouse.tx - mouse.px) * 0.05;
    mouse.py += (mouse.ty - mouse.py) * 0.05;

    for (const p of items) {
      if (!still) {
        p.y -= p.vy;
        if (p.y < -30) { p.y = h + 30; p.x = Math.random() * w; }
      }
      // Posición con parallax (los cercanos se mueven más)
      let x = p.x - mouse.px * 60 * p.z;
      let y = p.y - mouse.py * 40 * p.z;

      // Repulsión del cursor
      const dx = x + p.ox - mouse.x;
      const dy = y + p.oy - mouse.y;
      const dist = Math.hypot(dx, dy);
      const R = 170;
      if (dist < R && dist > 0) {
        const f = (R - dist) / R;
        p.ox += (dx / dist) * f * 6;
        p.oy += (dy / dist) * f * 6;
      }
      p.ox *= 0.94; // vuelve de a poco a su lugar
      p.oy *= 0.94;

      const size = 10 + p.z * 9;
      const alpha = 0.05 + p.z * 0.16;
      ctx.font = `${size}px "JetBrains Mono", monospace`;
      ctx.fillStyle = p.hot ? `rgba(255,107,44,${alpha + 0.05})` : `rgba(245,245,247,${alpha})`;
      ctx.fillText(p.text, x + p.ox, y + p.oy);
    }
  }

  function loop() {
    if (!running) return;
    draw();
    requestAnimationFrame(loop);
  }

  /* Eventos */
  window.addEventListener("resize", resize);
  if (hasFinePointer() && !still) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.tx = mouse.x / w - 0.5;
      mouse.ty = mouse.y / h - 0.5;
    });
    hero.addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });
  }

  // Solo anima cuando el hero se ve
  if (!still) {
    new IntersectionObserver(([entry]) => {
      const was = running;
      running = entry.isIntersecting;
      if (running && !was) loop();
    }).observe(hero);
  }

  resize();
  // Redibuja cuando cargan las fuentes (JetBrains Mono)
  document.fonts?.ready.then(() => still && draw());
}
