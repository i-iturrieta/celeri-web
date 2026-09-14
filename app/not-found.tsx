import Link from "next/link";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import Container from "@/components/Container";

export const metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <Container width="narrow" className="py-28 sm:py-36">
      <p className="font-display-text text-small tabular-nums text-ink-subtle">
        404
      </p>
      <h1 className="font-display mt-5 max-w-[14ch] text-h1 text-balance text-ink">
        Esta página no existe
      </h1>
      <p className="mt-7 max-w-[52ch] text-lead text-ink-muted">
        Puede que el enlace esté mal escrito o que la página haya cambiado de
        lugar. Desde el inicio llegas a todo lo demás.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-5">
        <Link
          href="/"
          className="focus-ring transition-brand inline-flex items-center bg-petrol px-7 py-4 text-small font-medium text-on-dark hover:bg-petrol-deep"
        >
          Volver al inicio
        </Link>
        <a
          href={waLink(`Hola, buscaba algo en ${site.domain} y no lo encontré`)}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring transition-brand text-small font-medium text-ink underline decoration-ink/30 decoration-1 underline-offset-[6px] hover:text-petrol hover:decoration-2 hover:decoration-petrol"
        >
          Pregúntame por WhatsApp
        </a>
      </div>
    </Container>
  );
}
