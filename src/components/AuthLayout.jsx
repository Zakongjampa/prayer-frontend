import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthLayout({
  eyebrow,
  title,
  description,
  children,
  footer,
}) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center px-4 py-8 text-[#f4e9d2] sm:px-6 sm:py-12 lg:px-8">
      <section className="relative grid w-full overflow-hidden rounded-[2rem] border border-[#fff6e026] bg-[linear-gradient(145deg,rgba(238,216,179,0.07),rgba(238,216,179,0.025)),rgba(36,16,18,0.68)] shadow-[0_28px_80px_rgba(8,3,4,0.3)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex flex-col justify-center overflow-hidden p-7 sm:p-10 lg:p-14">
          <div
            className="pointer-events-none absolute -left-24 top-1/4 size-72 rounded-full border border-[#e7c98f1a]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-12 top-[calc(25%+3rem)] size-48 rounded-full border border-dashed border-[#e7c98f1a]"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#d3a77c]">
              <span className="h-px w-7 bg-[#9c4a36]" aria-hidden="true" />
              {eyebrow}
            </p>
            <p className="home-tibetan mb-4 text-2xl text-[#e7c98f]" lang="bo">
              ཞལ་འདོན་དཔེ་ཆ།
            </p>
            <h1 className="mb-5 max-w-md text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-md text-base leading-7 text-[#f4e9d2b8]">
              {description}
            </p>
            <div className="mt-10 hidden max-w-sm items-center gap-4 rounded-2xl border border-[#eed8b32b] bg-[#eed8b30e] p-5 sm:flex">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#e7c98f3d] bg-[#e7c98f1a] text-[#e7c98f]">
                <BookOpen size={22} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <p className="text-sm leading-6 text-[#f4e9d2b8]">
                A quiet place to read, remember, and return to the words that
                matter.
              </p>
            </div>
          </div>
        </div>

        <div className="home-paper-texture m-2 rounded-[1.5rem] border border-[#fff6e08c] bg-[#ead8b5] p-6 text-[#34251d] shadow-[0_18px_50px_rgba(8,3,4,0.2)] sm:m-3 sm:p-9 lg:m-4 lg:p-12">
          <div className="mb-8">
            <p className="home-tibetan mb-2 text-lg text-[#9b4635]" lang="bo">
              ཞལ་འདོན།
            </p>
            <h2 className="mb-2 text-2xl font-semibold sm:text-3xl">
              {eyebrow}
            </h2>
            <p className="text-sm leading-6 text-[#675447]">
              {description}
            </p>
          </div>

          {children}

          <div className="mt-7 border-t border-[#6f4c2f26] pt-5 text-sm text-[#766253]">
            {footer}
          </div>
          <Link
            className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] !text-[#813f32] !no-underline transition hover:gap-3 hover:!text-[#5f2d26] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bd795e]"
            to="/"
          >
            Back to the collection
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
