/* ==========================================================================
   js/data/projects.js
   Array de proyectos. Las cards de "Trabajos" se generan desde acá.
   Para agregar un trabajo nuevo: reemplazá uno de los "empty" por un
   objeto con type: "real" (copiá el de Einar como modelo). No hace falta
   tocar el HTML.

   Campos de un proyecto real:
   - name, category       → nombre y rubro (el rubro se muestra en mayúsculas)
   - url                  → link a la web en vivo
   - desktop, mobile      → capturas (largas, de toda la página)
   - challenge, solution  → textos del modal
   - services             → etiquetas
   ========================================================================== */

export const PROJECTS = [
  {
    type: "real",
    id: "einar-cocina",
    name: "Einar Cocina",
    category: "Emprendimiento gastronómico",
    // [PLACEHOLDER] Reemplazá por el link real de la web de Einar (ej: "https://einarcocina.com.ar")
    url: "[LINK_WEB_EINAR]",
    // [PLACEHOLDER] Capturas provisorias: reemplazá estos archivos por las
    // capturas reales de la web (misma ruta y nombre, página completa).
    desktop: "assets/img/works/einar-desktop.jpg",
    mobile: "assets/img/works/einar-mobile.jpg",
    challenge:
      "Einar Cocina vende viandas caseras y una línea de pizzas sin gluten. Necesitaba mostrar su menú y recibir pedidos sin responder las mismas preguntas todo el día.",
    solution:
      "Diseñamos su página web con el menú y un botón directo a WhatsApp, creamos contenido para Instagram con IA y armamos campañas en Meta Ads que llevan a los clientes directo a WhatsApp.",
    services: ["Web", "Redes", "Meta Ads"],
  },
  // Lugares libres: muestran "Tu negocio puede estar acá" y abren WhatsApp
  { type: "empty", id: "proximo-1", name: "Tu negocio", category: "Próximo proyecto" },
  { type: "empty", id: "proximo-2", name: "Tu negocio", category: "Próximo proyecto" },
  { type: "empty", id: "proximo-3", name: "Tu negocio", category: "Próximo proyecto" },
];
