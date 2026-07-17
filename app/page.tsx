import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { cases } from "@/content/cases";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import SectionHeading from "@/components/SectionHeading";
import CaseCard from "@/components/CaseCard";

const DESCRIPTION =
  "Diseño y desarrollo de sitios web para PyMEs de la Región de Los Lagos: páginas rápidas y profesionales que convierten visitas en clientes por WhatsApp.";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} — Sitios web para negocios de la Región de Los Lagos`,
  },
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
      <section className="relative overflow-hidden">
        <div className="absolute -top-[180px] -right-[160px] h-[520px] w-[520px] rounded-full bg-brand-tint opacity-65" />
        <div className="relative mx-auto max-w-[1120px] px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
          <p className="mb-5 text-sm font-bold tracking-[0.1em] text-accent-dark uppercase">
            Diseño &amp; desarrollo web · {site.region}
          </p>
          <h1 className="max-w-[780px] font-display text-[clamp(36px,5.5vw,58px)] leading-[1.08] font-semibold tracking-tight text-ink">
            Sitios web con carácter para negocios que ya están creciendo
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-ink/72">
            Trabajo directo contigo para entender tu negocio antes de diseñar
            nada — nada de plantillas genéricas ni agencias que te tratan
            como un ticket.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-lg bg-brand px-7 py-4 text-base font-semibold text-ink-inverse"
            >
              Hablemos por WhatsApp
            </a>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2.5 rounded-lg border-[1.5px] border-ink/20 px-7 py-4 text-base font-semibold text-ink"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Servicios"
            title="¿En qué te puedo ayudar?"
            subtitle="Cada servicio resuelve un problema concreto, no una lista de funciones."
          />
          <Link
            href="/servicios"
            className="text-[15px] font-semibold whitespace-nowrap text-brand"
          >
            Ver todos los servicios →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {previewServices.map((service, i) => (
            <div
              key={service.slug}
              className="rounded-[14px] border border-ink/10 bg-cream-light p-7"
            >
              <p className="mb-4 font-display text-[26px] font-semibold text-accent italic">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-2.5 text-[19px] font-bold text-ink">
                {service.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink/68">
                {service.teaser}
              </p>
            </div>
          ))}
        </div>
      </section>

      {featuredCase && (
        <section className="mx-auto max-w-[1120px] px-6 pt-6 pb-20">
          <SectionHeading
            eyebrow="Caso real"
            title="Un caso real, no una maqueta"
            subtitle="Así trabajo cuando el proyecto pasa de la idea a producción."
          />
          <CaseCard caseStudy={featuredCase} />
        </section>
      )}

      <section className="bg-brand-dark">
        <div className="mx-auto max-w-[800px] px-6 py-20 text-center">
          <h2 className="font-display text-[clamp(28px,4vw,38px)] font-semibold text-ink-inverse">
            ¿Conversamos de tu proyecto?
          </h2>
          <p className="mt-4 text-[17px] text-ink-inverse/70">
            Sin plantillas, sin intermediarios. Escríbeme y te respondo yo
            mismo.
          </p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-lg bg-accent-strong px-8 py-4 text-base font-semibold text-ink-inverse"
          >
            Hablemos por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
