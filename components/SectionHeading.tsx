type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div>
      {eyebrow && (
        <p className="mb-2.5 text-[13px] font-bold tracking-[0.08em] text-accent-dark uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-[clamp(26px,3.4vw,34px)] font-semibold text-ink">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 max-w-[480px] text-base text-ink/68">
          {subtitle}
        </p>
      )}
    </div>
  );
}
