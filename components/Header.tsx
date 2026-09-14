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

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="focus-ring transition-brand font-display text-[27px] leading-none tracking-[-0.035em] text-ink hover:text-petrol"
    >
      {site.name}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // La barra no tiene borde mientras la página está arriba del todo: así el
  // header se apoya sobre el campo de luz del hero en vez de cortarlo con una
  // línea. El borde aparece recién cuando hay contenido pasando por debajo.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`transition-brand sticky top-0 z-40 border-b bg-paper/85 backdrop-blur-md ${
        scrolled || open ? "rule" : "border-transparent"
      }`}
    >
      <Container className="flex items-center justify-between gap-8 py-5">
        <Wordmark onClick={() => setOpen(false)} />

        <nav className="hidden items-center gap-9 md:flex">
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
                /* El latón marca "estás aquí" y nada más. Es el mismo código
                   que el segmento sobre la línea del proceso: latón = posición
                   en algo. */
                className={`focus-ring transition-brand relative py-1 text-small hover:text-ink ${
                  active ? "text-ink" : "text-ink-subtle"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-brass"
                  />
                )}
              </Link>
            );
          })}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring transition-brand inline-flex items-center bg-petrol px-5 py-2.5 text-small font-medium whitespace-nowrap text-on-dark hover:bg-petrol-deep"
          >
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="focus-ring transition-brand -mr-1 p-1 text-ink hover:text-petrol md:hidden"
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
        className="border-t rule bg-paper md:hidden"
      >
        <Container className="flex flex-col py-2">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`focus-ring transition-brand border-b rule py-4 font-display text-[22px] last:border-b-0 ${
                  active ? "text-petrol" : "text-ink hover:text-petrol"
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
            className="focus-ring transition-brand my-5 inline-flex items-center justify-center bg-petrol px-5 py-4 text-small font-medium text-on-dark hover:bg-petrol-deep"
          >
            Hablemos por WhatsApp
          </a>
        </Container>
      </div>
    </header>
  );
}
