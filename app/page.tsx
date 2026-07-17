import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { services } from "@/content/services";
import { cases } from "@/content/cases";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CaseCard from "@/components/CaseCard";
import CTASection from "@/components/CTASection";

const DESCRIPTION =
  "Diseño y desarrollo de sitios web para PyMEs de la Región de Los Lagos: páginas rápidas y profesionales que convierten visitas en clientes por WhatsApp.";

export const metadata: Metadata = {
  title: "Sitios web profesionales para PyMEs en la Región de Los Lagos",
  description: DESCRIPTION,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: DESCRIPTION,
    url: site.domain,
    images: [{ url: "/og/default.png", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  const previewServices = services.slice(0, 3);
  const featuredCase = cases[0];

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-16 pb-20 text-center sm:pt-24">
        <h1 className="font-display text-4xl font-bold text-black sm:text-5xl">
          Sitios web profesionales para negocios que ya están creciendo
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-black/70">
          Trabajo directo contigo para entender tu negocio antes de diseñar
          nada — nada de plantillas genéricas ni agencias que te tratan como
          un ticket.
        </p>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          <MessageCircle className="h-5 w-5" />
          Hablemos por WhatsApp
        </a>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <SectionHeading
          title="¿En qué te puedo ayudar?"
          subtitle="Cada servicio resuelve un problema concreto, no una lista de funciones."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {previewServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/servicios"
            className="text-sm font-medium text-brand hover:underline"
          >
            Ver todos los servicios →
          </Link>
        </div>
      </section>

      {featuredCase && (
        <section className="mx-auto max-w-5xl px-4 py-16">
          <SectionHeading
            title="Un caso real, no una maqueta"
            subtitle="Así trabajo cuando el proyecto pasa de la idea a producción."
          />
          <div className="mt-10">
            <CaseCard caseStudy={featuredCase} />
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-4 pb-20">
        <CTASection />
      </section>
    </>
  );
}
