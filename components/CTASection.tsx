import { waLink } from "@/lib/whatsapp";
import Container from "@/components/Container";
import WhatsAppIcon from "@/components/WhatsAppIcon";

type CTASectionProps = {
  title?: string;
  subtitle?: string;
  /** Texto precargado en WhatsApp. */
  message?: string;
  /**
   * `band` — banda a sangre, para el cierre de una página.
   * `card` — bloque dentro del flujo, para cerrar una sección.
   */
  variant?: "band" | "card";
};

const DEFAULT_TITLE = "¿Conversamos de tu proyecto?";
const DEFAULT_SUBTITLE =
  "Sin plantillas, sin intermediarios. Escríbeme y te respondo yo mismo.";

function Inner({
  title,
  subtitle,
  message,
}: Required<Pick<CTASectionProps, "title" | "subtitle">> &
  Pick<CTASectionProps, "message">) {
  return (
    <>
      <h2 className="font-display max-w-[18ch] text-h1 text-balance text-on-dark">
        {title}
      </h2>
      <p className="mt-6 max-w-[54ch] text-lead text-on-dark-muted">
        {subtitle}
      </p>
      {/* El único uso del latón a plena saturación en todo el sitio. Funciona
          porque es el único: si el latón estuviera además en los links, los
          bordes y los íconos, este botón no destacaría sobre nada. */}
      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring-inverse transition-brand mt-10 inline-flex items-center gap-2.5 bg-brass px-7 py-4 text-small font-medium text-petrol-deeper hover:bg-on-dark"
      >
        <WhatsAppIcon className="h-[18px] w-[18px]" />
        Hablemos por WhatsApp
      </a>
    </>
  );
}

/**
 * El cierre.
 *
 * El fondo no es un rectángulo de color plano: lleva una luz radial fría
 * desplazada hacia una esquina. Es lo que separa una banda que se ve
 * profunda de una que se ve como un div pintado — y cuesta un gradiente.
 */
function Surface({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden bg-petrol-deeper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_110%_at_88%_0%,var(--color-petrol)_0%,transparent_58%)] opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_6%_100%,var(--color-brass)_0%,transparent_55%)] opacity-[0.14]"
      />
      {children}
    </div>
  );
}

export default function CTASection({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  message,
  variant = "card",
}: CTASectionProps) {
  if (variant === "band") {
    return (
      <Surface>
        <Container as="section" className="py-24 sm:py-32">
          <Inner title={title} subtitle={subtitle} message={message} />
        </Container>
      </Surface>
    );
  }

  return (
    <Surface>
      <div className="px-8 py-16 sm:px-14 sm:py-20">
        <Inner title={title} subtitle={subtitle} message={message} />
      </div>
    </Surface>
  );
}
