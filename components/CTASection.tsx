import { waLink } from "@/lib/whatsapp";
import Container from "@/components/Container";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui";

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
      <h2 className="font-display max-w-[18ch] text-4xl leading-tight font-bold tracking-tight text-balance text-text-primary">
        {title}
      </h2>
      <p className="mt-6 max-w-[54ch] text-lg/relaxed text-text-secondary">
        {subtitle}
      </p>

      {/* Secundario y no ámbar, a propósito. El ámbar primario está reservado
          al llamado principal de cada página — el del hero en el home, el del
          plan recomendado en servicios. Si esta banda también fuera ámbar,
          habría dos en la misma pantalla y ninguno de los dos significaría
          "empezá por acá". */}
      <Button
        variant="secondary"
        size="lg"
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        icon={<WhatsAppIcon className="h-[18px] w-[18px]" />}
        className="mt-10"
      >
        Hablemos por WhatsApp
      </Button>
    </>
  );
}

/**
 * El cierre.
 *
 * Bloque de color plano sobre la superficie hundida del sistema. Antes era una
 * banda oscura con dos luces radiales por detrás; se fueron las dos porque el
 * design system pide fondos planos y prohíbe los gradientes, y se fue también
 * el oscuro porque el pie volvió a ser oscuro y los dos juntos se fundían en
 * un solo bloque negro donde el llamado a la acción no destacaba contra nada.
 *
 * El orden de superficies que sostiene esto es papel → caliza → pie oscuro.
 * Cambiar una de las tres obliga a revisar las otras dos.
 */
function Surface({ children }: { children: React.ReactNode }) {
  return <div className="bg-surface-sunken">{children}</div>;
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
