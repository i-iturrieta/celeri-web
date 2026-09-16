import type { Metadata } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { faq } from "@/content/faq";
import { buildFaqJsonLd } from "@/lib/jsonld";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ServiceList from "@/components/ServiceList";
import Pricing from "@/components/Pricing";
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

      <PageHeader
        title="Qué necesitas resolver"
        lead="Elegimos juntos el que le sirve a tu negocio, no el que suena mejor. Cada uno parte del problema, no de la tecnología."
      />

      <Container as="section" className="pt-20 pb-24 sm:pt-24 sm:pb-28">
        <ServiceList services={services} headingLevel="h2" />
      </Container>

      {/* El precio va acá y no en una página propia: quien terminó de leer los
          servicios ya tiene la pregunta en la cabeza, y mandarlo a otra ruta
          para responderla pierde a la mitad. */}
      <Pricing />

      <section className="border-y rule bg-surface-sunken">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            title="Lo que todos preguntan antes de empezar"
            subtitle="Plazos, pagos y qué pasa después de publicar. Si falta algo, escríbeme y lo agrego."
          />
          <div className="mt-12">
            <Faq />
          </div>
        </Container>
      </section>

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
