import {
  Rocket,
  Link as LinkIcon,
  CalendarCheck,
  Store,
  Search,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/content/services";

const ICONS: Record<string, LucideIcon> = {
  Rocket,
  Link: LinkIcon,
  CalendarCheck,
  Store,
  Search,
};

type ServiceCardProps = {
  service: Service;
  /**
   * `numbered` — la del home: número ordinal y el teaser corto.
   * `detailed` — la de /servicios: ícono, problema y resultado.
   *
   * Antes eran dos tarjetas distintas escritas por separado (una inline en
   * app/page.tsx), así que divergían en radio, borde, padding y tipografía.
   */
  variant?: "numbered" | "detailed";
  /** Posición 1-based, solo para la variante `numbered`. */
  index?: number;
  /**
   * Nivel del encabezado de la tarjeta. `h3` sirve cuando la rejilla va bajo un
   * <h2> de sección; usa `h2` cuando cuelga directo del <h1> de la página, o el
   * documento salta de h1 a h3 y el lector de pantalla pierde la jerarquía.
   */
  headingLevel?: "h2" | "h3";
};

export default function ServiceCard({
  service,
  variant = "detailed",
  index,
  headingLevel: Heading = "h3",
}: ServiceCardProps) {
  const Icon = ICONS[service.icon] ?? Rocket;

  const base =
    "rounded-2xl border border-ink/10 bg-cream-light p-7 transition-brand hover:border-ink/20 hover:shadow-md";

  if (variant === "numbered") {
    return (
      <div className={base}>
        {/* accent-dark, no accent: sobre cream el acento base da 3.45:1. */}
        <p
          className="mb-4 font-display text-[26px] font-semibold text-accent-dark italic"
          aria-hidden="true"
        >
          {String(index ?? 1).padStart(2, "0")}
        </p>
        <Heading className="mb-2.5 text-h3 text-ink">{service.title}</Heading>
        <p className="text-small text-ink-muted">{service.teaser}</p>
      </div>
    );
  }

  return (
    <div className={base}>
      <Icon className="h-8 w-8 text-brand" aria-hidden="true" />
      <Heading className="mt-4 font-display text-h3 font-semibold text-ink">
        {service.title}
      </Heading>
      <p className="mt-2 text-small text-ink-muted">{service.problem}</p>
      <p className="mt-3 text-small font-medium text-brand">
        → {service.outcome}
      </p>
    </div>
  );
}
