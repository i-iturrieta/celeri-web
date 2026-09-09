import Link from "next/link";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import Container from "@/components/Container";

export const metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <Container width="narrow" className="py-24 text-center">
      <p className="text-eyebrow text-accent-dark uppercase">Error 404</p>
      <h1 className="mt-4 font-display text-h1 text-ink">
        Esta página no existe
      </h1>
      <p className="mx-auto mt-5 max-w-[480px] text-lead text-ink-muted">
        Puede que el enlace esté mal escrito o que la página haya cambiado de
        lugar. Desde el inicio llegas a todo lo demás.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="focus-ring transition-brand inline-flex items-center rounded-lg bg-brand px-7 py-4 text-base font-semibold text-ink-inverse hover:bg-brand-dark"
        >
          Volver al inicio
        </Link>
        <a
          href={waLink(`Hola, buscaba algo en ${site.domain} y no lo encontré`)}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring transition-brand inline-flex items-center rounded-lg border-[1.5px] border-ink/20 px-7 py-4 text-base font-semibold text-ink hover:border-brand hover:text-brand"
        >
          Pregúntame por WhatsApp
        </a>
      </div>
    </Container>
  );
}
