import Image from "next/image";
import type { CaseStudy } from "@/content/cases";

type CaseCardProps = {
  caseStudy: CaseStudy;
};

export default function CaseCard({ caseStudy }: CaseCardProps) {
  return (
    <div className="mt-9 flex flex-wrap items-center gap-8 rounded-[18px] border border-ink/10 bg-cream-light p-5">
      <div className="relative h-[280px] flex-1 basis-80 overflow-hidden rounded-xl">
        <Image
          src={caseStudy.images[0]}
          alt={`Captura del sitio de ${caseStudy.client}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 basis-80 py-3 pr-0 sm:pr-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {caseStudy.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-tint px-3 py-1.5 text-xs font-bold tracking-[0.04em] text-brand"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-2xl font-semibold text-ink">
          {caseStudy.client}
        </h3>
        <p className="mt-3 text-[15.5px] leading-relaxed text-ink/72">
          {caseStudy.summary}
        </p>
      </div>
    </div>
  );
}
