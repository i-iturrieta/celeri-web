import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Aclaración corta al pasar por encima.
 *
 * Portado desde components/feedback/Tooltip.jsx. El original solo reaccionaba
 * a mouseenter/mouseleave: quien navega con teclado nunca lo veía, y como el
 * texto se montaba y desmontaba, un lector de pantalla tampoco lo anunciaba.
 * Acá el contenido está siempre en el DOM y se muestra con `group-hover` y
 * `group-focus-within`, así que también aparece al tabular hasta el elemento.
 *
 * Al estar resuelto en CSS no necesita useState y sigue siendo Server
 * Component.
 *
 * Un tooltip nunca es el único lugar donde vive una información: se pierde en
 * touch, donde no hay hover. Si el dato importa, escribilo en la página.
 */
export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom";
  className?: string;
}

const placements = {
  top: "bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2",
  bottom: "top-[calc(100%+8px)] left-1/2 -translate-x-1/2",
} as const;

export default function Tooltip({
  content,
  children,
  placement = "top",
  className,
}: TooltipProps) {
  return (
    <span className={cn("group relative inline-block", className)}>
      {children}

      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-10 rounded-sm bg-surface-inverse px-2.5 py-1.5 text-xs whitespace-nowrap text-text-on-inverse shadow-md",
          "opacity-0 transition-opacity duration-120 ease-out",
          "group-hover:opacity-100 group-focus-within:opacity-100",
          placements[placement],
        )}
      >
        {content}
      </span>
    </span>
  );
}
