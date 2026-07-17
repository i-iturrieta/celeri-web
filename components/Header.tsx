"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-6 px-6 py-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-2xl font-semibold italic text-ink"
        >
          {site.name}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 pb-1 text-sm font-semibold text-ink transition-colors ${
                  active
                    ? "border-accent"
                    : "border-transparent font-medium text-ink/70 hover:text-ink"
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
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-ink-inverse"
          >
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-[18px] border-t border-ink/10 bg-cream px-6 pt-5 pb-7 md:hidden">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-base ${
                  active ? "font-bold text-ink" : "font-medium text-ink/75"
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
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3.5 text-[15px] font-semibold text-ink-inverse"
          >
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
