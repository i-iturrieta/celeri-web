import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { cases } from "@/content/cases";

/**
 * Las rutas estáticas se listan a mano; los casos salen de content/cases.ts,
 * así que agregar un caso nuevo lo mete al sitemap sin tocar este archivo.
 */
const STATIC_ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/servicios", changeFrequency: "monthly", priority: 0.8 },
  { path: "/casos", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sobre-mi", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contacto", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
      url: `${site.domain}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...cases.map((c) => ({
      url: `${site.domain}/casos/${c.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
