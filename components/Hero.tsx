import Link from "next/link";
import { waLink } from "@/lib/whatsapp";
import { clientCases } from "@/content/cases";
import Container from "@/components/Container";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui";

/**
 * Portada del home.
 *
 * Es uno de los tres bloques oscuros macizos que el design system nombra
 * (nav, hero, pie). Antes era papel con dos manchas de luz derivando por
 * detrás del titular; se fueron las dos. Eran gradientes radiales con blur —
 * el sistema pide fondos de color plano y dice "no gradients" sin matices — y
 * además eran el único movimiento del sitio que nadie disparaba.
 *
 * Lo que sí queda es la entrada escalonada al cargar: un solo momento
 * orquestado, no un fade-up por sección al hacer scroll. El escalonado va por
 * --rise-delay desde acá.
 *
 * El titular se lleva todo el presupuesto tipográfico y lo de alrededor se
 * mantiene callado a propósito.
 */
export default function Hero() {
  return (
    <section className="bg-surface-inverse">
      <Container className="pt-20 pb-16 sm:pt-28 sm:pb-24">
        {/* El eyebrow en mono es el recurso del sistema para las etiquetas, y
            acá además dice algo útil: que hay disponibilidad. */}
        <p
          className="rise label-mono text-surface-accent"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          {"// disponible para proyectos"}
        </p>

        <h1
          className="rise font-display mt-5 max-w-[16ch] text-5xl leading-tight font-bold tracking-tight text-balance text-text-on-inverse"
          style={{ "--rise-delay": "60ms" } as React.CSSProperties}
        >
          Sitios web simples, hechos por una sola persona
        </h1>

        <p
          className="rise mt-6 max-w-[52ch] text-lg/relaxed text-text-on-inverse-muted"
          style={{ "--rise-delay": "180ms" } as React.CSSProperties}
        >
          Converso contigo antes de diseñar nada, porque cada negocio funciona
          distinto. Después diseño y programo yo mismo, sin pasarte a un equipo
          que no conoces.
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center gap-3.5"
          style={{ "--rise-delay": "290ms" } as React.CSSProperties}
        >
          <Button
            size="lg"
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            icon={<WhatsAppIcon className="h-[18px] w-[18px]" />}
          >
            Hablemos por WhatsApp
          </Button>

          <Button size="lg" variant="outline-inverse" href="/servicios">
            Ver qué puedo hacer
          </Button>
        </div>
      </Container>

      {/* Prueba, no adorno: los negocios reales que están en línea ahora mismo,
          arriba del pliegue y antes de cualquier promesa. */}
      {clientCases.length > 0 && (
        <Container
          className="rise border-t border-border-inverse pt-7 pb-9"
          style={{ "--rise-delay": "420ms" } as React.CSSProperties}
        >
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <p className="label-mono text-text-on-inverse-muted">
              En línea ahora mismo
            </p>
            <ul className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
              {clientCases.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/casos/${c.slug}`}
                    className="focus-ring transition-brand font-display text-[17px] font-semibold text-text-on-inverse hover:text-surface-accent"
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
