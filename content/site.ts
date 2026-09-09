export const site = {
  name: "Celeri",
  owner: "Ignacio Iturrieta",
  tagline: "Sitios web profesionales para PyMEs que ya están creciendo",
  whatsapp: "56964308294",
  email: "ignacio@celeri.cl",
  domain: "https://celeri.cl",

  // Única fuente de verdad para la zona que se sirve. Antes esto estaba
  // repetido a mano en el home, el footer y los `description` de cada página.
  region: "Región de Los Lagos, Chile",
  regionShort: "Región de Los Lagos",
  addressRegion: "Los Lagos",
  addressCountry: "CL",

  /* Perfiles públicos vivos, para el `sameAs` del JSON-LD. Está vacío porque la
   * cuenta de Instagram todavía no existe: una referencia muerta no suma en
   * Google y sí resta confianza. Al agregar una URL aquí, entra sola al
   * JSON-LD — ver lib/jsonld.ts. */
  instagram: "",
} as const;
