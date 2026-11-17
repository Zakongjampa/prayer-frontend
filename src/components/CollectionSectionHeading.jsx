export default function CollectionSectionHeading({
  description,
  eyebrow,
  id,
  sideContent,
  title,
  className = "",
}) {
  return (
    <div
      className={`mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10 ${className}`.trim()}
    >
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#d3a77c]">
          {eyebrow}
        </p>
        <h2
          className="mb-3 text-3xl font-semibold sm:text-4xl"
          id={id}
        >
          {title}
        </h2>
        {description && (
          <p className="max-w-2xl leading-7 text-[#f4e9d2b8]">
            {description}
          </p>
        )}
      </div>
      {sideContent}
    </div>
  );
}
