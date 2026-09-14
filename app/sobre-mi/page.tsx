import type { Metadata } from "next";
import { site } from "@/content/site";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import ProcessSteps from "@/components/ProcessSteps";

const DESCRIPTION = `Diseño y desarrollo web: entiendo tu negocio antes de diseñar nada, y hablas directo conmigo, no con un equipo de ventas.`;

export const metadata: Metadata = {
  title: "Sobre mí",
  description: DESCRIPTION,
  alternates: { canonical: "/sobre-mi" },
  openGraph: {
    title: `Sobre mí | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.domain}/sobre-mi`,
  },
};

/**
 * Los tres argumentos de la página, cada uno con su título.
 *
 * Están acá arriba y no incrustados en el JSX porque el cuerpo de esta página
 * es texto y nada más: sacarlo del marcado deja ver de un vistazo qué se está
 * diciendo y en qué orden, que es lo único que importa acá.
 */
const ARGUMENTS = [
  {
    title: "Aprendo cómo funciona tu rubro antes de diseñar",
    body: `Antes de proponerte un diseño, quiero entender cómo funciona tu negocio de verdad: qué preguntan tus clientes antes de comprar, en qué momento se frustran, qué te hace perder tiempo todos los días. Con Mirador Propiedades, por ejemplo, antes de dibujar una sola pantalla dediqué tiempo a entender cómo se mueve una propiedad desde que está disponible hasta que se reserva — porque eso, no un catálogo bonito, era lo que el sitio tenía que resolver.`,
  },
  {
    title: "Respondo yo, la misma persona que construye",
    body: `Cuando me escribes, hablas conmigo — no con un ejecutivo de cuenta que después pasa tu proyecto a un equipo que nunca vas a conocer. Yo diseño, yo programo, y yo te respondo cuando tienes una duda porque se te ocurrió algo mientras cerrabas el local.`,
  },
  {
    title: "Parto por lo que te está costando, no por los colores",
    body: `La primera conversación no es sobre colores de botones. Es sobre qué te está costando hoy: gente que te escribe por Instagram y no sabe si existes de verdad, horas perdidas coordinando citas una por una, clientes que se van a la competencia porque no te encuentran en Google. De ahí para atrás construimos el sitio, no al revés.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Hablas conmigo, de principio a fin"
        lead={`Soy ${site.owner}. Hago sitios web para negocios que ya tienen clientes, pero todavía no tienen un lugar propio donde mostrarse. Trabajo solo, así que nadie te pasa de mano en mano.`}
      />

      {/* El ancho de lectura se limita con un div interno, no con
          `width="prose"`: ese centra la columna en la página, y como el h1 de
          arriba arranca en el margen izquierdo del sitio, el texto quedaba
          desplazado respecto de su propio título. Alineado a la izquierda, la
          página tiene un solo eje. */}
      <Container as="section" className="pt-20 pb-24 sm:pt-24 sm:pb-28">
        <div className="max-w-[68ch]">
          {ARGUMENTS.map(({ title, body }) => (
            <article
              key={title}
              className="border-t rule pt-10 pb-12 first:border-t-0 first:pt-0 last:pb-0"
            >
              <h2 className="font-display max-w-[24ch] text-h2 text-balance text-ink">
                {title}
              </h2>
              <p className="mt-6 text-body text-ink-muted">{body}</p>
            </article>
          ))}
        </div>
      </Container>

      <section className="border-y rule bg-limestone">
        <Container className="py-24 sm:py-28">
          <SectionHeading title="Los cuatro pasos, sin letra chica" />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <CTASection
        variant="band"
        title="Conversemos de tu negocio"
        subtitle="Sin plantillas, sin intermediarios. Escríbeme y hablamos directo."
      />
    </>
  );
}
