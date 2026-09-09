import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/** Tamaño estándar de Open Graph. Se reexporta desde cada opengraph-image. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Genera la imagen de compartir de una página.
 *
 * Antes las cuatro páginas compartían /og/default.png, así que un enlace a
 * /servicios y uno al home se veían idénticos en WhatsApp. Generarlas en vez de
 * dibujarlas a mano evita que quede una desactualizada cuando cambie el copy.
 *
 * Los colores están en hex y no en tokens de Tailwind a propósito: esto se
 * renderiza fuera del navegador, sin la hoja de estilos del sitio.
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
          backgroundColor: "#fdf6ed",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 560,
            height: 560,
            borderRadius: 9999,
            backgroundColor: "#d2efee",
            opacity: 0.65,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#ab4400",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 68,
              lineHeight: 1.1,
              fontWeight: 600,
              color: "#25170c",
              maxWidth: 900,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#655447",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 40, fontWeight: 600, color: "#004141" }}>
              {site.name}
            </span>
            <span style={{ fontSize: 40, fontWeight: 600, color: "#d16631" }}>
              .
            </span>
          </div>
          <span>{site.regionShort}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
