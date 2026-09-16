import type { Service } from "@/content/services";

type ServiceListProps = {
  services: Service[];
  /**
   * `compact` — solo el teaser. Para la muestra del home.
   * `full` — problema y resultado. Para /servicios.
   */
  detail?: "compact" | "full";
  /** Ver la nota en CaseCard: evita que el documento salte de h1 a h3. */
  headingLevel?: "h2" | "h3";
};

/**
 * Los servicios, como lista editorial.
 *
 * Antes esto era una rejilla de tarjetas redondeadas — y también lo eran el
 * proceso y los casos, con el mismo borde, el mismo radio y la misma sombra al
 * pasar el mouse. Tres secciones seguidas con el mismo recurso hacen que la
 * página se lea como una pila de cajas: no hay jerarquía porque todo pesa igual.
 *
 * Dos cosas que se fueron a propósito:
 *
 * - Los números 01/02/03. Los servicios son un menú, no una secuencia: puedes
 *   contratar el tercero sin pasar por el primero. Numerar algo que no es
 *   secuencia gasta el recurso, y después, cuando el proceso — que sí lo es —
 *   lo usa, ya no significa nada. Ahora los números existen en un solo lugar
 *   del sitio: ProcessSteps.
 *
 * - Los íconos. Un cohete para una landing page y una lupa para SEO son
 *   ilustración de stock: no distinguen un servicio de otro ni ayudan a elegir.
 *   El nombre del servicio en cuerpo grande hace ese trabajo mejor.
 */
export default function ServiceList({
  services,
  detail = "full",
  headingLevel: Heading = "h3",
}: ServiceListProps) {
  return (
    <ul className="border-b rule">
      {services.map((service) => (
        <li
          key={service.slug}
          /* La versión corta reparte 5/7 y la larga 6/11. Con una sola
             plantilla, el teaser de una línea arrancaba recién al 40% del
             ancho y dejaba un vacío en medio de la fila que la hacía parecer
             sin terminar. */
          className={`grid gap-x-12 gap-y-4 border-t rule py-9 md:py-11 ${
            detail === "compact"
              ? "md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
              : "md:grid-cols-[minmax(0,6fr)_minmax(0,11fr)]"
          }`}
        >
          <Heading className="font-display text-h2 text-balance text-text-primary">
            {service.title}
          </Heading>

          <div className="max-w-[60ch]">
            {detail === "compact" ? (
              <p className="text-lead text-text-secondary">{service.teaser}</p>
            ) : (
              <>
                <p className="text-body text-text-secondary">{service.problem}</p>
                {/* Qué distingue este párrafo del anterior: antes era una
                    regla ámbar al costado, pero el design system prohíbe por
                    nombre el borde de color a la izquierda de un bloque de
                    contenido. La etiqueta en mono es el recurso que el propio
                    sistema usa para esto, y además dice qué es en vez de
                    depender de que el lector interprete un color — que es
                    justo lo que no funciona si no distingues ese color. */}
                <p className="label-mono mt-6 text-text-accent">Resultado</p>
                <p className="mt-2 text-body text-text-primary">{service.outcome}</p>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
