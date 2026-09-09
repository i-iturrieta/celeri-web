import Container from "@/components/Container";

/**
 * Esqueleto de carga. El sitio es estático y casi siempre se pinta al instante,
 * así que esto solo se ve en una conexión mala — pero ahí es justo donde una
 * pantalla en blanco se lee como "no cargó".
 */
export default function Loading() {
  return (
    <Container className="py-16">
      <div className="animate-pulse space-y-4" aria-hidden="true">
        <div className="h-4 w-32 rounded bg-ink/10" />
        <div className="h-12 w-3/4 rounded bg-ink/10" />
        <div className="h-4 w-1/2 rounded bg-ink/10" />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="h-44 rounded-2xl bg-ink/10" />
          <div className="h-44 rounded-2xl bg-ink/10" />
          <div className="h-44 rounded-2xl bg-ink/10" />
        </div>
      </div>
      <span className="sr-only" role="status">
        Cargando…
      </span>
    </Container>
  );
}
