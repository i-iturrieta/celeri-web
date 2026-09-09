import type { Metadata } from "next";
import { clientCases, demoCases } from "@/content/cases";
import { site } from "@/content/site";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CaseCard from "@/components/CaseCard";
import CTASection from "@/components/CTASection";

const DESCRIPTION = `Sitios web que he construido para negocios de la ${site.regionShort}: qué problema tenían, qué hice y qué cambió después.`;

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
      <Container className="pt-16 pb-8">
        <SectionHeading
          as="h1"
          eyebrow="Casos"
          title="Trabajo publicado, no maquetas"
          subtitle="Cada caso parte del problema que tenía el negocio, no de la tecnología que usé."
        />
      </Container>

      <Container as="section" className="pb-16">
        <div className="flex flex-col gap-8">
          {clientCases.map((c, i) => (
            <CaseCard
              key={c.slug}
              caseStudy={c}
              priority={i === 0}
              headingLevel="h2"
            />
          ))}
        </div>
      </Container>

      {demoCases.length > 0 && (
        <Container as="section" className="pb-16">
          <SectionHeading
            eyebrow="Ejemplos"
            title="Ejemplos que construí por mi cuenta"
            subtitle="No son clientes: son vitrinas que hice para mostrar cómo se vería un sitio en distintos rubros. Los separo a propósito para que sepas qué estás mirando."
          />
          <div className="mt-9 flex flex-col gap-8">
            {demoCases.map((c) => (
              <CaseCard key={c.slug} caseStudy={c} />
            ))}
          </div>
        </Container>
      )}

      <CTASection
        variant="band"
        title="¿Tu negocio se parece a alguno de estos?"
        subtitle="Cuéntame qué necesitas resolver y te digo si puedo ayudarte."
      />
    </>
  );
}
