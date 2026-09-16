import Link from "next/link";
import { waLink } from "@/lib/whatsapp";
import { clientCases } from "@/content/cases";
import Container from "@/components/Container";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui";

/**
 * Los datos duros de la portada.
 *
 * Dos, no tres, y es una decisión tomada — no un hueco pendiente. El tercero
 * natural sería el plazo de entrega, y se descartó porque varía demasiado de
 * proyecto a proyecto: un número que en la práctica cambia no es un dato duro,
 * es una promesa que después hay que sostener por WhatsApp. Un rango vago
 * ("2 a 8 semanas") tampoco dice nada y encima resta.
 *
 * Los dos que quedan se sostienen solos: el primero sale de content/cases.ts y
 * el segundo es la promesa que hace la bajada ("diseño y programo yo mismo").
 *
 * Ese "1" además carga ahora con un trabajo que antes hacía el titular, cuando
 * decía "hechos por una sola persona". Ahí sonaba a disculpa — abría hablando
 * de lo chico. Como número en una ficha se lee como lo que es: un dato.
 *
 * La reja es `sm:grid-cols-3` con la tercera celda vacía a propósito: alinea
 * las reglas verticales con la franja de clientes de abajo. No la bajes a
 * `grid-cols-2` para "arreglar" el hueco.
 */
const STATS = [
  { value: String(clientCases.length), label: "negocios en línea" },
  { value: "1", label: "persona, de principio a fin" },
];

/**
 * Portada del home.
 *
 * Es uno de los tres bloques oscuros macizos que el design system nombra
 * (nav, hero, pie). Antes era papel con dos manchas de luz derivando por
 * detrás del titular; se fueron las dos. Eran gradientes radiales con blur —
 * el sistema pide fondos de color plano y dice "no gradients" sin matices — y
 * además eran el único movimiento del sitio que nadie disparaba.
 *
 * Lo que sí queda es la entrada escalonada al cargar: un solo momento
 * orquestado, no un fade-up por sección al hacer scroll. El escalonado va por
 * --rise-delay desde acá.
 *
 * El titular se lleva todo el presupuesto tipográfico y lo de alrededor se
 * mantiene callado a propósito.
 */
export default function Hero() {
  return (
    <section className="bg-surface-inverse">
      <Container className="pt-20 pb-16 sm:pt-28 sm:pb-24">
        {/* El eyebrow en mono es el recurso del sistema para las etiquetas, y
            acá además dice algo útil: que estás tomando trabajo. Dice "tomando"
            y no "disponible" a propósito — "disponible" señala tiempo libre, o
            sea poca demanda; "tomando" dice que ya estás trabajando y que igual
            entra uno más. */}
        <p
          className="rise label-mono text-surface-accent"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          {"// tomando proyectos nuevos"}
        </p>

        <h1
          /* `tracking-tighter` (-0.03em) y no el -0.02em del resto de los
             titulares: este es el único texto del sitio que llega a 4rem, y el
             tracking óptico tiene que cerrarse a medida que el tamaño sube o
             los caracteres se ven sueltos. */
          className="rise font-display mt-5 max-w-[16ch] text-5xl leading-tight font-bold tracking-tighter text-balance text-text-on-inverse"
          style={{ "--rise-delay": "60ms" } as React.CSSProperties}
        >
          Sitios web que hacen una sola cosa: que te escriban
        </h1>

        <p
          className="rise mt-6 max-w-[52ch] text-lg/relaxed text-text-on-inverse-muted"
          style={{ "--rise-delay": "180ms" } as React.CSSProperties}
        >
          Converso contigo antes de diseñar nada, porque cada negocio funciona
          distinto. Después diseño y programo yo mismo, sin pasarte a un equipo
          que no conoces.
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center gap-3.5"
          style={{ "--rise-delay": "290ms" } as React.CSSProperties}
        >
          <Button
            size="lg"
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            icon={<WhatsAppIcon className="h-[18px] w-[18px]" />}
          >
            Hablemos por WhatsApp
          </Button>

          <Button size="lg" variant="outline-inverse" href="/servicios">
            Ver qué puedo hacer
          </Button>
        </div>
      </Container>

      {/* Prueba, no adorno: los negocios reales que están en línea ahora mismo,
          arriba del pliegue y antes de cualquier promesa.

          Va en dos filas separadas por reglas finas, no en una lista con gaps.
          El bloque oscuro del hero no admite gradientes ni texturas — el
          sistema los prohíbe por nombre — así que lo único que puede darle
          peso es estructura visible. Las reglas son esa estructura. */}
      {clientCases.length > 0 && (
        <Container
          className="rise"
          style={{ "--rise-delay": "420ms" } as React.CSSProperties}
        >
          {/* Tres columnas en desktop aunque hoy los datos sean dos: así las
              reglas verticales caen en el mismo sitio que las de la franja de
              clientes de abajo, y las dos filas comparten una reja visible en
              vez de ser dos bandas sueltas. La tercera celda, vacía, es donde
              entra el plazo cuando se confirme. */}
          <dl className="grid grid-cols-2 border-t border-border-inverse sm:grid-cols-3 sm:divide-x sm:divide-border-inverse">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                /* flex-col-reverse: el número va arriba en pantalla, pero en el
                   DOM el <dt> tiene que preceder a su <dd>. */
                className={`flex flex-col-reverse gap-1.5 py-7 ${
                  i === 0 ? "pr-8 sm:pr-8" : "pl-8 sm:pl-8"
                }`}
              >
                <dt className="label-mono text-text-on-inverse-muted">
                  {stat.label}
                </dt>
                <dd className="font-display text-3xl font-bold tabular-nums text-text-on-inverse">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="border-t border-border-inverse pt-7 pb-9">
            <p className="label-mono text-text-on-inverse-muted">
              En línea ahora mismo
            </p>
            <ul className="mt-5 grid gap-y-5 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-border-inverse">
              {clientCases.map((c) => (
                <li key={c.slug} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
                  <Link
                    href={`/casos/${c.slug}`}
                    className="focus-ring transition-brand group block text-text-on-inverse hover:text-surface-accent"
                  >
                    <span className="font-display block text-[17px] font-semibold">
                      {c.client}
                    </span>
                    {/* El rubro sale de content/cases.ts. Un nombre solo no le
                        dice nada a quien no conoce al cliente; con el rubro,
                        la franja pasa de ser una lista a ser una ficha. */}
                    <span className="label-mono transition-brand mt-1.5 block text-text-on-inverse-muted group-hover:text-text-on-inverse">
                      {c.sector}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      )}
    </section>
  );
}
