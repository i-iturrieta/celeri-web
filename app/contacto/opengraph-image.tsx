import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Conversemos 15 minutos, gratis y sin compromiso";

export default function Image() {
  return renderOgImage({ eyebrow: "Contacto", title: "Conversemos 15 minutos, gratis y sin compromiso" });
}
