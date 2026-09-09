import type { ElementType, ReactNode } from "react";

/** Anchos permitidos. No agregues uno nuevo sin una razón real. */
const WIDTHS = {
  /** Por defecto: rejillas y contenido de página completa. */
  default: "max-w-[1120px]",
  /** Texto corrido, para que la línea no pase de ~75 caracteres. */
  prose: "max-w-[720px]",
  /** Bloques centrados: cierres de CTA, mensajes de error. */
  narrow: "max-w-[800px]",
} as const;

type ContainerProps = {
  children: ReactNode;
  /** Etiqueta a renderizar. `div` por defecto; usa `section` para bloques de página. */
  as?: ElementType;
  width?: keyof typeof WIDTHS;
  className?: string;
};

/**
 * Ancho y padding horizontal únicos del sitio.
 *
 * Antes cada página elegía el suyo — home `1120px/px-6`, servicios
 * `max-w-5xl/px-4`, sobre-mí `max-w-3xl/px-4` — y por eso el contenido bailaba
 * de una página a otra. Usa `width` en vez de pasar un `max-w-*` por
 * `className`: dos utilidades `max-w` en la misma clase dependen del orden del
 * CSS generado, no del orden en que las escribes.
 */
export default function Container({
  children,
  as: Tag = "div",
  width = "default",
  className = "",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full ${WIDTHS[width]} px-6 ${className}`}>
      {children}
    </Tag>
  );
}
