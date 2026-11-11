/* ==========================================================================
   js/modules/whatsapp.js
   Completa automáticamente todos los links de contacto del HTML usando
   js/data/config.js:
   - data-wa="auditoria"        → link de WhatsApp con ese mensaje (clave de WA_MESSAGES)
   - data-wa-text="Hola..."     → link de WhatsApp con un texto libre
   - data-ig                    → link a Instagram
   - data-ig-user               → muestra el @usuario
   - data-wa-display            → muestra el número formateado
   Así ningún número ni link queda "hardcodeado" en el HTML.
   ========================================================================== */
import { waLink, WA_MESSAGES, INSTAGRAM_URL, INSTAGRAM_USER, WHATSAPP_DISPLAY } from "../data/config.js";
import { $$ } from "./utils.js";

export function initWhatsApp() {
  $$("[data-wa]").forEach((a) => {
    const msg = WA_MESSAGES[a.dataset.wa];
    a.href = waLink(typeof msg === "string" ? msg : "");
    externo(a);
  });
  $$("[data-wa-text]").forEach((a) => {
    a.href = waLink(a.dataset.waText);
    externo(a);
  });
  $$("[data-ig]").forEach((a) => {
    a.href = INSTAGRAM_URL;
    externo(a);
  });
  $$("[data-ig-user]").forEach((el) => (el.textContent = INSTAGRAM_USER));
  $$("[data-wa-display]").forEach((el) => (el.textContent = WHATSAPP_DISPLAY));
}

/* Abre en otra pestaña de forma segura */
function externo(a) {
  a.target = "_blank";
  a.rel = "noopener";
}
