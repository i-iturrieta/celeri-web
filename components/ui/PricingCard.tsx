import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Plan de precio.
 *
 * Existe como componente propio (y no como variante de Card) porque el precio
 * es parte central del producto y tiene un estado visual que ninguna otra
 * superficie usa: el destacado.
 *
 * REGLA DEL GLOW: `highlighted` enciende la única sombra de color del sistema.
 * Va en UN plan por pantalla. Si dos planes están destacados, ninguno lo está.
 *
 * Portado desde components/surfaces/PricingCard.jsx. Cambios: la lista de
 * features es un <ul> de verdad con el "+" marcado aria-hidden (si no, un
 * lector de pantalla lee "más" antes de cada línea), y el nombre del plan es
 * un encabezado, para que se pueda navegar la página por planes.
 */
export interface PricingCardProps {
  name: string;
  price: string;
  /** Precio de lista tachado, cuando el plan está en promoción. */
  originalPrice?: string;
  /** Etiqueta junto al nombre del plan: el "−30%" de la promoción. */
  badge?: ReactNode;
  period?: string;
  features?: string[];
  highlighted?: boolean;
  cta?: ReactNode;
  className?: string;
}

export default function PricingCard({
  name,
  price,
  originalPrice,
  badge,
  period,
  features = [],
  highlighted = false,
  cta,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "flex min-w-60 flex-col gap-4 rounded-lg border p-8",
        highlighted
          ? "glow-amber border-surface-accent bg-surface-inverse text-text-on-inverse"
          : "border-border-subtle bg-surface-card text-text-primary shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3
          className={cn(
            "label-mono",
            highlighted ? "text-surface-accent" : "text-text-muted",
          )}
        >
          {name}
        </h3>
        {badge}
      </div>

      <div>
        <p className="flex items-baseline gap-1.5">
          <span className="font-display text-4xl font-extrabold">{price}</span>
          {period && (
            <span
              className={cn(
                "text-sm",
                highlighted ? "text-text-on-inverse-muted" : "text-text-muted",
              )}
            >
              {period}
            </span>
          )}
        </p>

        {/* "antes" va visible y no como texto solo para lectores: un número
            tachado al lado de otro se entiende por contexto en pantalla, pero
            leído en voz alta serían dos precios seguidos sin explicación. */}
        {originalPrice && (
          <p
            className={cn(
              "mt-1 text-sm",
              highlighted ? "text-text-on-inverse-muted" : "text-text-muted",
            )}
          >
            antes <s>{originalPrice}</s>
          </p>
        )}
      </div>

      <ul className="flex list-none flex-col gap-2 p-0">
        {features.map((ft) => (
          <li
            key={ft}
            className={cn(
              "flex gap-2 text-sm",
              highlighted ? "text-text-on-inverse-muted" : "text-text-secondary",
            )}
          >
            <span aria-hidden="true" className="text-surface-accent">
              +
            </span>
            {ft}
          </li>
        ))}
      </ul>

      {cta && <div className="mt-auto pt-2">{cta}</div>}
    </div>
  );
}
