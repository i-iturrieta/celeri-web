import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { navaja } from "@/content/navaja";
import Container from "@/components/Container";
import { Button } from "@/components/ui";

/**
 * Navaja, el proyecto propio.
 *
 * Es una nota al margen que prueba oficio, no la vitrina: por eso va más
 * callada que los casos. Sin ViewTransition ni CaseOutline (la firma del sitio
 * es de las tarjetas de caso, y esto no es un caso), sin ámbar y con un botón
 * `outline`, el más callado — el primario de la vista ya lo tiene el hero del home.
 *
 * Los puntos van como lista sobre reglas, igual que las fichas de los casos:
 * nada de iconos dentro de círculos.
 */
export default function NavajaShowcase() {
  return (
    <section className="border-t rule">
      <Container className="section-base">
        <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div>
            <p className="label-mono text-text-muted">{navaja.eyebrow}</p>
            <h2 className="font-display text-h2 mt-4 max-w-[24ch] text-balance text-text-primary">
              {navaja.title}
            </h2>
            <p className="mt-5 max-w-[56ch] text-body text-text-secondary">
              {navaja.lead}
            </p>

            <ul className="mt-8 border-t rule">
              {navaja.points.map((point) => (
                <li
                  key={point}
                  className="border-b rule py-4 text-small text-text-primary"
                >
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-[56ch] text-small text-text-secondary">
              {navaja.closing}
            </p>

            <div className="mt-7">
              <Button
                variant="outline"
                href={navaja.url}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ArrowUpRight size={18} aria-hidden="true" />}
                iconPosition="right"
              >
                {navaja.cta}
              </Button>
            </div>
          </div>

          {/* 16:9, la misma proporción de las capturas de los casos (ver
              scripts/shots.mjs). Con borde y sin sombra: sobre papel, la
              captura necesita un filo para no fundirse con el fondo. */}
          <div className="relative aspect-[16/9] border rule bg-surface-sunken">
            <Image
              src={navaja.image}
              alt={navaja.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
