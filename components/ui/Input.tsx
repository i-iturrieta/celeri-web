"use client";

import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Campo de texto con label, ayuda y error.
 *
 * Portado desde components/forms/Input.jsx. Dos cosas que el original no hacía
 * y acá sí:
 *   - el label apunta al input por htmlFor/id, así que hacer clic en el texto
 *     enfoca el campo y un lector de pantalla lo anuncia con su nombre;
 *   - el error se enlaza por aria-describedby y se marca con aria-invalid, que
 *     es lo que hace que la ayuda se lea en voz alta al llegar al campo.
 *
 * El error nunca es solo color: si hay `error`, el texto está ahí abajo. Rojo
 * sin texto no lo ve quien no distingue rojo.
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className,
  type = "text",
  id,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;
  const message = error ?? helperText;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cn(
          "transition-brand rounded-md border bg-surface-card px-3.5 py-2.5 text-base text-text-primary",
          "placeholder:text-text-muted",
          /* El foco se marca con el borde ámbar Y un halo: el borde solo es
             muy fino para verse de un vistazo en un formulario largo. */
          "outline-none focus:border-surface-accent focus:ring-3 focus:ring-surface-accent/25",
          error
            ? "border-danger focus:border-danger focus:ring-danger/25"
            : "border-border-default",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...rest}
      />

      {message && (
        <span
          id={messageId}
          className={cn("text-xs", error ? "text-danger" : "text-text-muted")}
        >
          {message}
        </span>
      )}
    </div>
  );
}
