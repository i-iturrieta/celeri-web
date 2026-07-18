export type CaseStudy = {
  slug: string;
  client: string;
  url: string;
  summary: string;
  image: string;
  tags: string[];
};

export const cases: CaseStudy[] = [
  {
    slug: "mirador-propiedades",
    client: "Mirador Propiedades",
    url: "https://www.miradorpropiedades.cl/",
    summary:
      "Antes de dibujar una sola pantalla, dediqué tiempo a entender cómo se mueve una propiedad desde que está disponible hasta que se reserva — porque eso, no un catálogo bonito, era lo que el sitio tenía que resolver.",
    image: "/cases/mirador-hero.png",
    tags: [
      "Panel de administración a medida",
      "Catálogo con filtros y mapa",
      "Gestión de leads (email + WhatsApp)",
      "SEO técnico (sitemap dinámico)",
    ],
  },
];
