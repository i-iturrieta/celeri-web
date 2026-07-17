import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { CaseStudy } from "@/content/cases";

type CaseCardProps = {
  caseStudy: CaseStudy;
};

export default function CaseCard({ caseStudy }: CaseCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10">
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
        {caseStudy.images.map((src) => (
          <div key={src} className="relative aspect-video">
            <Image
              src={src}
              alt={`Captura del sitio de ${caseStudy.client}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {caseStudy.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mt-4 font-display text-xl font-semibold text-black">
          {caseStudy.client}
        </h3>
        <p className="mt-2 text-sm text-black/70">{caseStudy.summary}</p>

        <a
          href={caseStudy.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
        >
          Ver sitio en vivo
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
