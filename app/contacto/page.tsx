import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import ContactForm from "@/components/ContactForm";

const DESCRIPTION = `Contacta a ${site.name} en la Región de Los Lagos: escríbeme por WhatsApp o correo y conversemos 15 minutos gratis sobre tu negocio.`;

export const metadata: Metadata = {
  title: "Contacto",
  description: DESCRIPTION,
  openGraph: {
    title: `Contacto | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.domain}/contacto`,
    images: [{ url: "/og/default.png", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-display text-4xl font-bold text-black sm:text-5xl">
        Hablemos
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-black/70">
        Sin esperas. Escríbeme y te respondo yo mismo — la primera
        conversación, 15 minutos, es gratis y sin compromiso.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-semibold text-white transition-transform hover:scale-105"
        >
          <MessageCircle className="h-5 w-5" />
          Escribir por WhatsApp
        </a>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/15 px-8 py-4 text-base font-semibold text-black transition-colors hover:border-brand hover:text-brand"
        >
          <Mail className="h-5 w-5" />
          {site.email}
        </a>
      </div>

      <div className="mx-auto mt-14 max-w-md">
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-black/60">
          O deja tu mensaje aquí
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
