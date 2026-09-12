import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Sitios que están en línea ahora mismo";

export default function Image() {
  return renderOgImage({ eyebrow: "Casos", title: "Sitios que están en línea ahora mismo" });
}
