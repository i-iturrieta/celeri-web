import Link from "next/link";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import Container from "@/components/Container";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/casos", label: "Casos" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

function formatPhone(whatsapp: string): string {
  // "56964308294" -> "+56 9 6430 8294"
  const digits = whatsapp.replace(/\D/g, "");
  return `+${digits.slice(0, 2)} ${digits.slice(2, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
}

const LINK_CLASS =
  "focus-ring-inverse transition-brand text-small text-ink-inverse-muted hover:text-ink-inverse";

export default function Footer() {
  return (
    <footer className="bg-brand-darker text-ink-inverse">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="focus-ring-inverse transition-brand font-display text-2xl font-semibold italic hover:text-brand-tint"
          >
            {site.name}
            <span className="text-accent">.</span>
          </Link>
          <p className="mt-4 max-w-xs text-small text-ink-inverse-muted">
            Sitios web para negocios de la {site.regionShort} que ya tienen
            clientes y necesitan un lugar propio donde mostrarse.
          </p>
        </div>

        <div>
          <p className="mb-4 text-eyebrow text-ink-inverse-subtle uppercase">
            Navegación
          </p>
          <div className="flex flex-col items-start gap-2.5">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={LINK_CLASS}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-eyebrow text-ink-inverse-subtle uppercase">
            Contacto
          </p>
          <div className="flex flex-col items-start gap-2.5">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
            >
              {formatPhone(site.whatsapp)}
            </a>
            <a href={`mailto:${site.email}`} className={LINK_CLASS}>
              {site.email}
            </a>
          </div>
        </div>
      </Container>

      <Container className="border-t border-ink-inverse/15 py-8">
        <p className="text-[13px] text-ink-inverse-subtle">
          © {new Date().getFullYear()} {site.name}. Hecho en {site.region}.
        </p>
      </Container>
    </footer>
  );
}
