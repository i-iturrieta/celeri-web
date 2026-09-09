import type { Metadata } from "next";
import { Lora, Karla } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import JsonLd from "@/components/JsonLd";
import { site } from "@/content/site";
import { buildJsonLd } from "@/lib/jsonld";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
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
      className={`${lora.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink">
        <JsonLd data={buildJsonLd()} />

        {/* Primer elemento enfocable de la página: quien navega con teclado
            puede saltarse el header en vez de tabular por todo el menú en cada
            página. Invisible hasta que recibe foco. */}
        <a
          href="#contenido"
          className="focus-ring sr-only z-50 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:rounded-lg focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-inverse"
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
