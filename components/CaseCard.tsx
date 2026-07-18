import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/cases";

type CaseCardProps = {
  caseStudy: CaseStudy;
};

export default function CaseCard({ caseStudy }: CaseCardProps) {
  return (
    <div className="mt-9 flex flex-wrap items-center gap-8 rounded-[18px] border border-ink/10 bg-cream-light p-5">
      <a
        href={caseStudy.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-[280px] flex-1 basis-80 overflow-hidden rounded-xl"
      >
        <Image
          src={caseStudy.image}
          alt={`Captura del sitio de ${caseStudy.client}`}
          fill
          className="object-cover"
        />
      </a>

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

        <a
          href={caseStudy.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand"
        >
          Visitar sitio
          <ArrowUpRight size={17} />
        </a>
      </div>
    </div>
  );
}
