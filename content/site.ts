export const site = {
  name: "Celeri",
  owner: "Ignacio Iturrieta",
  tagline: "Sitios web simples para negocios pequeños",
  whatsapp: "56964308294",
  email: "ignacio@celeri.cl",
  domain: "https://celeri.cl",

  /* Perfiles públicos vivos, para el `sameAs` del JSON-LD. Está vacío porque la
   * cuenta de Instagram todavía no existe: una referencia muerta no suma en
   * Google y sí resta confianza. Al agregar una URL aquí, entra sola al
   * JSON-LD — ver lib/jsonld.ts. */
  instagram: "",
} as const;
