import type { Metadata } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

const DESCRIPTION =
  "Landing pages, hub de redes, agendadores y webs informativas para negocios en la Región de Los Lagos.";

export const metadata: Metadata = {
  title: "Servicios",
  description: DESCRIPTION,
  openGraph: {
    title: `Servicios | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.domain}/servicios`,
    images: [{ url: "/og/default.png", width: 1200, height: 630 }],
  },
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
        Servicios
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Cada servicio parte de un problema real, no de una lista de
        funciones. Elegimos juntos el que resuelve el tuyo.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold text-ink">
        ¿Qué necesitas resolver?
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-brand/20 bg-brand/5 p-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink">
          ¿No sabes cuál necesitas?
        </h2>
        <p className="mt-2 text-ink/70">
          Conversemos 15 minutos, sin costo y sin compromiso. Te digo con
          honestidad qué te conviene, aunque sea “por ahora nada”.
        </p>
      </div>

      <div className="mt-16">
        <CTASection
          title="Empecemos con una asesoría gratuita"
          subtitle="Cuéntame qué necesitas y te respondo con opciones concretas, no con un genérico ‘depende’."
        />
      </div>
    </div>
  );
}
