"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Pestañas.
 *
 * Portado desde components/navigation/Tabs.jsx. El original pintaba una fila
 * de botones y nada más: sin roles ARIA no se anuncia como pestañas, y sin
 * manejo de flechas el teclado tiene que tabular por cada pestaña una por una
 * en vez de recorrerlas con ← →, que es como se espera que funcione.
 *
 * Acá va el patrón completo: role tablist/tab/tabpanel, aria-selected, y
 * "roving tabindex" — solo la pestaña activa es tabulable, y las flechas mueven
 * la selección. Home y End saltan a los extremos.
 */
export interface TabItem {
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs?: TabItem[];
  defaultIndex?: number;
  className?: string;
}

export default function Tabs({
  tabs = [],
  defaultIndex = 0,
  className,
}: TabsProps) {
  const [active, setActive] = useState(defaultIndex);
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  if (tabs.length === 0) return null;

  /* Mover la selección también mueve el foco: en este patrón la pestaña
   * enfocada y la seleccionada son la misma. */
  function select(i: number) {
    setActive(i);
    refs.current[i]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = tabs.length - 1;
    if (e.key === "ArrowRight") select(active === last ? 0 : active + 1);
    else if (e.key === "ArrowLeft") select(active === 0 ? last : active - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(last);
    else return;
    e.preventDefault();
  }

  return (
    <div className={className}>
      <div role="tablist" className="flex gap-6 border-b border-border-subtle">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown}
            className={cn(
              "focus-ring transition-brand -mb-px cursor-pointer border-b-2 px-0.5 py-2.5 text-sm font-semibold",
              active === i
                ? "border-surface-accent text-text-primary"
                : "border-transparent text-text-muted hover:text-text-secondary",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tabs.map((t, i) => (
        <div
          key={t.label}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="focus-ring py-5 text-text-secondary"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
