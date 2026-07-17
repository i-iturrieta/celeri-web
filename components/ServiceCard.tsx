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
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = ICONS[service.icon] ?? Rocket;

  return (
    <div className="rounded-2xl border border-black/10 p-6 transition-shadow hover:shadow-md">
      <Icon className="h-8 w-8 text-brand" aria-hidden="true" />
      <h3 className="mt-4 font-display text-lg font-semibold text-black">
        {service.title}
      </h3>
      <p className="mt-2 text-sm text-black/70">{service.problem}</p>
      <p className="mt-3 text-sm font-medium text-brand">→ {service.outcome}</p>
    </div>
  );
}
