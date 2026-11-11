/* ==========================================================================
   js/data/packs.js
   Array de packs y precios. Las cards de "Packs" y el resultado del quiz
   se generan desde acá: cambiar un precio es editar UN solo lugar.

   Campos:
   - id          → usado por el quiz ("presencia" | "impulso" | "ventas")
   - name        → nombre (va en el mensaje de WhatsApp; en la card se
                   muestra en mayúsculas por CSS)
   - tagline     → frase corta
   - price       → monto principal (texto, así podés poner "$60.000")
   - period      → "pago único", "/mes", etc.
   - extra       → línea secundaria del precio (opcional)
   - features    → lista de lo que incluye
   - bonus       → beneficio destacado (opcional)
   - featured    → true = card destacada ("⭐ El más elegido")
   ========================================================================== */

export const PACKS = [
  {
    id: "presencia",
    name: "Presencia",
    tagline: "Para que te encuentren",
    price: "$60.000",
    period: "pago único",
    extra: "+ $10.000/mes de mantenimiento",
    features: [
      "Página web a medida",
      "Botón directo a WhatsApp",
      "Perfil en Google Maps",
      "Hosting + sitio seguro (https)",
      "2 cambios por mes",
    ],
    bonus: "",
    featured: false,
  },
  {
    id: "impulso",
    name: "Impulso",
    tagline: "Para que te sigan",
    price: "$180.000",
    period: "/mes",
    extra: "",
    features: [
      "12 posteos + 8 historias por mes",
      "Diseño con IA",
      "Publicación programada",
      "Respuesta de comentarios",
      "Reporte mensual",
    ],
    bonus: "Web al 50% firmando 3 meses",
    featured: false,
  },
  {
    id: "ventas",
    name: "Ventas",
    tagline: "Para que te compren",
    price: "$300.000",
    period: "/mes",
    extra: "+ inversión en anuncios",
    features: [
      "Todo el pack Impulso",
      "Campañas de Meta Ads (clic a WhatsApp)",
      "Optimización semanal",
      "Reporte de resultados",
    ],
    bonus: "Web GRATIS firmando 3 meses",
    featured: true,
  },
];
