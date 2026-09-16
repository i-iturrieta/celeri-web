"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Modal.
 *
 * Portado desde components/feedback/Dialog.jsx, pero sobre el <dialog> nativo
 * en vez de un <div> con position:fixed. El original pintaba bien y no hacía
 * nada de lo que un modal tiene que hacer: no atrapaba el foco (se podía
 * tabular hasta la página de atrás), no cerraba con Escape, no devolvía el
 * foco al elemento que lo abrió y no se anunciaba como diálogo.
 *
 * `showModal()` da las cuatro cosas gratis, además de volver inerte el resto
 * de la página y bloquear el scroll de fondo. Es bastante menos código que
 * implementar un focus trap a mano, y no se rompe.
 *
 * El scrim y el radio salen de los tokens; el `backdrop:` de Tailwind pinta
 * el ::backdrop nativo.
 */
export interface DialogProps {
  open: boolean;
  title?: string;
  children?: ReactNode;
  onClose: () => void;
  actions?: ReactNode;
  className?: string;
}

export default function Dialog({
  open,
  title,
  children,
  onClose,
  actions,
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* `open` es la fuente de verdad, pero showModal() sobre un diálogo ya
     * abierto tira InvalidStateError, así que hay que mirar el estado real. */
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={title ? "dialog-title" : undefined}
      /* Lo dispara Escape y también close(). Es el único lugar donde avisamos
       * hacia arriba, así el estado del padre nunca queda desincronizado. */
      onClose={onClose}
      /* El <dialog> ocupa solo su caja, así que un clic "afuera" cae sobre el
       * propio elemento y no sobre su contenido. */
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        "m-auto w-[min(480px,calc(100vw-2rem))] rounded-lg bg-surface-card p-8 text-text-primary shadow-lg",
        "backdrop:bg-ink-950/50",
        className,
      )}
    >
      {title && (
        <h2
          id="dialog-title"
          className="mb-4 font-display text-xl font-bold text-text-primary"
        >
          {title}
        </h2>
      )}

      <div className="text-base/normal text-text-secondary">{children}</div>

      {actions && (
        <div className="mt-6 flex justify-end gap-3">{actions}</div>
      )}
    </dialog>
  );
}
