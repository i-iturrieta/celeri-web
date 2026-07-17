import type { Metadata } from "next";
import { site } from "@/content/site";
import CTASection from "@/components/CTASection";

const DESCRIPTION =
  "Diseño y desarrollo web en la Región de Los Lagos: entiendo tu negocio antes de diseñar nada, y respondes directo conmigo, no con un equipo de ventas.";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: DESCRIPTION,
  openGraph: {
    title: `Sobre mí | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.domain}/sobre-mi`,
    images: [{ url: "/og/default.png", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
        Sobre mí
      </h1>
      <p className="mt-5 text-lg text-ink/70">
        Hago sitios web para negocios de la Región de Los Lagos que ya tienen
        clientes, pero todavía no tienen un lugar propio y serio donde
        mostrarse. No trabajo con plantillas genéricas ni como una agencia
        que te pasa de mano en mano — hablas conmigo, de principio a fin.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold text-ink">
        No soy una plantilla que no entiende tu rubro
      </h2>
      <p className="mt-3 text-ink/70">
        Antes de proponerte un diseño, quiero entender cómo funciona tu
        negocio de verdad: qué preguntan tus clientes antes de comprar, en
        qué momento se frustran, qué te hace perder tiempo todos los días.
        Con Mirador Propiedades, por ejemplo, antes de dibujar una sola
        pantalla dediqué tiempo a entender cómo se mueve una propiedad desde
        que está disponible hasta que se reserva — porque eso, no un
        catálogo bonito, era lo que el sitio tenía que resolver.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-ink">
        No soy una agencia que te trata como un ticket
      </h2>
      <p className="mt-3 text-ink/70">
        Cuando me escribes, hablas conmigo — no con un ejecutivo de cuenta
        que después pasa tu proyecto a un equipo que nunca vas a conocer. Yo
        diseño, yo programo, y yo te respondo cuando tienes una duda porque
        se te ocurrió algo mientras cerrabas el local.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-ink">
        Cómo trabajo
      </h2>
      <p className="mt-3 text-ink/70">
        La primera conversación no es sobre colores de botones. Es sobre qué
        te está costando hoy: gente que te escribe por Instagram y no sabe
        si existes de verdad, horas perdidas coordinando citas una por una,
        clientes que se van a la competencia porque no te encuentran en
        Google. De ahí para atrás construimos el sitio, no al revés.
      </p>

      <div className="mt-16">
        <CTASection
          title="Conversemos de tu negocio"
          subtitle="Sin plantillas, sin intermediarios. Escríbeme y hablamos directo."
        />
      </div>
    </div>
  );
}
