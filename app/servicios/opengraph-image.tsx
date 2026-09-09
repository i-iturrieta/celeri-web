import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Cada servicio resuelve un problema concreto, no una lista de funciones";

export default function Image() {
  return renderOgImage({ eyebrow: "Servicios", title: "Cada servicio resuelve un problema concreto, no una lista de funciones" });
}
