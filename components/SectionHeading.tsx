type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-lg text-black/70">{subtitle}</p>}
    </div>
  );
}
