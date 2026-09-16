import type { Metadata } from "next";
import { Sora, IBM_Plex_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import JsonLd from "@/components/JsonLd";
import { site } from "@/content/site";
import { buildJsonLd } from "@/lib/jsonld";

/**
 * Las tres familias del design system. El DS las cargaba por @import de Google
 * Fonts (`tokens/fonts.css`); acá van por next/font, que self-hostea los
 * archivos y reserva las métricas — mismo resultado tipográfico, sin el
 * request extra ni el salto de layout al cargar.
 *
 * Quién usa cuál está en el @theme de globals.css. En corto: Sora titula,
 * Plex lee, Space Mono etiqueta.
 */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Space Mono solo aparece en eyebrows y etiquetas, siempre en mayúscula (ver
 * la utilidad `label-mono`). Por eso alcanzan dos pesos. */
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${sora.variable} ${plex.variable} ${spaceMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-surface-page font-sans text-text-primary">
        <JsonLd data={buildJsonLd()} />

        {/* Primer elemento enfocable de la página: quien navega con teclado
            puede saltarse el header en vez de tabular por todo el menú en cada
            página. Invisible hasta que recibe foco. */}
        <a
          href="#contenido"
          className="focus-ring sr-only z-50 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-surface-inverse focus:px-5 focus:py-3 focus:text-small focus:font-medium focus:text-text-on-inverse"
        >
          Saltar al contenido
        </a>

        {/* El crossfade entre páginas no se envuelve acá: lo hace la
            transición de raíz del navegador, que es exactamente eso — todo lo
            que no tiene un `view-transition-name` propio se desvanece junto.
            Envolver <main> en un <ViewTransition> agregaba un grupo cuyo
            tamaño cambia de página a página, y con él un aplastamiento
            vertical que había que apagar a mano.

            Lo que sí hay que hacer es sacar el cromo de esa transición: el
            header, el pie y el botón flotante son idénticos en todas las
            páginas y si parpadean junto con el contenido se pierde el punto de
            referencia. Se anclan por nombre en globals.css, bajo
            "Transiciones de vista". */}
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
