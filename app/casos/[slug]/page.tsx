import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cases, getCase } from "@/content/cases";
import { site } from "@/content/site";
import { buildCaseJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonld";
import Container from "@/components/Container";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";

type Params = { slug: string };

/** Prerrenderiza los casos: son pocos y no cambian entre despliegues. */
export function generateStaticParams(): Params[] {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCase(slug);
  if (!caseStudy) return {};

  const title = `${caseStudy.client} — caso`;
  return {
    title,
    description: caseStudy.summary,
    alternates: { canonical: `/casos/${caseStudy.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: caseStudy.summary,
      url: `${site.domain}/casos/${caseStudy.slug}`,
      images: [{ url: caseStudy.image }],
    },
  };
}

const SECTIONS = [
  { key: "problem", label: "El problema" },
  { key: "work", label: "Qué hice" },
  { key: "result", label: "El resultado" },
] as const;

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const caseStudy = getCase(slug);
  if (!caseStudy) notFound();

  const displayUrl = caseStudy.url
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/$/, "");

  return (
    <>
      <JsonLd data={buildCaseJsonLd(caseStudy)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Casos", path: "/casos" },
          { name: caseStudy.client, path: `/casos/${caseStudy.slug}` },
        ])}
      />

      <section className="border-b rule bg-surface-sunken">
        <Container className="pt-10 pb-16 sm:pb-20">
          <nav aria-label="Migas de pan" className="mb-12">
            <Link
              href="/casos"
              className="focus-ring transition-brand text-small text-text-muted hover:text-text-accent"
            >
              Todos los casos
            </Link>
          </nav>

          {caseStudy.kind === "demo" && (
            <p className="mb-6 inline-block border rule px-2.5 py-1 text-micro text-text-muted">
              Ejemplo, no es un cliente
            </p>
          )}

          <h1 className="font-display max-w-[16ch] text-h1 text-balance text-text-primary">
            {caseStudy.client}
          </h1>
          <p className="mt-7 max-w-[58ch] text-lead text-text-secondary">
            {caseStudy.summary}
          </p>

          <a
            href={caseStudy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring transition-brand mt-8 inline-flex items-center gap-1.5 text-small text-text-primary underline decoration-ink-950/30 decoration-1 underline-offset-[6px] hover:text-text-accent hover:decoration-2 hover:decoration-text-accent"
          >
            {displayUrl}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Container>
      </section>

      {/* La captura entra a sangre completa y sin marco: es lo que el visitante
          vino a ver, y encajonarla en una tarjeta con borde la encoge. */}
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <Image
          src={caseStudy.image}
          alt={`Captura del sitio de ${caseStudy.client}`}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      <Container as="section" className="pt-20 pb-24 sm:pt-24 sm:pb-28">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <div>
            {SECTIONS.map(({ key, label }) => (
              <article
                key={key}
                className="border-t rule pt-9 pb-11 first:border-t-0 first:pt-0 last:pb-0"
              >
                <h2 className="font-display text-h2 text-text-primary">{label}</h2>
                <p className="mt-6 max-w-[64ch] text-body text-text-secondary">
                  {caseStudy[key]}
                </p>
              </article>
            ))}
          </div>

          {/* La ficha va al costado, no al final: es material de referencia,
              no el siguiente capítulo de la historia. */}
          <aside className="lg:pt-1">
            <h2 className="text-small text-text-muted">Qué incluyó</h2>
            <ul className="mt-6 border-b rule">
              {caseStudy.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-t rule py-4 text-small text-text-primary"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>

      <CTASection
        variant="band"
        title="¿Tienes un problema parecido?"
        subtitle="Cuéntame cómo funciona tu negocio hoy y te digo qué haría."
        message={`Hola, vi el caso de ${caseStudy.client} en tu sitio y quiero conversar sobre algo parecido`}
      />
    </>
  );
}
