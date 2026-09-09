/**
 * Inserta un bloque JSON-LD. El escape de `<` evita que un texto de contenido
 * pueda cerrar la etiqueta <script> antes de tiempo.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
