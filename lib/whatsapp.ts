import { site } from "@/content/site";

const DEFAULT_MESSAGE =
  "Hola Ignacio, vi tu sitio y quiero conversar sobre un proyecto";

export function waLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
