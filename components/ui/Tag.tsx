import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Categoría o filtro. A diferencia de Badge, se puede tocar y se puede sacar.
 *
 * Portado desde components/feedback/Tag.jsx, con dos arreglos:
 *   - el original ponía onClick sobre un <span>, así que con teclado no había
 *     forma de activarlo. Si viene `onClick`, acá el cuerpo es un <button> de
 *     verdad;
 *   - el original anidaba el botón de quitar dentro del elemento clickeable.
 *     Un botón dentro de otro botón es HTML inválido y los navegadores lo
 *     reparan como quieren. Acá los dos botones son hermanos dentro de un span.
 */
export interface TagProps {
  children?: ReactNode;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  /** Qué se quita, para el lector de pantalla: "Quitar {removeLabel}". */
  removeLabel?: string;
  className?: string;
}

export default function Tag({
  children,
  selected = false,
  onClick,
  onRemove,
  removeLabel,
  className,
}: TagProps) {
  const skin = selected
    ? "border-ink-950 bg-ink-950 text-text-on-inverse"
    : "border-border-subtle bg-surface-sunken text-text-secondary";

  return (
    <span
      className={cn(
        "transition-brand inline-flex items-center gap-1.5 rounded-md border py-[5px] pr-2.5 pl-3 text-sm font-medium",
        skin,
        className,
      )}
    >
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          aria-pressed={selected}
          className="focus-ring cursor-pointer"
        >
          {children}
        </button>
      ) : (
        children
      )}

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel ? `Quitar ${removeLabel}` : "Quitar"}
          className="focus-ring cursor-pointer leading-none opacity-60 hover:opacity-100"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </span>
  );
}
