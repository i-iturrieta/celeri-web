import type { CSSProperties, ElementType, ReactNode } from "react";

/** Anchos permitidos. No agregues uno nuevo sin una razón real. */
const WIDTHS = {
  /** Por defecto: rejillas y contenido de página completa. */
  default: "max-w-[1180px]",
  /** Texto corrido, para que la línea no pase de ~72 caracteres. */
  prose: "max-w-[68ch]",
  /** Bloques centrados: cierres de CTA, mensajes de error. */
  narrow: "max-w-[820px]",
} as const;

type ContainerProps = {
  children: ReactNode;
  /** Etiqueta a renderizar. `div` por defecto; usa `section` para bloques de página. */
  as?: ElementType;
  width?: keyof typeof WIDTHS;
  className?: string;
  style?: CSSProperties;
};

/**
 * Ancho y padding horizontal únicos del sitio.
 *
 * Usa `width` en vez de pasar un `max-w-*` por `className`: dos utilidades
 * `max-w` en la misma clase dependen del orden del CSS generado, no del orden
 * en que las escribes.
 */
export default function Container({
  children,
  as: Tag = "div",
  width = "default",
  className = "",
  style,
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full ${WIDTHS[width]} px-6 sm:px-8 ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
