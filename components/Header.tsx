"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur-sm">
      <Container className="flex items-center justify-between gap-6 py-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="focus-ring transition-brand font-display text-2xl font-semibold text-ink italic hover:text-brand"
        >
          {site.name}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`focus-ring transition-brand border-b-2 pb-1 text-sm font-semibold hover:text-ink ${
                  active
                    ? "border-accent text-ink"
                    : "border-transparent font-medium text-ink-muted hover:border-ink/20"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring transition-brand inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-ink-inverse hover:bg-brand-dark"
          >
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="focus-ring transition-brand rounded-md p-1 text-ink hover:text-brand md:hidden"
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
        className="flex flex-col gap-[18px] border-t border-ink/10 bg-cream px-6 pt-5 pb-7 md:hidden"
      >
        {NAV_LINKS.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={`focus-ring transition-brand text-base hover:text-brand ${
                active ? "font-bold text-ink" : "font-medium text-ink-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="focus-ring transition-brand mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3.5 text-small font-semibold text-ink-inverse hover:bg-brand-dark"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
