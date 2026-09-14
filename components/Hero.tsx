import Link from "next/link";
import { waLink } from "@/lib/whatsapp";
import { clientCases } from "@/content/cases";
import Container from "@/components/Container";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/**
 * Portada del home.
 *
 * Es el único lugar del sitio con movimiento que el usuario no disparó: dos
 * manchas de luz derivando muy lento por detrás del titular, y una entrada
 * escalonada al cargar. Deliberadamente concentrado acá — un fade-up por cada
 * sección al hacer scroll es lo que hace que un sitio se lea como plantilla, y
 * además cansa cuando el visitante vuelve por segunda vez.
 *
 * El titular es el elemento memorable de la página y por eso se lleva todo el
 * presupuesto: 92px en Fraunces con los ejes abiertos. Lo de alrededor se
 * mantiene callado a propósito.
 */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      {/* Campo de luz. aria-hidden y pointer-events-none: no es contenido y no
          debe interceptar clics del titular que tiene encima. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="drift-a absolute -top-[28%] -right-[12%] h-[780px] w-[780px] rounded-full bg-petrol-wash opacity-70 blur-[110px]" />
        {/* El latón acá va muy bajo y empujado fuera del lienzo. A más
            saturación teñía de beige toda la esquina inferior izquierda —
            justo por detrás del titular — y en vez de luz se leía como una
            mancha. Lo justo para que el campo no quede clínicamente frío. */}
        <div className="drift-b absolute -bottom-[58%] -left-[28%] h-[620px] w-[620px] rounded-full bg-brass/[0.10] blur-[150px]" />
      </div>

      <Container className="relative pt-20 pb-16 sm:pt-32 sm:pb-24">
        <h1
          className="rise font-display max-w-[15ch] text-display text-balance text-ink"
          style={{ "--rise-delay": "60ms" } as React.CSSProperties}
        >
          Sitios web simples, hechos por una sola persona
        </h1>

        <p
          className="rise mt-8 max-w-[52ch] text-lead text-ink-muted"
          style={{ "--rise-delay": "180ms" } as React.CSSProperties}
        >
          Converso contigo antes de diseñar nada, porque cada negocio funciona
          distinto. Después diseño y programo yo mismo, sin pasarte a un equipo
          que no conoces.
        </p>

        <div
          className="rise mt-11 flex flex-wrap items-center gap-x-9 gap-y-5"
          style={{ "--rise-delay": "290ms" } as React.CSSProperties}
        >
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring transition-brand inline-flex items-center gap-2.5 bg-petrol px-7 py-4 text-small font-medium text-on-dark hover:bg-petrol-deep"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Hablemos por WhatsApp
          </a>

          {/* El secundario es un link subrayado, no un segundo botón con borde:
              dos botones del mismo tamaño compiten y ninguno gana. */}
          <Link
            href="/servicios"
            className="focus-ring transition-brand text-small font-medium text-ink underline decoration-ink/30 decoration-1 underline-offset-[6px] hover:decoration-petrol hover:decoration-2 hover:text-petrol"
          >
            Ver qué puedo hacer
          </Link>
        </div>
      </Container>

      {/* Prueba, no adorno: los tres negocios reales que están en línea ahora
          mismo, arriba del pliegue y antes de cualquier promesa. */}
      {clientCases.length > 0 && (
        <Container
          className="rise relative border-t rule pt-7 pb-9"
          style={{ "--rise-delay": "420ms" } as React.CSSProperties}
        >
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <p className="text-micro text-ink-subtle">
              En línea ahora mismo
            </p>
            <ul className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
              {clientCases.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/casos/${c.slug}`}
                    className="focus-ring transition-brand font-display-text text-[17px] text-ink hover:text-petrol"
                  >
                    {c.client}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      )}
    </section>
  );
}
