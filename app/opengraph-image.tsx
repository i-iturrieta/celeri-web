import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Sitios web que hacen una sola cosa: que te escriban";

export default function Image() {
  return renderOgImage({
    eyebrow: "Diseño y desarrollo web",
    /* El mismo titular que el hero, palabra por palabra. Es la tarjeta que se
       ve al compartir el sitio por WhatsApp: si promete una cosa y la página
       que abre después dice otra, la primera impresión ya se gastó. */
    title: "Sitios web que hacen una sola cosa: que te escriban",
  });
}
