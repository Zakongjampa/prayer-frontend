import { ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import CollectionActionLink from "./CollectionActionLink";

export default function CollectionHero({
  actions,
  artworkFooter,
  artworkKicker,
  artworkLabel,
  artworkTibetan,
  description,
  eyebrow,
  floatingIcon: FloatingIcon,
  returnTo,
  tibetanLabel,
  title,
  titleEmphasis,
  titleId,
  children,
}) {
  return (
    <section className="home-paper-texture relative grid items-center gap-8 overflow-hidden rounded-[2rem] border border-[#fff6e08c] bg-[#ead8b5] p-6 text-[#34251d] shadow-[0_28px_80px_rgba(8,3,4,0.28)] sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14">
      <div className="relative z-10">
        {returnTo && (
          <Link
            className="mb-5 inline-flex items-center gap-2 font-semibold !text-[#694d3d] !no-underline transition hover:!text-[#8d3c2d]"
            to={returnTo}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Return home
          </Link>
        )}
        <p className="mb-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8d4836]">
          <span className="h-px w-7 bg-[#9c4a36]" aria-hidden="true" />
          {eyebrow}
        </p>
        <p className="home-tibetan mb-3 text-2xl" lang="bo">
          {tibetanLabel}
        </p>
        <h1
          className="mb-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          id={titleId}
        >
          {title}
          <span className="block font-[Georgia] font-normal italic text-[#9b4635]">
            {titleEmphasis}
          </span>
        </h1>
        <p className="mb-8 max-w-xl text-base leading-7 text-[#675447] sm:text-lg">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {actions.map((action) => (
            <CollectionActionLink
              key={action.label}
              href={action.href}
              to={action.to}
              icon={action.icon}
              iconSize={action.iconSize}
              variant={action.variant}
            >
              {action.label}
            </CollectionActionLink>
          ))}
        </div>
        {children}
      </div>

      <div
        className="relative mx-auto flex min-h-[23rem] w-full max-w-md items-center justify-center max-sm:min-h-[20rem]"
        role="img"
        aria-label={artworkLabel}
      >
        <div
          className="pointer-events-none absolute size-80 rounded-full border border-[#82412f33] max-sm:size-[17rem]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute size-64 rounded-full border border-dashed border-[#82412f29] max-sm:size-56"
          aria-hidden="true"
        />
        <article className="home-manuscript-texture relative z-10 min-h-[19rem] w-4/5 max-w-xs rotate-[3deg] rounded-sm border border-[#6f4c2f33] bg-[#f4e8cf] p-6 shadow-[0_22px_40px_rgba(63,34,24,0.24),8px_8px_0_rgba(112,66,42,0.13)] sm:p-8">
          <div className="mb-8 flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#8c765f]">
            <span>{artworkKicker}</span>
            <span>01</span>
          </div>
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full border border-[#9b463561] text-[#9b4635]">
            <BookOpen size={23} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <p
            className="home-tibetan mb-5 text-center text-2xl text-[#713b31]"
            lang="bo"
          >
            {artworkTibetan}
          </p>
          <div className="space-y-3" aria-hidden="true">
            <span className="block h-px bg-[#5b43314d]" />
            <span className="block h-px bg-[#5b43314d]" />
            <span className="block h-px bg-[#5b43314d]" />
            <span className="block h-px bg-[#5b43314d]" />
            <span className="mx-auto block h-px w-[68%] bg-[#5b43314d]" />
          </div>
          <p className="mt-7 text-center text-xs uppercase tracking-[0.2em] text-[#8c765f]">
            {artworkFooter}
          </p>
        </article>
        {FloatingIcon && (
          <span
            className="absolute bottom-8 right-1 z-20 rounded-full border border-[#ffefd18c] bg-[#9a4938] p-4 text-[#fff1d8] shadow-[0_8px_20px_rgba(71,31,24,0.28)]"
            aria-hidden="true"
          >
            <FloatingIcon size={20} />
          </span>
        )}
      </div>
    </section>
  );
}
