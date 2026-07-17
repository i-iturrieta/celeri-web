import Link from "next/link";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

function formatPhone(whatsapp: string): string {
  // "56964308294" -> "+56 9 6430 8294"
  const digits = whatsapp.replace(/\D/g, "");
  return `+${digits.slice(0, 2)} ${digits.slice(2, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
}

export default function Footer() {
  return (
    <footer className="bg-brand-darker text-ink-inverse">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="font-display text-2xl font-semibold italic"
          >
            {site.name}
            <span className="text-accent">.</span>
          </Link>
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink-inverse/60">
            Sitios web para negocios de la Región de Los Lagos que ya tienen
            clientes y necesitan un lugar propio donde mostrarse.
          </p>
        </div>

        <div>
          <p className="mb-4 text-[13px] font-bold tracking-[0.08em] text-ink-inverse/50 uppercase">
            Navegación
          </p>
          <div className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] text-ink-inverse/85"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-[13px] font-bold tracking-[0.08em] text-ink-inverse/50 uppercase">
            Contacto
          </p>
          <div className="flex flex-col gap-2.5">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-ink-inverse/85"
            >
              {formatPhone(site.whatsapp)}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-[15px] text-ink-inverse/85"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1120px] border-t border-ink-inverse/15 px-6 py-8">
        <p className="text-[13px] text-ink-inverse/50">
          © 2026 {site.name}. Hecho en {site.region}.
        </p>
      </div>
    </footer>
  );
}
