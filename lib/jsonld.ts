import { site } from "@/content/site";

export function buildJsonLd() {
  const business = {
    "@type": "ProfessionalService",
    "@id": `${site.domain}/#business`,
    name: site.name,
    description: site.tagline,
    url: site.domain,
    email: site.email,
    areaServed: {
      "@type": "AdministrativeArea",
      name: site.region,
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "Los Lagos",
      addressCountry: "CL",
    },
    sameAs: [site.instagram],
  };

  const person = {
    "@type": "Person",
    "@id": `${site.domain}/#person`,
    name: "Ignacio Iturrieta",
    worksFor: {
      "@id": `${site.domain}/#business`,
    },
    email: site.email,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [business, person],
  };
}
