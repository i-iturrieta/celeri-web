import Link from "next/link";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import Container from "@/components/Container";

const NAV_LINKS = [
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
  "focus-ring transition-brand text-small text-ink-muted hover:text-petrol";

/**
 * El pie va en caliza, no en oscuro.
 *
 * Antes el cierre de cada página era una banda oscura e inmediatamente debajo
 * venía un pie más oscuro todavía: los dos se fundían en un solo bloque negro
 * de media pantalla y la banda de cierre, que es el llamado a la acción,
 * dejaba de destacar sobre nada. En claro, la banda vuelve a ser el remate y el
 * pie vuelve a ser lo que es — información de referencia.
 */
export default function Footer() {
  return (
    <footer className="bg-limestone text-ink">
      <Container className="grid grid-cols-1 gap-x-12 gap-y-12 py-20 sm:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="focus-ring transition-brand font-display text-[27px] leading-none tracking-[-0.035em] text-ink hover:text-petrol"
          >
            {site.name}
          </Link>
          <p className="mt-5 max-w-[34ch] text-small text-ink-muted">
            Sitios web para negocios que ya tienen clientes y necesitan un lugar
            propio donde mostrarse.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <p className="text-micro text-ink-subtle">Navegación</p>
          <div className="mt-5 flex flex-col items-start gap-3">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={LINK_CLASS}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div>
          <p className="text-micro text-ink-subtle">Contacto</p>
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
      <Container className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t rule py-8">
        <p className="text-micro text-ink-subtle">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="text-micro text-ink-muted">
          Diseñado y programado por {site.owner}
        </p>
      </Container>
    </footer>
  );
}
