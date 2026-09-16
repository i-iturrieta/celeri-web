export const site = {
  name: "Celeri",
  owner: "Ignacio Iturrieta",
  /**
   * La bajada de una línea. La usan la meta description por defecto, el
   * JSON-LD y el pie de las tarjetas de compartir, así que tiene que
   * sostenerse sola, fuera de contexto.
   *
   * Dice qué hace el sitio, no cómo es. Antes decía "sitios web simples": el
   * adjetivo buscaba señalar "sin sobreingeniería" pero llegaba como "poca
   * cosa", y era lo primero que leía alguien evaluando si contratarte.
   */
  tagline: "Sitios web para negocios pequeños que hacen que te escriban",
  whatsapp: "56964308294",
  email: "ignacio@celeri.cl",
  domain: "https://celeri.cl",

  /* Perfiles públicos vivos, para el `sameAs` del JSON-LD. Está vacío porque la
   * cuenta de Instagram todavía no existe: una referencia muerta no suma en
   * Google y sí resta confianza. Al agregar una URL aquí, entra sola al
   * JSON-LD — ver lib/jsonld.ts. */
  instagram: "",
} as const;
