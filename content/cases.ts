export type CaseStudy = {
  slug: string;
  client: string;
  url: string;
  /** Bajada corta para las tarjetas y la meta description. */
  summary: string;
  image: string;
  tags: string[];
  /**
   * Un caso se cuenta en tres partes o no se cuenta. `summary` solo servía para
   * la tarjeta; estos tres campos son los que llenan la página de detalle.
   */
  problem: string;
  work: string;
  result: string;
  /**
   * `client` — trabajo real y pagado, con alguien a quien se le puede preguntar.
   * `demo` — vitrina construida por cuenta propia.
   *
   * Van en secciones separadas y etiquetadas a propósito: mezcladas, la primera
   * persona que pregunte "¿y esta panadería es cliente tuya?" se lleva las
   * demás por delante.
   */
  kind: "client" | "demo";
};

export const cases: CaseStudy[] = [
  {
    slug: "mirador-propiedades",
    client: "Mirador Propiedades",
    url: "https://www.miradorpropiedades.cl/",
    kind: "client",
    summary:
      "Antes de dibujar una sola pantalla, dediqué tiempo a entender cómo se mueve una propiedad desde que está disponible hasta que se reserva — porque eso, no un catálogo bonito, era lo que el sitio tenía que resolver.",
    image: "/cases/mirador-hero.png",
    tags: [
      "Panel de administración a medida",
      "Catálogo con filtros y mapa",
      "Gestión de leads (email + WhatsApp)",
      "SEO técnico (sitemap dinámico)",
    ],
    problem:
      "Las propiedades se publicaban a mano en redes sociales y se coordinaban por WhatsApp una por una. No había un lugar donde un interesado pudiera filtrar por comuna, precio o tipo de propiedad, así que cada consulta empezaba de cero — y las propiedades ya arrendadas seguían generando mensajes semanas después.",
    work:
      "Antes de diseñar nada seguí el recorrido completo de una propiedad, desde que entra disponible hasta que se reserva. De ahí salió un panel de administración donde se publica y se da de baja sin depender de mí, un catálogo con filtros y mapa, y un formulario que deja el lead en el correo y en WhatsApp al mismo tiempo. El sitio se acompañó de sitemap dinámico para que cada propiedad nueva entre sola a Google.",
    result:
      "El equipo publica y actualiza propiedades sin intermediarios, y las consultas llegan filtradas: quien escribe ya vio precio, ubicación y fotos.",
  },
];

export const clientCases = cases.filter((c) => c.kind === "client");
export const demoCases = cases.filter((c) => c.kind === "demo");

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
