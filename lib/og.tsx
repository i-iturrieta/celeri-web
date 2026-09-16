import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/** Tamaño estándar de Open Graph. Se reexporta desde cada opengraph-image. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/*
 * Los colores van en hex y no en tokens de Tailwind a propósito: esto se
 * renderiza fuera del navegador, sin la hoja de estilos del sitio. Son los
 * mismos valores que los tokens de app/globals.css — si cambias la paleta allá,
 * estos hay que moverlos a mano.
 *
 * Eso fue exactamente lo que pasó: se quedaron en la paleta "petróleo y latón"
 * cuando el sitio ya había pasado a tinta y ámbar, y las cuatro tarjetas de
 * compartir estuvieron mostrando una marca que ya no existe. Si volvés a mover
 * la rampa en globals.css, volvé acá en el mismo commit.
 */
const INK = "#0a0a0c";
const ON_DARK = "#ffffff";
const ON_DARK_SUBTLE = "#a8acb3";
const AMBER = "#ffb020";

/**
 * Genera la imagen de compartir de una página.
 *
 * Va en oscuro, al revés que el sitio. No es inconsistencia: estas imágenes
 * compiten dentro de una conversación de WhatsApp, que es por donde llega la
 * mayoría de la gente, y ahí casi todas las tarjetas de enlace son claras. Una
 * oscura con una regla de latón se distingue del resto del hilo.
 */
export function renderOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          padding: "76px 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* La regla ámbar: la misma marca que en el sitio señala dónde
              empieza algo. El degradado radial que había detrás se fue: el
              sistema prohíbe los gradientes, y la tarjeta tiene que parecerse
              al bloque oscuro macizo que el visitante abre al hacer clic. */}
          <div style={{ width: 84, height: 3, backgroundColor: AMBER }} />
          <div
            style={{
              marginTop: 30,
              fontSize: 26,
              color: ON_DARK_SUBTLE,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 72,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              fontWeight: 600,
              color: ON_DARK,
              maxWidth: 940,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 40,
            /* 24 y no 26: el tagline es la línea más larga de la tarjeta y a 26
               llegaba a tres píxeles del borde. Cabía acá y podía no caber en
               el render de producción, donde la fuente de reserva puede
               resolver distinto. */
            fontSize: 24,
            color: ON_DARK_SUBTLE,
          }}
        >
          <span
            style={{
              fontSize: 38,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: ON_DARK,
            }}
          >
            {site.name}
          </span>
          <span>{site.tagline}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
