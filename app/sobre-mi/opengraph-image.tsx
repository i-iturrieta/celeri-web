import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Hablas conmigo, de principio a fin";

export default function Image() {
  return renderOgImage({ eyebrow: "Sobre mí", title: "Hablas conmigo, de principio a fin" });
}
