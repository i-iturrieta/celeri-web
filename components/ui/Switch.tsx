import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Interruptor de encendido/apagado.
 *
 * Portado desde components/forms/Switch.jsx. Mismo arreglo de accesibilidad
 * que Checkbox y Radio, más `role="switch"`: sin eso se anuncia como "casilla
 * de verificación", que no es lo mismo — una casilla se marca, un interruptor
 * se enciende y su efecto es inmediato.
 *
 * Es el único control del sistema que mueve algo (la perilla se desliza), y va
 * a 200ms, la duración base. Todo lo demás cambia de color y nada más.
 */
export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> {
  label?: ReactNode;
  className?: string;
}

export default function Switch({ label, className, ...rest }: SwitchProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5 text-sm text-text-primary",
        "has-disabled:cursor-not-allowed has-disabled:opacity-50",
        className,
      )}
    >
      <input type="checkbox" role="switch" className="peer sr-only" {...rest} />

      <span
        className={cn(
          "relative h-[22px] w-10 shrink-0 rounded-full bg-border-default",
          "transition-colors duration-200 ease-out",
          "peer-checked:bg-surface-accent",
          "peer-checked:[&>span]:left-5",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-focus-ring",
        )}
      >
        <span
          aria-hidden="true"
          className="absolute top-0.5 left-0.5 size-[18px] rounded-full bg-paper-0 shadow-sm transition-[left] duration-200 ease-out"
        />
      </span>

      {label}
    </label>
  );
}
