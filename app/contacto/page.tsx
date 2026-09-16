import type { Metadata } from "next";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ProcessSteps from "@/components/ProcessSteps";

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

function formatPhone(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  return `+${digits.slice(0, 2)} ${digits.slice(2, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
}

/**
 * Las dos vías de contacto, como filas y no como botones.
 *
 * Dos botones del mismo tamaño lado a lado obligan a elegir sin dar con qué:
 * en fila, cada canal muestra su dirección real y cuánto demoras en responder,
 * que es la información que la persona necesita para decidir por cuál escribe.
 */
const CHANNELS = [
  {
    label: "WhatsApp",
    value: formatPhone(site.whatsapp),
    note: "Lo más rápido. Respondo el mismo día hábil.",
    href: waLink(),
    external: true,
  },
  {
    label: "Correo",
    value: site.email,
    note: "Si prefieres dejarlo escrito y con calma.",
    href: `mailto:${site.email}`,
    external: false,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Hablemos"
        lead="Nada de formularios que caen en un buzón que nadie revisa: escríbeme directo. Los primeros 15 minutos de conversación son gratis y sin compromiso."
      />

      {/* Dos vías, no más. Un formulario propio agregaba un punto de falla
          silencioso — si el envío se caía, el lead se perdía sin que nadie se
          enterara — y el cliente que buscamos escribe por WhatsApp igual. */}
      <Container as="section" className="section-open">
        <ul className="border-b rule">
          {CHANNELS.map((channel) => (
            <li key={channel.label} className="border-t rule">
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="focus-ring group grid gap-x-12 gap-y-3 py-9 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:py-11"
              >
                <p className="text-small text-text-muted">{channel.label}</p>
                <div>
                  <p className="transition-brand font-display text-h2 text-text-primary group-hover:text-text-accent">
                    {channel.value}
                  </p>
                  <p className="mt-3 text-small text-text-secondary">
                    {channel.note}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Container>

      {/* En papel, no en caliza: esta es la única página que no cierra con la
          banda oscura, así que una sección en caliza quedaba pegada al pie —
          que también es caliza — y las dos se leían como un solo bloque. */}
      <section className="bg-surface-page">
        <Container className="pb-24 sm:pb-28">
          <SectionHeading
            title="Si me escribes hoy, esto es lo que sigue"
            subtitle="Para que sepas en qué te estás metiendo antes de mandar el primer mensaje."
          />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </Container>
      </section>
    </>
  );
}
