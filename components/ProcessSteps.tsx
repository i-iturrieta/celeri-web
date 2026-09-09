import { process } from "@/content/process";

export default function ProcessSteps() {
  return (
    <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {process.map((step, i) => (
        <li
          key={step.title}
          className="transition-brand rounded-2xl border border-ink/10 bg-cream-light p-7 hover:border-ink/20 hover:shadow-md"
        >
          <p
            className="mb-4 font-display text-[26px] font-semibold text-accent-dark italic"
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mb-2.5 text-h3 text-ink">{step.title}</h3>
          <p className="text-small text-ink-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
