import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Etiqueta de estado, corta y en mono mayúscula.
 *
 * Badge describe un ESTADO ("agotado", "nuevo", "en pausa"). Si lo que querés
 * es una categoría que el usuario puede tocar o sacar, eso es Tag.
 *
 * Portado desde components/feedback/Badge.jsx.
 */
type Variant = "neutral" | "accent" | "success" | "danger" | "outline";

export interface BadgeProps {
  variant?: Variant;
  children?: ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  neutral: "border-transparent bg-surface-sunken text-text-secondary",
  accent: "border-transparent bg-surface-accent-tint text-text-accent",
  success: "border-transparent bg-success-tint text-success-ink",
  danger: "border-transparent bg-danger-tint text-danger-ink",
  outline: "border-border-default bg-transparent text-text-secondary",
};

export default function Badge({
  variant = "neutral",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-xs tracking-wide uppercase",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
