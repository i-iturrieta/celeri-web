import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.domain,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.domain}/servicios`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.domain}/sobre-mi`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${site.domain}/contacto`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
