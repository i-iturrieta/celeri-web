import { faq } from "@/content/faq";

/**
 * Las preguntas frecuentes.
 *
 * El indicador de abrir/cerrar son dos trazos que forman un "+" y se vuelven
 * "−": es estado, no adorno, y tiene que estar visible siempre — sin él nadie
 * sabe que la fila se despliega. Encima, al abrirse, un segmento de latón
 * aparece sobre la regla de la fila: el mismo código que marca el paso activo
 * en el proceso y la página activa en el menú.
 */
export default function Faq() {
  return (
    <div className="border-b rule">
      {faq.map((item) => (
        <details key={item.question} className="group border-t rule">
          <summary className="focus-ring transition-brand relative flex cursor-pointer list-none items-start justify-between gap-8 py-6 text-h3 text-text-primary hover:text-text-accent [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden="true"
              className="transition-brand absolute -top-px left-0 h-px w-12 bg-surface-accent opacity-0 group-open:opacity-100"
            />
            <span className="max-w-[52ch]">{item.question}</span>

            {/* Dos trazos de 1px en vez de un glifo "+": el signo tipográfico
                cambia de grosor y de centrado según la fuente, estos no. */}
            <span
              aria-hidden="true"
              className="relative mt-2.5 block h-3 w-3 shrink-0"
            >
              <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-ink-500" />
              <span className="transition-brand absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-ink-500 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="max-w-[64ch] pb-7 text-body text-text-secondary">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
