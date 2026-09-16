"use client";

import { useId, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Select nativo, no una lista desplegable propia.
 *
 * Es a propósito: el select del sistema operativo ya funciona con teclado, con
 * lector de pantalla y con el selector de rueda en móvil. Reimplementarlo para
 * poder pintar la flecha es cambiar todo eso por nada.
 *
 * Portado desde components/forms/Select.jsx, agregando la asociación
 * label/control que el original no tenía.
 */
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  label?: string;
  options?: SelectOption[];
  className?: string;
}

export default function Select({
  label,
  options = [],
  className,
  id,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
        </label>
      )}

      <select
        id={selectId}
        className={cn(
          "transition-brand cursor-pointer rounded-md border border-border-default bg-surface-card px-3.5 py-2.5 text-base text-text-primary",
          "outline-none focus:border-surface-accent focus:ring-3 focus:ring-surface-accent/25",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
