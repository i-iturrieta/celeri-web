import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Botón cuadrado de un solo icono.
 *
 * `label` es obligatorio y no es decorativo: es el nombre accesible del botón.
 * Un botón que solo contiene un SVG no tiene texto que anunciar, así que sin
 * esto un lector de pantalla dice "botón" y nada más.
 *
 * Portado desde components/forms/IconButton.jsx. El original hacía el hover
 * bajando la opacidad a 0.85; acá es un cambio de color sólido, que es lo que
 * pide el design system por escrito ("never opacity fades").
 */

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: Variant;
  size?: Size;
  icon: ReactNode;
  label: string;
  className?: string;
}

const sizes: Record<Size, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

const variants: Record<Variant, string> = {
  primary:
    "border-transparent bg-surface-accent text-ink-950 hover:bg-surface-accent-hover",
  secondary:
    "border-transparent bg-surface-inverse text-text-on-inverse hover:bg-surface-inverse-raised",
  outline:
    "border-border-default bg-transparent text-text-primary hover:border-text-primary",
  ghost:
    "border-transparent bg-transparent text-text-primary hover:bg-surface-sunken",
};

export default function IconButton({
  variant = "ghost",
  size = "md",
  icon,
  label,
  className,
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "focus-ring transition-brand inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border",
        "disabled:cursor-not-allowed disabled:opacity-50",
        sizes[size],
        variants[variant],
        className,
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}
