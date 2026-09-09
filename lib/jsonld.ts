import { site } from "@/content/site";
import type { FaqItem } from "@/content/faq";
import type { CaseStudy } from "@/content/cases";

/** Teléfono en formato E.164, que es el que espera schema.org. */
const TELEPHONE = `+${site.whatsapp}`;

export function buildJsonLd() {
  const business = {
    "@type": "ProfessionalService",
    "@id": `${site.domain}/#business`,
    name: site.name,
    description: site.tagline,
    url: site.domain,
    email: site.email,
    telephone: TELEPHONE,
    areaServed: {
      "@type": "AdministrativeArea",
      name: site.region,
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: site.addressRegion,
      addressCountry: site.addressCountry,
    },
    founder: { "@id": `${site.domain}/#person` },
    /* Deliberadamente ausentes: `openingHours` y `priceRange`. Google puede
     * mostrar estos campos como si fueran datos oficiales del negocio, así que
     * solo deben ir si son ciertos. Para agregarlos:
     *   priceRange: "$$",
     *   openingHoursSpecification: [{ "@type": "OpeningHoursSpecification",
     *     dayOfWeek: ["Monday", ...], opens: "09:00", closes: "19:00" }],
     */
    /* `sameAs` solo debe listar perfiles que existan y estén vivos: una
     * referencia muerta no suma y sí resta confianza. Ver content/site.ts. */
    ...(site.instagram ? { sameAs: [site.instagram] } : {}),
  };

  const person = {
    "@type": "Person",
    "@id": `${site.domain}/#person`,
    name: site.owner,
    jobTitle: "Diseñador y desarrollador web",
    url: `${site.domain}/sobre-mi`,
    worksFor: { "@id": `${site.domain}/#business` },
    email: site.email,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [business, person],
  };
}

/** FAQPage: hace que las preguntas puedan salir desplegadas en Google. */
export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildCaseJsonLd(caseStudy: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${caseStudy.client} — caso de ${site.name}`,
    description: caseStudy.summary,
    url: `${site.domain}/casos/${caseStudy.slug}`,
    image: `${site.domain}${caseStudy.image}`,
    creator: { "@id": `${site.domain}/#business` },
    about: caseStudy.client,
  };
}

/** Migas para las páginas de detalle. `items` va de la raíz a la página actual. */
export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.domain}${item.path}`,
    })),
  };
}
