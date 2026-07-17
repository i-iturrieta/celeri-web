import { site } from "@/content/site";

const DEFAULT_MESSAGE = "Hola, vi tu sitio y quiero una web para mi negocio.";

export function waLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
