import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Sitios web con carácter para negocios que ya están creciendo";

export default function Image() {
  return renderOgImage({ eyebrow: "Diseño y desarrollo web", title: "Sitios web con carácter para negocios que ya están creciendo" });
}
