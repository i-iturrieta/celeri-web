import Link from "next/link";
import { Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";

/**
 * No renderiza nada mientras `content/testimonials.ts` esté vacío, así que se
 * puede dejar puesto en las páginas desde ya: cuando llegue el primer
 * testimonio aparece solo.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {testimonials.map((t) => (
        <figure
          key={t.author}
          className="rounded-2xl border border-ink/10 bg-cream-light p-7"
        >
          <Quote className="h-7 w-7 text-accent-dark" aria-hidden="true" />
          <blockquote className="mt-4 font-display text-lg leading-relaxed text-ink italic">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-5 text-small text-ink-muted">
            <span className="font-semibold text-ink">{t.author}</span>
            <br />
            {t.role}
            {t.caseSlug && (
              <>
                {" · "}
                <Link
                  href={`/casos/${t.caseSlug}`}
                  className="focus-ring transition-brand font-semibold text-brand hover:text-accent-dark"
                >
                  Ver el caso
                </Link>
              </>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
