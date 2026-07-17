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
      "Mirador Propiedades necesitaba un sitio que representara su cartera de propiedades con la misma seriedad con la que atienden a sus clientes. El trabajo partió por entender cómo opera el equipo — qué preguntas hacen los interesados, cómo se sigue una propiedad desde disponible hasta reservada — antes de tocar el diseño. El resultado es un sitio en producción real, no una maqueta: la prueba de que el método (entender el negocio primero, construir después) funciona más allá de un solo rubro.",
    images: ["/cases/mirador-1.png", "/cases/mirador-2.png", "/cases/mirador-3.png"],
    tags: ["Inmobiliaria", "Producción", "Next.js"],
  },
];
