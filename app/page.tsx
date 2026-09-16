import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { clientCases } from "@/content/cases";
import { site } from "@/content/site";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CaseCard from "@/components/CaseCard";
import ServiceList from "@/components/ServiceList";
import CTASection from "@/components/CTASection";
import ProcessSteps from "@/components/ProcessSteps";

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

/** Link de "ver todos", con el mismo subrayado que el resto del sitio. */
function MoreLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="focus-ring transition-brand text-small whitespace-nowrap text-text-secondary underline decoration-ink-950/25 decoration-1 underline-offset-[6px] hover:text-text-accent hover:decoration-2 hover:decoration-text-accent"
    >
      {children}
    </Link>
  );
}

/**
 * El home pasa por tres superficies: papel, caliza, papel, y cierra en petróleo
 * profundo. No es decoración — es lo que hace que al hacer scroll se note que
 * cambió de tema. Cuando las cuatro secciones compartían el mismo fondo cream y
 * la misma tarjeta redondeada, la página se leía como un solo bloque plano.
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      <Container as="section" className="py-24 sm:py-28">
        <SectionHeading
          title="En qué puedo ayudarte"
          subtitle="Cada uno responde a un problema puntual que me han contado en conversaciones reales."
          aside={<MoreLink href="/servicios">Ver los cinco servicios</MoreLink>}
        />
        <div className="mt-12">
          <ServiceList services={services.slice(0, 3)} detail="compact" />
        </div>
      </Container>

      <section className="border-y rule bg-surface-sunken">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            title="De la conversación al sitio publicado"
            subtitle="Cuatro pasos. Sabes en qué van sin tener que preguntarme."
          />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      {clientCases.length > 0 && (
        <Container as="section" className="py-24 sm:py-28">
          <SectionHeading
            title="Negocios que ya están usando su sitio"
            subtitle="Esto es lo que quedó cuando el proyecto pasó de la idea a producción."
            aside={<MoreLink href="/casos">Ver todos los casos</MoreLink>}
          />
          <div className="mt-16 flex flex-col gap-24 sm:gap-28">
            {clientCases.map((c, i) => (
              <CaseCard
                key={c.slug}
                caseStudy={c}
                priority={i === 0}
                reverse={i % 2 === 1}
              />
            ))}
          </div>
        </Container>
      )}

      <CTASection variant="band" />
    </>
  );
}
