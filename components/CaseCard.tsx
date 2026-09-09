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
};

export default function CaseCard({ caseStudy, priority = false }: CaseCardProps) {
  const detailHref = `/casos/${caseStudy.slug}`;

  return (
    <article className="flex flex-wrap items-center gap-8 rounded-[18px] border border-ink/10 bg-cream-light p-5 transition-brand hover:border-ink/20 hover:shadow-md">
      <Link
        href={detailHref}
        className="focus-ring relative h-[280px] flex-1 basis-80 overflow-hidden rounded-xl"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={caseStudy.image}
          alt=""
          fill
          /* Sin `sizes`, next/image sirve la variante de 3840px a todo el mundo
           * para un hueco que nunca pasa de ~1050px. */
          sizes="(max-width: 640px) 100vw, (max-width: 1120px) 50vw, 520px"
          priority={priority}
          className="object-cover"
        />
      </Link>

      <div className="flex-1 basis-80 py-3 pr-0 sm:pr-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {caseStudy.kind === "demo" && (
            <span className="rounded-full bg-ink/10 px-3 py-1.5 text-xs font-bold tracking-[0.04em] text-ink-muted uppercase">
              Ejemplo
            </span>
          )}
          {caseStudy.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-tint px-3 py-1.5 text-xs font-bold tracking-[0.04em] text-brand"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-2xl font-semibold text-ink">
          <Link href={detailHref} className="focus-ring transition-brand hover:text-brand">
            {caseStudy.client}
          </Link>
        </h3>
        <p className="mt-3 text-small text-ink-muted">{caseStudy.summary}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href={detailHref}
            className="focus-ring transition-brand inline-flex items-center gap-1.5 text-small font-semibold text-brand hover:text-accent-dark"
          >
            Ver el caso completo →
          </Link>
          <a
            href={caseStudy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring transition-brand inline-flex items-center gap-1.5 text-small font-semibold text-ink-muted hover:text-brand"
          >
            Visitar sitio
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
