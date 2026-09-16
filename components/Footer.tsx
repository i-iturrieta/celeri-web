import Link from "next/link";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import Container from "@/components/Container";

const NAV_LINKS = [
  { href: "/servicios", label: "Servicios" },
  { href: "/casos", label: "Casos" },
  { href: "/contacto", label: "Contacto" },
];

function formatPhone(whatsapp: string): string {
  // "56964308294" -> "+56 9 6430 8294"
  const digits = whatsapp.replace(/\D/g, "");
  return `+${digits.slice(0, 2)} ${digits.slice(2, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
}

const LINK_CLASS =
  "focus-ring transition-brand text-sm text-text-on-inverse-muted hover:text-text-on-inverse";

/**
 * El pie.
 *
 * Volvió a ser oscuro: el design system nombra nav, hero y pie como las tres
 * superficies de marca. Estaba en claro por una razón concreta y documentada —
 * la banda de cierre oscura quedaba justo encima y las dos se fundían en un
 * solo bloque negro de media pantalla, dejando al llamado a la acción sin nada
 * contra qué destacar.
 *
 * Esa razón se resolvió del otro lado: CTASection pasó a ser una banda clara.
 * Ahora el contraste va papel → banda clara → pie oscuro, y cada pieza vuelve
 * a leerse como lo que es. Si alguna vez la banda vuelve a oscuro, este pie
 * tiene que volver a claro o reaparece el bloque negro.
 */
export default function Footer() {
  return (
    <footer className="bg-surface-inverse text-text-on-inverse">
      <Container className="grid grid-cols-1 gap-x-12 gap-y-12 py-20 sm:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="focus-ring transition-brand font-display text-[22px] leading-none font-bold tracking-tight text-text-on-inverse"
          >
            {site.name.toLowerCase()}
            <span className="text-surface-accent" aria-hidden="true">
              .
            </span>
          </Link>
          <p className="mt-5 max-w-[34ch] text-sm text-text-on-inverse-muted">
            Sitios web para negocios que ya tienen clientes y necesitan un lugar
            propio donde mostrarse.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <p className="label-mono text-text-on-inverse-muted">Navegación</p>
          <div className="mt-5 flex flex-col items-start gap-3">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={LINK_CLASS}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div>
          <p className="label-mono text-text-on-inverse-muted">Contacto</p>
          <div className="mt-5 flex flex-col items-start gap-3">
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

      {/* Un estudio de una persona firma su trabajo. La marca sola deja al
          visitante sin saber con quién va a hablar. */}
      <Container className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-border-inverse py-8">
        <p className="font-mono text-xs text-text-on-inverse-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-xs text-text-on-inverse-muted">
          Diseñado y programado por {site.owner}
        </p>
      </Container>
    </footer>
  );
}
