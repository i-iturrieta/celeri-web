import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Tarjeta de contenido: relleno plano, hairline de 1px, sombra suave, radio 14.
 *
 * Portado desde components/surfaces/Card.jsx. Sin borde de color a la
 * izquierda y sin icono dentro de un círculo — el design system prohíbe los
 * dos por nombre.
 *
 * El original recibía `onClick` y lo colgaba de un <div>, que no es enfocable
 * ni activable con teclado. Acá una tarjeta navegable se arma pasando `href`,
 * y el link cubre la tarjeta entera desde el título (`after:absolute`), así el
 * nombre accesible del enlace es el título y no "leer más".
 */
export interface CardProps {
  image?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  tags?: ReactNode;
  footer?: ReactNode;
  /** Si viene, la tarjeta entera es un enlace hacia acá. */
  href?: string;
  className?: string;
}

export default function Card({
  image,
  eyebrow,
  title,
  description,
  tags,
  footer,
  href,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "transition-brand relative overflow-hidden rounded-lg border border-border-subtle bg-surface-card shadow-sm",
        href && "hover:border-border-default hover:shadow-md",
        className,
      )}
    >
      {image && (
        <div className="aspect-16/10 overflow-hidden bg-surface-sunken">
          {image}
        </div>
      )}

      <div className="p-5">
        {eyebrow && (
          <div className="label-mono mb-1.5 text-text-accent">{eyebrow}</div>
        )}

        {title && (
          <h3 className="font-display text-lg font-bold text-text-primary">
            {href ? (
              <a
                href={href}
                className="focus-ring after:absolute after:inset-0 after:content-['']"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
        )}

        {description && (
          <p className="mt-1.5 text-sm/normal text-text-secondary">
            {description}
          </p>
        )}

        {/* Por encima del link que cubre la tarjeta, o los tags no se pueden
            tocar. */}
        {tags && (
          <div className="relative z-1 mt-3 flex flex-wrap gap-1.5">{tags}</div>
        )}

        {footer && <div className="relative z-1 mt-3.5">{footer}</div>}
      </div>
    </div>
  );
}
