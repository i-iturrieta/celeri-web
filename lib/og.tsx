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
 */
const PETROL_DEEPER = "#00141a";
const PETROL = "#004d59";
const ON_DARK = "#eff5f6";
const ON_DARK_SUBTLE = "#8c9a9c";
const BRASS = "#b58a41";

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
          backgroundColor: PETROL_DEEPER,
          backgroundImage: `radial-gradient(120% 110% at 88% 0%, ${PETROL} 0%, transparent 60%)`,
          padding: "76px 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* La regla de latón: la misma marca que en el sitio señala dónde
              empieza algo. */}
          <div style={{ width: 84, height: 3, backgroundColor: BRASS }} />
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
            fontSize: 26,
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
