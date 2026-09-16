export type Plan = {
  slug: string;
  /** Nombre corto del plan. Se muestra en mono mayúscula. */
  name: string;
  /** Precio de lista en pesos, SIN descuento. */
  basePrice: number;
  /**
   * Descuento de la promoción, en porcentaje entero. Ver PROMO abajo.
   * Omitir en los planes que no están en promoción.
   */
  discountPct?: number;
  /** Qué cubre el monto: "pago único", "al mes". */
  period: string;
  features: string[];
  /** El plan recomendado. UNO solo: enciende el glow ámbar, que es la única
   *  sombra de color del sistema y pierde sentido si se repite. */
  highlighted?: boolean;
};

/**
 * La promoción de septiembre y octubre.
 *
 * Es texto fijo a propósito: no hay lógica de fechas, nada se activa ni se
 * apaga solo. En noviembre hay que venir acá, borrar los `discountPct` de los
 * planes y esta constante. Si no, el sitio sigue ofreciendo un descuento que
 * ya no existe.
 */
export const PROMO_PERIOD = "septiembre y octubre";

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
 * Lo que efectivamente paga el cliente hoy.
 *
 * El monto con descuento se calcula desde el porcentaje en vez de escribirse a
 * mano: así el "30%" que se muestra y el número que se cobra no pueden quedar
 * diciendo cosas distintas.
 */
export function finalPrice(plan: Plan): number {
  if (!plan.discountPct) return plan.basePrice;
  return Math.round(plan.basePrice * (1 - plan.discountPct / 100));
}

/**
 * Los planes.
 *
 * ATENCIÓN: solo el `basePrice` de `landing` está confirmado por Ignacio
 * ($110.000). Los otros dos son MARCADORES para poder maquetar la sección — no
 * los publiques sin revisarlos, y ojo que los descuentos se calculan sobre
 * ellos. Lo mismo vale para qué incluye cada plan: las listas están armadas
 * desde content/services.ts, no dictadas.
 */
export const plans: Plan[] = [
  {
    slug: "landing",
    name: "Landing",
    basePrice: 110000,
    period: "pago único",
    features: [
      "Una página, enfocada en que te escriban",
      "Diseño a medida, no una plantilla",
      "Botón directo a WhatsApp",
      "Andando en móvil y en computador",
      "Dominio y publicación incluidos",
    ],
  },
  {
    slug: "sitio",
    name: "Sitio",
    // TODO(precio): marcador sin confirmar.
    basePrice: 240000,
    discountPct: 30,
    period: "pago único",
    features: [
      "Todo lo de Landing",
      "Hasta cinco páginas con tu catálogo",
      "Formulario de contacto que llega a tu correo",
      "Posicionamiento local en Google",
      "Textos escritos con vos, no rellenados",
    ],
    highlighted: true,
  },
  {
    slug: "sistema",
    name: "Sistema",
    // TODO(precio): marcador sin confirmar.
    basePrice: 420000,
    discountPct: 20,
    period: "pago único",
    features: [
      "Todo lo de Sitio",
      "Agendador para que reserven solos",
      "Panel para que edites el contenido",
      "Integraciones con lo que ya usás",
      "Un mes de ajustes después de publicar",
    ],
  },
];
