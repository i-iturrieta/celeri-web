import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Aviso breve sobre algo que acaba de pasar.
 *
 * Portado desde components/feedback/Toast.jsx, agregando lo que lo vuelve
 * audible: `role="status"` + `aria-live`. Sin eso el aviso aparece en pantalla
 * y quien usa lector de pantalla no se entera de nada — que es justo el caso
 * en que más falta hace ("tu mensaje se envió").
 *
 * `danger` va con aria-live="assertive" porque interrumpe: un error no puede
 * esperar a que termine de leerse otra cosa.
 *
 * El punto de color NO es la única señal: el título dice qué pasó. Un punto
 * rojo, solo, no lo distingue quien no distingue rojo.
 */
type Variant = "success" | "danger" | "info" | "neutral";

export interface ToastProps {
  variant?: Variant;
  title?: ReactNode;
  description?: ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const dots: Record<Variant, string> = {
  success: "bg-success",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-surface-accent",
};

export default function Toast({
  variant = "info",
  title,
  description,
  onClose,
  className,
}: ToastProps) {
  return (
    <div
      role="status"
      aria-live={variant === "danger" ? "assertive" : "polite"}
      className={cn(
        "flex min-w-[260px] items-start gap-3 rounded-md bg-surface-inverse px-4 py-3.5 text-text-on-inverse shadow-lg",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("mt-1.5 size-2 shrink-0 rounded-full", dots[variant])}
      />

      <div className="flex-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && (
          <div className="mt-0.5 text-xs text-text-on-inverse-muted">
            {description}
          </div>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar aviso"
          className="focus-ring cursor-pointer leading-none text-text-on-inverse-muted hover:text-text-on-inverse"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
}
