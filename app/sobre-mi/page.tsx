import type { Metadata } from "next";
import { site } from "@/content/site";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import ProcessSteps from "@/components/ProcessSteps";

const DESCRIPTION = `Diseño y desarrollo web en la ${site.regionShort}: entiendo tu negocio antes de diseñar nada, y respondes directo conmigo, no con un equipo de ventas.`;

export const metadata: Metadata = {
  title: "Sobre mí",
  description: DESCRIPTION,
  alternates: { canonical: "/sobre-mi" },
  openGraph: {
    title: `Sobre mí | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.domain}/sobre-mi`,
  },
};

export default function AboutPage() {
  return (
    <>
      <Container className="pt-16 pb-8">
        <SectionHeading
          as="h1"
          eyebrow="Sobre mí"
          title="Hablas conmigo, de principio a fin"
        />
        <p className="mt-6 max-w-[720px] text-lead text-ink-muted">
          Hago sitios web para negocios de la {site.regionShort} que ya tienen
          clientes, pero todavía no tienen un lugar propio y serio donde
          mostrarse. No trabajo con plantillas genéricas ni como una agencia que
          te pasa de mano en mano.
        </p>
      </Container>

      <Container as="section" className="pb-16">
        <div className="max-w-[720px]">
          <h2 className="mt-8 font-display text-h2 text-ink">
            Aprendo cómo funciona tu rubro antes de diseñar
          </h2>
          <p className="mt-3 text-body text-ink-muted">
            Antes de proponerte un diseño, quiero entender cómo funciona tu
            negocio de verdad: qué preguntan tus clientes antes de comprar, en
            qué momento se frustran, qué te hace perder tiempo todos los días.
            Con Mirador Propiedades, por ejemplo, antes de dibujar una sola
            pantalla dediqué tiempo a entender cómo se mueve una propiedad desde
            que está disponible hasta que se reserva — porque eso, no un catálogo
            bonito, era lo que el sitio tenía que resolver.
          </p>

          <h2 className="mt-10 font-display text-h2 text-ink">
            Respondo yo, la misma persona que construye
          </h2>
          <p className="mt-3 text-body text-ink-muted">
            Cuando me escribes, hablas conmigo — no con un ejecutivo de cuenta
            que después pasa tu proyecto a un equipo que nunca vas a conocer. Yo
            diseño, yo programo, y yo te respondo cuando tienes una duda porque
            se te ocurrió algo mientras cerrabas el local.
          </p>

          <h2 className="mt-10 font-display text-h2 text-ink">
            Parto por lo que te está costando, no por los colores
          </h2>
          <p className="mt-3 text-body text-ink-muted">
            La primera conversación no es sobre colores de botones. Es sobre qué
            te está costando hoy: gente que te escribe por Instagram y no sabe si
            existes de verdad, horas perdidas coordinando citas una por una,
            clientes que se van a la competencia porque no te encuentran en
            Google. De ahí para atrás construimos el sitio, no al revés.
          </p>
        </div>
      </Container>

      <Container as="section" className="pb-16">
        <SectionHeading
          eyebrow="Cómo trabajo"
          title="Los cuatro pasos, sin letra chica"
        />
        <div className="mt-10">
          <ProcessSteps />
        </div>
      </Container>

      <CTASection
        variant="band"
        title="Conversemos de tu negocio"
        subtitle="Sin plantillas, sin intermediarios. Escríbeme y hablamos directo."
      />
    </>
  );
}
