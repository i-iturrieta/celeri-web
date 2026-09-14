import { process } from "@/content/process";

/**
 * Los cuatro pasos, como línea de tiempo.
 *
 * Este es el único lugar del sitio donde hay números, y por eso siguen
 * significando algo: acá el orden es real — no puedes publicar antes de
 * conversar. Cuando los mismos 01/02/03 estaban también sobre los servicios,
 * que son un menú, el recurso dejaba de codificar información y pasaba a ser
 * decoración.
 *
 * La secuencia además se ve en la estructura, no solo en los dígitos: los
 * bordes superiores de los cuatro pasos forman una sola línea continua, y un
 * segmento de latón sobre esa línea marca dónde empieza cada uno. Antes eran
 * cuatro tarjetas sueltas, que es exactamente como no se dibuja un proceso.
 */
export default function ProcessSteps() {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {process.map((step, i) => (
        <li
          key={step.title}
          className="relative border-t rule pt-7 pr-8 pb-2 last:pr-0"
        >
          {/* El segmento de latón se monta sobre la regla continua: es la marca
              de inicio de cada paso. -top-px lo deja exactamente encima del
              borde de 1px, no debajo. */}
          <span
            aria-hidden="true"
            className="absolute -top-px left-0 h-px w-12 bg-brass"
          />

          <p className="font-display-text text-small tabular-nums text-ink-subtle">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 text-h3 text-ink">{step.title}</h3>
          <p className="mt-3 max-w-[42ch] text-small text-ink-muted">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
