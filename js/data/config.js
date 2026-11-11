/* ==========================================================================
   js/data/config.js
   Datos de contacto y configuración general.
   TODOS los links de WhatsApp e Instagram del sitio salen de acá:
   cambiá un dato en este archivo y se actualiza en toda la web.
   ========================================================================== */

/* Número de WhatsApp en formato internacional, sin "+" ni espacios */
export const WHATSAPP_NUMBER = "5491138146213";

/* Cómo se muestra el número en pantalla */
export const WHATSAPP_DISPLAY = "+54 9 11 3814-6213";

/* Instagram */
export const INSTAGRAM_URL = "https://www.instagram.com/impulso.online.ar/";
export const INSTAGRAM_USER = "@impulso.online.ar";

/* Video del showreel.
   Vacío ("") → se muestra el mockup de Einar haciendo scroll en loop.
   Cuando tengas el video, poné: "assets/video/showreel.mp4" */
export const SHOWREEL_VIDEO = "";

/* Mensajes prellenados de WhatsApp (centralizados para editarlos fácil) */
export const WA_MESSAGES = {
  auditoria: "Hola Nacho! Quiero mi auditoría gratis",
  proximoProyecto: "Hola! Quiero que mi negocio sea el próximo proyecto",
  pack: (nombre) => `Hola! Me interesa el pack ${nombre}`,
  quiz: (nombre) => `Hola! Hice el test de la web y me recomendó el pack ${nombre}. Quiero mi auditoría gratis.`,
};

/**
 * Arma un link de WhatsApp con mensaje prellenado.
 * waLink("Hola!") → https://wa.me/5491138146213?text=Hola!
 * @param {string} text Mensaje a prellenar (se codifica automáticamente)
 * @returns {string} URL lista para usar en un href
 */
export function waLink(text = "") {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
