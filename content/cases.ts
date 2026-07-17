export type CaseStudy = {
  slug: string;
  client: string;
  url: string;
  summary: string;
  images: string[];
  tags: string[];
};

// Las imágenes en /public/cases/ son placeholders generados (no capturas reales).
// Reemplazar por 2-3 capturas reales de https://miradorpropiedades.cl antes de publicar.
export const cases: CaseStudy[] = [
  {
    slug: "mirador-propiedades",
    client: "Mirador Propiedades",
    url: "https://miradorpropiedades.cl",
    summary:
      "Antes de dibujar una sola pantalla, dediqué tiempo a entender cómo se mueve una propiedad desde que está disponible hasta que se reserva — porque eso, no un catálogo bonito, era lo que el sitio tenía que resolver.",
    images: ["/cases/mirador-1.png", "/cases/mirador-2.png", "/cases/mirador-3.png"],
    tags: ["Inmobiliaria", "Producción", "Next.js"],
  },
];
