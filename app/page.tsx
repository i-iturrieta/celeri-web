import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { clientCases } from "@/content/cases";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CaseCard from "@/components/CaseCard";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import ProcessSteps from "@/components/ProcessSteps";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const DESCRIPTION = `Diseño y desarrollo de sitios web para negocios pequeños: páginas simples y rápidas que llevan a los visitantes a escribirte por WhatsApp.`;

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} — Sitios web simples para negocios pequeños`,
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: DESCRIPTION,
    url: site.domain,
  },
};

export default function HomePage() {
  const previewServices = services.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-[180px] -right-[160px] h-[520px] w-[520px] rounded-full bg-brand-tint opacity-65"
        />
        <Container className="relative pt-16 pb-14 sm:pt-24 sm:pb-20">
          <p className="mb-5 text-eyebrow text-accent-dark uppercase">
            Diseño &amp; desarrollo web
          </p>
          <h1 className="max-w-[780px] font-display text-display text-ink">
            Sitios web simples, hechos por una sola persona
          </h1>
          <p className="mt-6 max-w-[560px] text-lead text-ink-muted">
            Converso contigo antes de diseñar nada, porque cada negocio
            funciona distinto. Después diseño y programo yo mismo, sin
            pasarte a un equipo que no conoces.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring transition-brand inline-flex items-center gap-2.5 rounded-lg bg-brand px-7 py-4 text-base font-semibold text-ink-inverse hover:bg-brand-dark hover:scale-105"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Hablemos por WhatsApp
            </a>
            <Link
              href="/servicios"
              className="focus-ring transition-brand inline-flex items-center gap-2.5 rounded-lg border-[1.5px] border-ink/20 px-7 py-4 text-base font-semibold text-ink hover:border-brand hover:text-brand"
            >
              Ver servicios
            </Link>
          </div>
        </Container>
      </section>

      <Container as="section" className="py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Servicios"
            title="En qué puedo ayudarte"
            subtitle="Cada uno responde a un problema puntual que me han contado en conversaciones reales."
          />
          <Link
            href="/servicios"
            className="focus-ring transition-brand text-small font-semibold whitespace-nowrap text-brand hover:text-accent-dark"
          >
            Ver todos los servicios →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {previewServices.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service}
              variant="numbered"
              index={i + 1}
            />
          ))}
        </div>
      </Container>

      <Container as="section" className="py-16">
        <SectionHeading
          eyebrow="Cómo trabajo"
          title="De la conversación al sitio publicado"
          subtitle="Cuatro pasos. Sabes en qué van sin tener que preguntarme."
        />
        <div className="mt-10">
          <ProcessSteps />
        </div>
      </Container>

      {clientCases.length > 0 && (
        <Container as="section" className="pt-6 pb-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Casos reales"
              title="Negocios que ya están usando su sitio"
              subtitle="Esto es lo que quedó cuando el proyecto pasó de la idea a producción."
            />
            <Link
              href="/casos"
              className="focus-ring transition-brand text-small font-semibold whitespace-nowrap text-brand hover:text-accent-dark"
            >
              Ver todos los casos →
            </Link>
          </div>
          <div className="mt-9 flex flex-col gap-8">
            {clientCases.map((c, i) => (
              <CaseCard key={c.slug} caseStudy={c} priority={i === 0} />
            ))}
          </div>
        </Container>
      )}

      <CTASection variant="band" />
    </>
  );
}
