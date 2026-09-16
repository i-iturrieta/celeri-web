import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  /** `h2` por defecto; usa `h1` cuando encabeza una página. */
  as?: "h1" | "h2";
  /** Va a la derecha del título, alineado a su línea base: un link de "ver todos". */
  aside?: ReactNode;
};

/**
 * Encabezado de sección.
 *
 * Lo que se fue de acá: el `eyebrow` en mayúsculas espaciadas. Estaba sobre las
 * cuatro secciones de cada página diciendo "SERVICIOS" encima de un título que
 * ya decía servicios — no aportaba información, solo ocupaba una línea, y una
 * micro-etiqueta en versalitas sobre cada título es el tic más reconocible de
 * una plantilla.
 *
 * Lo que lo reemplaza es estructura real: una regla fina que marca dónde
 * empieza la sección. Divide, que es lo que el eyebrow fingía hacer.
 *
 * No tiene variante para fondo oscuro: la única sección oscura del sitio es la
 * banda de cierre, y esa escribe su propio encabezado porque además centra el
 * bloque y monta el botón.
 */
export default function SectionHeading({
  title,
  subtitle,
  as: Tag = "h2",
  aside,
}: SectionHeadingProps) {
  return (
    <div className="border-t rule pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
        <Tag
          className={`font-display max-w-[20ch] text-balance text-text-primary ${
            Tag === "h1" ? "text-h1" : "text-h2"
          }`}
        >
          {title}
        </Tag>
        {aside}
      </div>
      {subtitle && (
        <p className="mt-5 max-w-[58ch] text-body text-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}
