import type { ReactNode } from "react";
import Container from "@/components/Container";

type PageHeaderProps = {
  title: string;
  lead?: string;
  /** Acciones o metadatos bajo la bajada. */
  children?: ReactNode;
};

/**
 * Apertura de las páginas internas.
 *
 * Va sobre caliza para que cada página empiece con un cambio de superficie y no
 * con el mismo plano de fondo que trae el resto del scroll. Es la misma idea
 * que el campo de luz del hero — que el ojo registre "empezó algo" — resuelta
 * con un tono en vez de con movimiento, porque el movimiento es del home.
 */
export default function PageHeader({ title, lead, children }: PageHeaderProps) {
  return (
    <section className="border-b rule bg-limestone">
      <Container className="pt-16 pb-16 sm:pt-24 sm:pb-20">
        <h1 className="font-display max-w-[16ch] text-h1 text-balance text-ink">
          {title}
        </h1>
        {lead && (
          <p className="mt-7 max-w-[56ch] text-lead text-ink-muted">{lead}</p>
        )}
        {children}
      </Container>
    </section>
  );
}
