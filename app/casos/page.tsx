import type { Metadata } from "next";
import { clientCases, demoCases } from "@/content/cases";
import { site } from "@/content/site";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import CaseCard from "@/components/CaseCard";
import CTASection from "@/components/CTASection";

const DESCRIPTION = `Sitios web que he construido para negocios pequeños: qué problema tenían, qué hice y qué cambió después.`;

export const metadata: Metadata = {
  title: "Casos",
  description: DESCRIPTION,
  alternates: { canonical: "/casos" },
  openGraph: {
    title: `Casos | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.domain}/casos`,
  },
};

export default function CasesPage() {
  return (
    <>
      <PageHeader
        title="Sitios que están en línea ahora mismo"
        lead="Cada caso empieza con el problema que tenía el negocio antes de escribirme, no con la lista de tecnologías que usé."
      />

      <Container as="section" className="section-open">
        <div className="flex flex-col gap-24 sm:gap-28">
          {clientCases.map((c, i) => (
            <CaseCard
              key={c.slug}
              caseStudy={c}
              priority={i === 0}
              reverse={i % 2 === 1}
              headingLevel="h2"
            />
          ))}
        </div>
      </Container>

      {demoCases.length > 0 && (
        <section className="border-t rule bg-surface-sunken">
          <Container className="section-base">
            <SectionHeading
              title="Ejemplos que construí por mi cuenta"
              subtitle="No son clientes: son vitrinas que hice para mostrar cómo se vería un sitio en distintos rubros. Los separo a propósito para que sepas qué estás mirando."
            />
            <div className="mt-16 flex flex-col gap-24 sm:gap-28">
              {demoCases.map((c, i) => (
                <CaseCard key={c.slug} caseStudy={c} reverse={i % 2 === 1} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        variant="band"
        title="¿Tu negocio se parece a alguno de estos?"
        subtitle="Cuéntame qué necesitas resolver y te digo si puedo ayudarte."
      />
    </>
  );
}
