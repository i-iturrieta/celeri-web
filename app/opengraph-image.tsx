import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { site } from "@/content/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Sitios web a medida, del diseño al código";

export default function Image() {
  return renderOgImage({
    eyebrow: site.owner,
    /* El mismo titular que el hero, palabra por palabra. Es la tarjeta que se
       ve al compartir el sitio por WhatsApp: si promete una cosa y la página
       que abre después dice otra, la primera impresión ya se gastó. */
    title: "Sitios web a medida, del diseño al código",
  });
}
