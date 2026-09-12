import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Sitios web simples, hechos por una sola persona";

export default function Image() {
  return renderOgImage({ eyebrow: "Diseño y desarrollo web", title: "Sitios web simples, hechos por una sola persona" });
}
