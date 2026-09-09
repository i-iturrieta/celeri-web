type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** `h2` por defecto; usa `h1` cuando encabeza una página. */
  as?: "h1" | "h2";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div>
      {eyebrow && (
        <p className="mb-2.5 text-eyebrow text-accent-dark uppercase">
          {eyebrow}
        </p>
      )}
      <Tag
        className={`font-display text-ink ${Tag === "h1" ? "text-h1" : "text-h2"}`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className="mt-3 max-w-[520px] text-body text-ink-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
