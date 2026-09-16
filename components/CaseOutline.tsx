"use client";

import { useLinkStatus } from "next/link";

/**
 * El contorno que se dibuja sobre la captura de un caso.
 *
 * Va DENTRO del <Link> de la imagen, que es requisito de `useLinkStatus`: el
 * hook lee el estado de navegación del Link que lo contiene.
 *
 * Es lo único "use client" de la tarjeta. El dibujado y el repliegue son CSS
 * puro (ver `case-outline` en globals.css) y no necesitarían JavaScript; lo
 * que sí lo necesita es la vuelta extra, porque no hay forma de saber desde
 * CSS si la navegación terminó.
 *
 * SOBRE LA VUELTA EXTRA — leer antes de "arreglarla" porque no se ve:
 *
 * Las páginas de caso son estáticas (`generateStaticParams`) y Next las
 * prefetchea, así que al hacer click la navegación ya está resuelta y `pending`
 * nunca llega a ser true. Eso es lo correcto: la vuelta es un aviso de espera,
 * y si no hay espera no hay nada que avisar.
 *
 * Es tentador forzarla con `prefetch={false}` o con un retardo artificial para
 * que se luzca. Las dos cosas hacen el sitio más lento a cambio de un efecto —
 * exactamente el negocio que este sitio no quiere hacer. Donde sí aparece es
 * donde importa: conexión mala, celular con mala señal. Para verla en
 * desarrollo, estrangulá la red en DevTools (Network → Slow 4G) y hacé click.
 */
export default function CaseOutline() {
  const { pending } = useLinkStatus();

  return (
    <svg
      aria-hidden="true"
      /* SIN viewBox, a propósito. La versión anterior usaba uno cuadrado con
         `preserveAspectRatio="none"`, que lo estira a la caja real: 6.2x a lo
         ancho contra 3.5x a lo alto. En ese espacio deformado el cálculo de
         guiones deja de ser fiable — el contorno se dibujaba en un solo tramo
         suelto en vez de recorrer el perímetro.

         Sin viewBox, una unidad de usuario es un píxel CSS y no hay escala que
         deformar. El <rect> se estira con width/height al 100%, y `pathLength`
         hace el resto del trabajo. */
      className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
    >
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        /* El perímetro pasa a medir 100 sin importar cuánto mida la tarjeta,
           así que un solo par de números sirve para cualquier tamaño. El
           trazado de un <rect> arranca en la esquina superior izquierda y va en
           el sentido del reloj, que es justo el recorrido que se quiere. */
        pathLength="100"
        /* El `group` está en el <article> de CaseCard.
         *
         * `group-focus-within` y no solo `group-hover`: la imagen es
         * aria-hidden con tabIndex -1 — repite el destino del título de al
         * lado — así que quien navega con teclado nunca la toca. Sin esto, la
         * única interacción con movimiento del sitio sería exclusiva de quien
         * usa mouse. Que el contorno también se dibuje al enfocar cualquier
         * link de la tarjeta es, además, información útil: dice cuál tarjeta
         * tiene el foco. */
        className="case-outline group-focus-within:[stroke-dashoffset:0] group-hover:[stroke-dashoffset:0]"
        style={
          pending
            ? {
                strokeDashoffset: 0,
                animation:
                  "case-lap var(--duration-lap) linear infinite",
              }
            : undefined
        }
      />
    </svg>
  );
}
