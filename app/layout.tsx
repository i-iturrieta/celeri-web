import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import JsonLd from "@/components/JsonLd";
import { site } from "@/content/site";
import { buildJsonLd } from "@/lib/jsonld";

/**
 * Fraunces variable, con sus tres ejes propios cargados.
 *
 * Se piden explícitamente porque el carácter de esta serif vive en los ejes, no
 * en el peso: sin SOFT/WONK/opsz se renderiza en la posición neutra y queda
 * indistinguible de cualquier otra serif de Google. Quién los usa y con qué
 * valores está en las utilidades `font-display` y `font-display-text`.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    siteName: site.name,
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${instrument.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <JsonLd data={buildJsonLd()} />

        {/* Primer elemento enfocable de la página: quien navega con teclado
            puede saltarse el header en vez de tabular por todo el menú en cada
            página. Invisible hasta que recibe foco. */}
        <a
          href="#contenido"
          className="focus-ring sr-only z-50 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-petrol focus:px-5 focus:py-3 focus:text-small focus:font-medium focus:text-on-dark"
        >
          Saltar al contenido
        </a>

        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
