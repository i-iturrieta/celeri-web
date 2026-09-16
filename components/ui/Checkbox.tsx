import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Casilla de verificación.
 *
 * Portado desde components/forms/Checkbox.jsx. El original ocultaba el input
 * con `display:none`, lo que además de esconderlo lo saca del orden de
 * tabulación y del árbol de accesibilidad: no se podía marcar con teclado y un
 * lector de pantalla no lo encontraba. Acá el input real sigue ahí, tapado con
 * `sr-only`, y la caja de al lado se pinta desde su estado con `peer-*`.
 *
 * Efecto secundario: el estado visual es CSS puro, sin useState, así que esto
 * no necesita ser client component.
 *
 * Ojo con `peer-*`: solo alcanza a HERMANOS del input. El tilde vive dentro de
 * la caja, no al lado del input, así que se pinta desde la caja con
 * `peer-checked:[&>svg]:…` y no con un `peer-checked:` puesto en el svg.
 */
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> {
  label?: ReactNode;
  className?: string;
}

export default function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 text-sm text-text-primary",
        "has-disabled:cursor-not-allowed has-disabled:opacity-50",
        className,
      )}
    >
      <input type="checkbox" className="peer sr-only" {...rest} />

      <span
        className={cn(
          "transition-brand flex size-[18px] shrink-0 items-center justify-center rounded-sm border-[1.5px] border-border-default bg-surface-card text-ink-950",
          "peer-checked:border-surface-accent peer-checked:bg-surface-accent",
          "peer-checked:[&>svg]:opacity-100",
          /* El anillo va en la caja dibujada, porque el input real es sr-only
             y su propio outline no se vería en ningún lado. */
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-focus-ring",
        )}
      >
        <svg
          width="11"
          height="9"
          viewBox="0 0 11 9"
          fill="none"
          aria-hidden="true"
          className="opacity-0 transition-opacity"
        >
          <path
            d="M1 4.5L4 7.5L10 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {label}
    </label>
  );
}
