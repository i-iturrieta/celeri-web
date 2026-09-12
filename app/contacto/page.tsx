import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ProcessSteps from "@/components/ProcessSteps";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const DESCRIPTION = `Contacta a ${site.name}: escríbeme por WhatsApp o correo y conversemos 15 minutos gratis sobre tu negocio.`;

export const metadata: Metadata = {
  title: "Contacto",
  description: DESCRIPTION,
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: `Contacto | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.domain}/contacto`,
  },
};

export default function ContactPage() {
  return (
    <>
      <Container className="pt-16 pb-4 text-center">
        <h1 className="font-display text-h1 text-ink">Hablemos</h1>
        <p className="mx-auto mt-5 max-w-[560px] text-lead text-ink-muted">
          Nada de formularios que caen en un buzón que nadie revisa: escríbeme
          directo. Los primeros 15 minutos de conversación son gratis y sin
          compromiso.
        </p>

        {/* Dos vías, no más. Un formulario propio agregaba un punto de falla
            silencioso — si el envío se caía, el lead se perdía sin que nadie se
            enterara — y el cliente que buscamos escribe por WhatsApp igual. */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring transition-brand inline-flex items-center gap-2.5 rounded-lg bg-brand px-8 py-4 text-base font-semibold text-ink-inverse hover:bg-brand-dark hover:scale-105"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Escribir por WhatsApp
          </a>
          <a
            href={`mailto:${site.email}`}
            className="focus-ring transition-brand inline-flex items-center gap-2.5 rounded-lg border-[1.5px] border-ink/20 px-8 py-4 text-base font-semibold text-ink hover:border-brand hover:text-brand"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            {site.email}
          </a>
        </div>

        <p className="mt-6 text-small text-ink-subtle">
          Respondo el mismo día hábil.
        </p>
      </Container>

      <Container as="section" className="py-16">
        <SectionHeading
          eyebrow="Qué pasa después"
          title="Si me escribes hoy, esto es lo que sigue"
        />
        <div className="mt-10">
          <ProcessSteps />
        </div>
      </Container>
    </>
  );
}
