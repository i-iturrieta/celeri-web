"use client";

import { useEffect } from "react";
import { waLink } from "@/lib/whatsapp";
import Container from "@/components/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // El `digest` es lo que permite cruzar este fallo con los logs de Vercel.
    console.error("Error en la página:", error.digest ?? error.message);
  }, [error]);

  return (
    <Container width="narrow" className="py-24 text-center">
      <p className="text-eyebrow text-accent-dark uppercase">Algo falló</p>
      <h1 className="mt-4 font-display text-h1 text-ink">
        Se cayó esta página
      </h1>
      <p className="mx-auto mt-5 max-w-[480px] text-lead text-ink-muted">
        Es un problema mío, no tuyo. Puedes intentarlo de nuevo, y si sigue
        pasando escríbeme y lo reviso.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="focus-ring transition-brand inline-flex items-center rounded-lg bg-brand px-7 py-4 text-base font-semibold text-ink-inverse hover:bg-brand-dark"
        >
          Intentar de nuevo
        </button>
        <a
          href={waLink("Hola, me apareció un error en tu sitio web")}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring transition-brand inline-flex items-center rounded-lg border-[1.5px] border-ink/20 px-7 py-4 text-base font-semibold text-ink hover:border-brand hover:text-brand"
        >
          Avisarme por WhatsApp
        </a>
      </div>
    </Container>
  );
}
