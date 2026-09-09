import { waLink } from "@/lib/whatsapp";
import Container from "@/components/Container";
import WhatsAppIcon from "@/components/WhatsAppIcon";

type CTASectionProps = {
  title?: string;
  subtitle?: string;
  /** Texto precargado en WhatsApp. */
  message?: string;
  /**
   * `band` — banda ancha a sangre, para el cierre de una página.
   * `card` — caja redondeada dentro del flujo, para cerrar una sección.
   *
   * El home usaba banda y las internas caja, sin que ninguna fuera "la
   * correcta": eran dos componentes distintos. Ahora es uno con dos formas.
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
      <h2 className="font-display text-h2 text-ink-inverse">{title}</h2>
      <p className="mt-4 text-lead text-ink-inverse-muted">{subtitle}</p>
      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring-inverse transition-brand mt-8 inline-flex items-center gap-2.5 rounded-lg bg-accent-strong px-8 py-4 text-base font-semibold text-ink-inverse hover:bg-accent-dark hover:scale-105"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Hablemos por WhatsApp
      </a>
    </>
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
      <section className="bg-brand-dark">
        <Container width="narrow" className="py-20 text-center">
          <Inner title={title} subtitle={subtitle} message={message} />
        </Container>
      </section>
    );
  }

  return (
    <div className="rounded-2xl bg-brand-dark px-6 py-12 text-center sm:px-12">
      <Inner title={title} subtitle={subtitle} message={message} />
    </div>
  );
}
