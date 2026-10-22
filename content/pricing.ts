export type Plan = {
  slug: string;
  /** Nombre corto del plan. Se muestra en mono mayúscula. */
  name: string;
  /** Precio en pesos. */
  price: number;
  /** Qué cubre el monto: "pago único", "al mes". */
  period: string;
  features: string[];
  /** El plan recomendado. UNO solo: enciende el glow ámbar, que es la única
   *  sombra de color del sistema y pierde sentido si se repite. */
  highlighted?: boolean;
};

/**
 * Formatea un monto en pesos chilenos: 110000 -> "$110.000".
 *
 * Los precios se guardan como número y no como string para que no haya dos
 * formatos conviviendo cuando alguien agregue un plan. El separador de miles
 * en Chile es el punto.
 */
export function formatCLP(amount: number): string {
  return `$${amount.toLocaleString("es-CL")}`;
}

/**
 * Los planes. Precios confirmados por Ignacio en octubre de 2026.
 *
 * Sin promoción: la de septiembre y octubre terminó y se sacó entera, junto
 * con el cálculo de descuentos. Si vuelve una, está en el historial de git —
 * y que tenga fecha de término anotada, porque nada la apaga solo.
 *
 * Las listas de qué incluye cada plan están armadas desde
 * content/services.ts, no dictadas: revísalas antes de prometer algo nuevo.
 */
export const plans: Plan[] = [
  {
    slug: "landing",
    name: "Landing",
    price: 110000,
    period: "pago único",
    features: [
      "Una página, enfocada en que te escriban",
      "Diseño a medida, no una plantilla",
      "Botón directo a WhatsApp",
      "Andando en móvil y en computador",
      "Publicación incluida, con el dominio a tu nombre",
    ],
  },
  {
    slug: "sitio",
    name: "Sitio",
    price: 240000,
    period: "pago único",
    features: [
      "Todo lo de Landing",
      "Hasta cinco páginas con tu catálogo",
      "Formulario de contacto que llega a tu correo",
      "Posicionamiento local en Google",
      "Textos escritos contigo, no rellenados",
    ],
    highlighted: true,
  },
  {
    slug: "sistema",
    name: "Sistema",
    price: 420000,
    period: "pago único",
    features: [
      "Todo lo de Sitio",
      "Agendador para que reserven solos",
      "Panel para que edites el contenido",
      "Integraciones con lo que ya usas",
    ],
  },
];
