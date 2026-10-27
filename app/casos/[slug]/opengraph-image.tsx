import { notFound } from "next/navigation";
import { cases, getCase } from "@/content/cases";
import { site } from "@/content/site";
import { renderCaseOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/* Una tarjeta por caso, generada en el build: los casos son pocos y no cambian
 * entre despliegues, igual que las páginas que las enlazan. */
export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

/* `alt` solo puede ser una constante exportada, y acá depende del slug: por eso
 * va en `generateImageMetadata`, que sí recibe `params`. */
export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const c = getCase(params.slug);
  return [
    {
      id: "og",
      size: OG_SIZE,
      contentType: OG_CONTENT_TYPE,
      alt: c ? `${c.client} — caso de ${site.name}` : site.name,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  return renderCaseOgImage(c);
}
