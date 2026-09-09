import { faq } from "@/content/faq";

export default function Faq() {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {faq.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="focus-ring transition-brand flex cursor-pointer list-none items-center justify-between gap-4 text-h3 text-ink hover:text-brand">
            {item.question}
            <span
              aria-hidden="true"
              className="transition-brand shrink-0 text-2xl leading-none font-normal text-ink-subtle group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-[720px] text-body text-ink-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
