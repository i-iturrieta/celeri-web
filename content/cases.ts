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
    image: "/cases/mirador-hero.webp",
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
  {
    slug: "waiki-chile",
    client: "Waiki Chile",
    url: "https://waikichile.cl/",
    kind: "client",
    summary:
      "Un rediseño completo partiendo solo de la marca, las imágenes y los textos que ya tenían: el contenido era bueno, lo que fallaba era cómo se llegaba a él.",
    image: "/cases/waiki-hero.webp",
    tags: [
      "Rediseño completo",
      "Catálogo de productos",
      "Calculadora de ahorro",
      "Diseño responsivo",
    ],
    problem:
      "Waiki fabrica estufas a pellet en Chile y tenía el contenido que un comprador necesita: equipos, accesorios, instalación. El problema no era qué decían, sino que el sitio se veía anticuado y costaba moverse por él — sobre todo desde el celular, que es donde la gente compara antes de decidir una compra de este tamaño.",
    work:
      "Rehice el sitio desde cero, pero sin partir de cero el contenido: reutilicé la marca, las fotos y los textos que ya existían, y trabajé sobre cómo se ordenan y cómo se llega a ellos. El resultado es una navegación más directa a los cuatro equipos, un catálogo con accesorios e instalaciones separados, y una calculadora de ahorro que responde la pregunta que todos hacen antes de comprar.",
    result:
      "El sitio proyecta una imagen mucho más actual, funciona bien en celular y el recorrido hasta el producto es más corto y más claro que antes.",
  },
  {
    slug: "boat-market",
    client: "Boat Market",
    url: "https://boatmarket.cl/",
    kind: "client",
    summary:
      "Una marca que existía pero no tenía dónde vivir, y embarcaciones que se vendían sin un lugar propio donde publicarlas.",
    image: "/cases/boatmarket-hero.webp",
    tags: [
      "Publicaciones autogestionables",
      "Catálogo con fichas técnicas",
      "Identidad consolidada",
      "Contacto directo por WhatsApp",
    ],
    problem:
      "Vendía embarcaciones sin un sitio propio donde publicarlas, así que cada lancha se mostraba de forma distinta según dónde apareciera y la marca no terminaba de cuajar en ninguna parte. Comprar una embarcación es una decisión grande, y quien la toma quiere ver ficha técnica y fotos reales antes de escribir.",
    work:
      "Construí el sitio alrededor de dos cosas: consolidar la marca en un lugar propio, y que pueda publicar y dar de baja embarcaciones por su cuenta, sin pedírmelo a mí. Cada publicación lleva ficha técnica — año, motor, horas de uso, eslora — con fotos propias en vez de imágenes de catálogo, y el contacto va directo al vendedor por WhatsApp.",
    result:
      "La marca quedó consolidada en un sitio propio y las embarcaciones se publican y se actualizan sin depender de mí.",
  },
];

export const clientCases = cases.filter((c) => c.kind === "client");
export const demoCases = cases.filter((c) => c.kind === "demo");

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
