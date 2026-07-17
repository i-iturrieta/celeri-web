import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

type CTASectionProps = {
  title?: string;
  subtitle?: string;
  message?: string;
};

export default function CTASection({
  title = "¿Hablamos por WhatsApp?",
  subtitle = "Cuéntame de tu negocio y te doy una asesoría breve y gratuita, sin compromiso.",
  message,
}: CTASectionProps) {
  return (
    <div className="rounded-2xl bg-brand-dark px-6 py-10 text-center text-ink-inverse sm:px-12">
      <h2 className="font-display text-2xl font-semibold sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-ink-inverse/70">{subtitle}</p>
      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-strong px-6 py-3 text-sm font-semibold text-ink-inverse transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        Escribir por WhatsApp
      </a>
    </div>
  );
}
