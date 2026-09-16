"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import Container from "@/components/Container";
import { Button } from "@/components/ui";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/casos", label: "Casos" },
  { href: "/contacto", label: "Contacto" },
];

/**
 * El wordmark, con el punto ámbar del design system.
 *
 * El punto es el único lugar del sitio donde el ámbar decora en vez de indicar
 * algo, y se lo permite porque es la marca: no hay logo ni símbolo — el
 * wordmark en Sora ES la identidad.
 */
function Wordmark({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`focus-ring transition-brand font-display leading-none font-bold tracking-tight ${className}`}
    >
      {site.name.toLowerCase()}
      <span className="text-surface-accent" aria-hidden="true">
        .
      </span>
    </Link>
  );
}

/**
 * La barra superior.
 *
 * Pasó a ser un bloque oscuro macizo: el design system nombra nav, hero y pie
 * como las tres superficies de marca, y sobre papel la barra era una franja
 * pálida que no pertenecía a nada.
 *
 * Con el fondo opaco se fue el `backdrop-blur` y el borde condicional al
 * scroll. El blur estaba prohibido por el sistema ("no blur-behind-nav") y el
 * borde que aparecía al bajar existía para no cortar el campo de luz del hero
 * —campo que ya no está, porque el hero también es oscuro ahora.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Con el menú móvil abierto, Escape lo cierra y el fondo no hace scroll: sin
  // esto quedabas atrapado desplazando la página por detrás del panel.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border-inverse bg-surface-inverse">
      <Container className="flex items-center justify-between gap-8 py-4">
        <Wordmark
          onClick={() => setOpen(false)}
          className="text-[22px] text-text-on-inverse"
        />

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                /* El ámbar marca "estás aquí" y nada más. Es la misma regla
                   que en el resto del sistema: el acento indica, no decora. */
                className={`focus-ring transition-brand relative py-1 text-sm ${
                  active
                    ? "text-text-on-inverse"
                    : "text-text-on-inverse-muted hover:text-text-on-inverse"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-surface-accent"
                  />
                )}
              </Link>
            );
          })}

          <Button
            size="sm"
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </Button>
        </nav>

        <button
          type="button"
          className="focus-ring transition-brand -mr-1 p-1 text-text-on-inverse md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </Container>

      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-border-inverse bg-surface-inverse md:hidden"
      >
        <Container className="flex flex-col py-2">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`focus-ring transition-brand border-b border-border-inverse py-4 font-display text-[22px] font-semibold last:border-b-0 ${
                  active
                    ? "text-surface-accent"
                    : "text-text-on-inverse hover:text-surface-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Button
            size="md"
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="my-5 w-full"
          >
            Hablemos por WhatsApp
          </Button>
        </Container>
      </div>
    </header>
  );
}
