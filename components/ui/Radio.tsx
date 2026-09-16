import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Opción de un grupo excluyente.
 *
 * Portado desde components/forms/Radio.jsx, con el mismo arreglo que Checkbox:
 * el input real queda `sr-only` en vez de `display:none`, así sigue siendo
 * enfocable y navegable con flechas dentro del grupo. Y como en Checkbox, el
 * punto interior se pinta desde el aro (`peer-checked:[&>span]:…`), porque
 * `peer-*` no atraviesa niveles.
 *
 * Quien lo use tiene que envolver el grupo en un <fieldset> con <legend>, o
 * las opciones se anuncian sueltas y sin la pregunta que las agrupa.
 */
export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> {
  label?: ReactNode;
  className?: string;
}

export default function Radio({ label, className, ...rest }: RadioProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 text-sm text-text-primary",
        "has-disabled:cursor-not-allowed has-disabled:opacity-50",
        className,
      )}
    >
      <input type="radio" className="peer sr-only" {...rest} />

      <span
        className={cn(
          "transition-brand flex size-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-border-default",
          "peer-checked:border-surface-accent",
          "peer-checked:[&>span]:scale-100",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-focus-ring",
        )}
      >
        <span
          aria-hidden="true"
          className="size-[9px] scale-0 rounded-full bg-surface-accent transition-transform"
        />
      </span>

      {label}
    </label>
  );
}
