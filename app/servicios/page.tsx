import type { Metadata } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { faq } from "@/content/faq";
import { buildFaqJsonLd } from "@/lib/jsonld";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";

const DESCRIPTION = `Landing pages, hub de redes, agendadores y webs informativas para negocios pequeños.`;

export const metadata: Metadata = {
  title: "Servicios",
  description: DESCRIPTION,
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: `Servicios | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.domain}/servicios`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(faq)} />

      <Container className="pt-16 pb-8">
        <SectionHeading
          as="h1"
          eyebrow="Servicios"
          title="Qué necesitas resolver"
          subtitle="Elegimos juntos el que le sirve a tu negocio, no el que suena mejor."
        />
      </Container>

      <Container as="section" className="pb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              headingLevel="h2"
            />
          ))}
        </div>
      </Container>

      <Container as="section" className="pb-16">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Lo que todos preguntan antes de empezar"
          subtitle="Plazos, pagos y qué pasa después de publicar. Si falta algo, escríbeme y lo agrego."
        />
        <div className="mt-8">
          <Faq />
        </div>
      </Container>

      {/* Un solo cierre. Antes había un bloque "¿No sabes cuál necesitas?"
          pegado a un CTASection: dos llamados idénticos seguidos se anulan y el
          segundo se lee como relleno. */}
      <CTASection
        variant="band"
        title="¿No sabes cuál necesitas?"
        subtitle="Conversemos 15 minutos, sin costo y sin compromiso. Te digo con honestidad qué te conviene, aunque sea “por ahora nada”."
        message="Hola, vi tus servicios y no tengo claro cuál me sirve. ¿Conversamos?"
      />
    </>
  );
}
