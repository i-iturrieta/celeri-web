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
    <Container width="narrow" className="py-28 sm:py-36">
      <p className="text-small text-ink-subtle">Algo falló</p>
      <h1 className="font-display mt-5 max-w-[14ch] text-h1 text-balance text-ink">
        Se cayó esta página
      </h1>
      <p className="mt-7 max-w-[52ch] text-lead text-ink-muted">
        Es un problema mío, no tuyo. Puedes intentarlo de nuevo, y si sigue
        pasando escríbeme y lo reviso.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-5">
        <button
          type="button"
          onClick={reset}
          className="focus-ring transition-brand inline-flex items-center bg-petrol px-7 py-4 text-small font-medium text-on-dark hover:bg-petrol-deep"
        >
          Intentar de nuevo
        </button>
        <a
          href={waLink("Hola, me apareció un error en tu sitio web")}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring transition-brand text-small font-medium text-ink underline decoration-ink/30 decoration-1 underline-offset-[6px] hover:text-petrol hover:decoration-2 hover:decoration-petrol"
        >
          Avisarme por WhatsApp
        </a>
      </div>
    </Container>
  );
}
