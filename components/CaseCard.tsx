import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/cases";

type CaseCardProps = {
  caseStudy: CaseStudy;
  /**
   * Marca la imagen como prioritaria. Úsalo solo en el caso que queda sobre el
   * pliegue: es el LCP de esa página y no conviene que espere al lazy-load.
   */
  priority?: boolean;
  /**
   * Invierte el orden de imagen y texto. Se alterna por índice desde la página:
   * tres bloques idénticos uno debajo del otro se leen como una lista de
   * inventario; alternados, el ojo tiene que moverse y el scroll respira.
   */
  reverse?: boolean;
  /** Ver la nota en ServiceList: evita que el documento salte de h1 a h3. */
  headingLevel?: "h2" | "h3";
};

export default function CaseCard({
  caseStudy,
  priority = false,
  reverse = false,
  headingLevel: Heading = "h3",
}: CaseCardProps) {
  const detailHref = `/casos/${caseStudy.slug}`;

  return (
    <article
      /* El ancho de columna se invierte junto con el orden. Con una sola
         plantilla fija, `order-2` mandaba la imagen a la segunda celda — que
         mide 5fr — y las filas alternadas quedaban con la captura chica y el
         texto ancho. La imagen siempre se lleva las 7fr. */
      className={`group grid items-center gap-x-14 gap-y-8 ${
        reverse
          ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          : "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
      }`}
    >
      <Link
        href={detailHref}
        /* aria-hidden + tabIndex -1: la imagen repite el destino del título que
           está al lado. Sin esto, el teclado pasa dos veces por el mismo link y
           el lector de pantalla lee el caso duplicado. */
        aria-hidden="true"
        tabIndex={-1}
        className={`relative aspect-[16/10] overflow-hidden bg-surface-sunken ${
          reverse ? "lg:order-2" : ""
        }`}
      >
        <Image
          src={caseStudy.image}
          alt=""
          fill
          /* Sin `sizes`, next/image sirve la variante de 3840px a todo el mundo
           * para un hueco que nunca pasa de ~680px. */
          sizes="(max-width: 1024px) 100vw, 680px"
          priority={priority}
          className="transition-brand object-cover duration-500 group-hover:scale-[1.025]"
        />
      </Link>

      <div className={reverse ? "lg:order-1" : ""}>
        {caseStudy.kind === "demo" && (
          <p className="mb-5 inline-block border rule px-2.5 py-1 text-micro text-text-muted">
            Ejemplo, no es un cliente
          </p>
        )}

        <Heading className="font-display text-h2 text-balance text-text-primary">
          <Link
            href={detailHref}
            className="focus-ring transition-brand decoration-1 underline-offset-[7px] hover:text-text-accent hover:underline"
          >
            {caseStudy.client}
          </Link>
        </Heading>

        <p className="mt-5 max-w-[52ch] text-body text-text-secondary">
          {caseStudy.summary}
        </p>

        {/* Lo que incluyó, sin píldoras: las cápsulas de color convertían cada
            entrega técnica en una etiqueta decorativa del mismo peso que las
            demás. En texto plano sobre una regla se leen como lo que son, una
            ficha. */}
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-1.5 border-t rule pt-5">
          {caseStudy.tags.map((tag) => (
            <li key={tag} className="text-micro text-text-muted">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href={detailHref}
            className="focus-ring transition-brand text-small font-medium text-text-primary underline decoration-ink-950/30 decoration-1 underline-offset-[6px] hover:text-text-accent hover:decoration-2 hover:decoration-text-accent"
          >
            Ver el caso completo
          </Link>
          <a
            href={caseStudy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring transition-brand inline-flex items-center gap-1.5 text-small text-text-muted hover:text-text-accent"
          >
            Visitar sitio
            {/* Este ícono sí dice algo: el link se va del sitio. */}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
