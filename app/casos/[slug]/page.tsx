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

      <Container className="pt-10 pb-8">
        <nav aria-label="Migas de pan" className="mb-8 text-small text-ink-muted">
          <Link href="/casos" className="focus-ring transition-brand hover:text-brand">
            ← Todos los casos
          </Link>
        </nav>

        {caseStudy.kind === "demo" && (
          <p className="mb-4 inline-block rounded-full bg-ink/10 px-3 py-1.5 text-xs font-bold tracking-[0.04em] text-ink-muted uppercase">
            Ejemplo — no es un cliente
          </p>
        )}

        <h1 className="max-w-[820px] font-display text-h1 text-ink">
          {caseStudy.client}
        </h1>
        <p className="mt-5 max-w-[720px] text-lead text-ink-muted">
          {caseStudy.summary}
        </p>

        <a
          href={caseStudy.url}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring transition-brand mt-6 inline-flex items-center gap-1.5 text-small font-semibold text-brand hover:text-accent-dark"
        >
          Visitar {caseStudy.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </Container>

      <Container as="section" className="pb-12">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] border border-ink/10">
          <Image
            src={caseStudy.image}
            alt={`Captura del sitio de ${caseStudy.client}`}
            fill
            sizes="(max-width: 1120px) 100vw, 1120px"
            priority
            className="object-cover"
          />
        </div>
      </Container>

      <Container as="section" className="pb-16">
        <div className="max-w-[720px]">
          {SECTIONS.map(({ key, label }) => (
            <div key={key} className="mt-10 first:mt-0">
              <h2 className="font-display text-h2 text-ink">{label}</h2>
              <p className="mt-3 text-body text-ink-muted">{caseStudy[key]}</p>
            </div>
          ))}

          <div className="mt-12">
            <h2 className="font-display text-h2 text-ink">Qué incluyó</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {caseStudy.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-brand-tint px-3 py-1.5 text-xs font-bold tracking-[0.04em] text-brand"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
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
