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
};

export default function ServiceCard({
  service,
  variant = "detailed",
  index,
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
        <h3 className="mb-2.5 text-h3 text-ink">{service.title}</h3>
        <p className="text-small text-ink-muted">{service.teaser}</p>
      </div>
    );
  }

  return (
    <div className={base}>
      <Icon className="h-8 w-8 text-brand" aria-hidden="true" />
      <h3 className="mt-4 font-display text-h3 font-semibold text-ink">
        {service.title}
      </h3>
      <p className="mt-2 text-small text-ink-muted">{service.problem}</p>
      <p className="mt-3 text-small font-medium text-brand">
        → {service.outcome}
      </p>
    </div>
  );
}
