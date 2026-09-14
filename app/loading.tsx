import Container from "@/components/Container";

/**
 * Esqueleto de carga. El sitio es estático y casi siempre se pinta al instante,
 * así que esto solo se ve en una conexión mala — pero ahí es justo donde una
 * pantalla en blanco se lee como "no cargó".
 *
 * Las formas siguen la silueta real de una página: titular grande, bajada, y
 * después filas separadas por reglas, que es como está construido el sitio
 * ahora. Un esqueleto de tarjetas prometería algo que ya no existe.
 */
export default function Loading() {
  return (
    <Container className="py-24">
      <div className="animate-pulse" aria-hidden="true">
        <div className="h-14 w-4/5 bg-ink/[0.07]" />
        <div className="mt-4 h-14 w-2/5 bg-ink/[0.07]" />
        <div className="mt-9 h-4 w-1/2 bg-ink/[0.07]" />

        <div className="mt-20 border-b rule">
          {[0, 1, 2].map((i) => (
            <div key={i} className="border-t rule py-10">
              <div className="h-7 w-1/3 bg-ink/[0.07]" />
              <div className="mt-4 h-4 w-2/3 bg-ink/[0.07]" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only" role="status">
        Cargando…
      </span>
    </Container>
  );
}
