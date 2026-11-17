import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Heart } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import ReadingFontSelector from "../components/ReadingFontSelector";
import useReadingFont from "../hooks/useReadingFont";
import { getPrayerById } from "../services/prayerService";
import "./Home.css";

export default function ReadPecha({ userId, likedPrayers, handleLikeButton }) {
  const { id } = useParams();
  const { font, selectFont } = useReadingFont();
  const [prayerResult, setPrayerResult] = useState({
    id: null,
    prayer: null,
    error: null,
  });

  useEffect(() => {
    let active = true;

    getPrayerById(id)
      .then((prayer) => {
        if (active) setPrayerResult({ id, prayer, error: null });
      })
      .catch((error) => {
        if (active) {
          setPrayerResult({
            id,
            prayer: null,
            error: `Failed to fetch the prayer: ${error.message}`,
          });
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  const isLoading = prayerResult.id !== id;
  const prayer = isLoading ? null : prayerResult.prayer;
  const error = isLoading ? null : prayerResult.error;

  if (isLoading || error || !prayer) {
    return (
      <main className="mx-auto w-full max-w-6xl px-1 pb-4 pt-3 text-[#f4e9d2] sm:px-6 sm:pb-12 sm:pt-5 lg:px-8">
        <Link
          className="mb-4 inline-flex items-center gap-2 !text-[#d3a77c] !no-underline hover:!text-[#f4e9d2] sm:mb-6"
          to="/prayers"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to prayers
        </Link>
        <div
          className={`home-paper-texture rounded-2xl border border-[#fff6e08c] bg-[#ead8b5] p-4 text-[#5f4738] shadow-[0_28px_80px_rgba(8,3,4,0.2)] sm:rounded-[2rem] sm:p-12 ${error ? "text-[#8b3029]" : ""}`}
          role={error ? "alert" : "status"}
        >
          {isLoading
            ? "Opening your reading..."
            : error || "Prayer not found."}
        </div>
      </main>
    );
  }

  const prayerId = Number(id);
  const liked = likedPrayers.includes(prayerId);

  return (
    <main className="mx-auto w-full max-w-6xl px-1 pb-4 pt-3 text-[#f4e9d2] sm:px-6 sm:pb-12 sm:pt-5 lg:px-8">
      <Link
        className="mb-4 inline-flex items-center gap-2 !text-[#d3a77c] !no-underline transition hover:!text-[#f4e9d2] sm:mb-6"
        to="/prayers"
      >
        <ArrowLeft size={17} aria-hidden="true" />
        Back to prayers
      </Link>

      <section className="home-paper-texture relative grid items-center gap-5 overflow-hidden rounded-2xl border border-[#fff6e08c] bg-[#ead8b5] p-3 text-[#34251d] shadow-[0_28px_80px_rgba(8,3,4,0.28)] sm:gap-8 sm:rounded-[2rem] sm:p-10 lg:grid-cols-[1fr_auto] lg:gap-12 lg:p-14">
        <div className="relative z-10">
          <p className="mb-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8d4836]">
            <span className="h-px w-7 bg-[#9c4a36]" aria-hidden="true" />
            A reading from the collection
          </p>
          <p className="home-tibetan mb-3 text-2xl" lang="bo">
            ཞལ་འདོན་དཔེ་ཆ།
          </p>
          <h1 className="mb-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {prayer.name || "Untitled prayer"}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[#675447] sm:text-lg">
            Take a quiet moment with these words. Read at your own pace, and
            return whenever you need them.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-start lg:justify-center">
          {userId != null && (
            <button
              className="inline-flex items-center gap-3 rounded-full bg-[#783b30] px-6 py-3 font-semibold text-[#fff7ea] shadow-[0_7px_18px_rgba(74,31,25,0.18)] transition duration-150 hover:-translate-y-0.5 hover:bg-[#5f2d26] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#bd795e] motion-reduce:transition-none motion-reduce:hover:transform-none"
              type="button"
              onClick={() => handleLikeButton(prayerId)}
              aria-pressed={liked}
              aria-label={liked ? "Unlike this prayer" : "Like this prayer"}
            >
              <Heart
                size={19}
                fill={liked ? "currentColor" : "none"}
                aria-hidden="true"
              />
              {liked ? "Loved" : "Love this prayer"}
            </button>
          )}
        </div>
      </section>

      <article className="home-manuscript-texture relative mx-auto mt-4 max-w-5xl overflow-hidden rounded-2xl border border-[#fff6e08c] bg-[#f4e8cf] text-[#4d372b] shadow-[0_22px_55px_rgba(8,3,4,0.22)] sm:mt-8 sm:rounded-[1.75rem]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#6f4c2f24] px-3 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#8c765f] sm:gap-3 sm:px-10 sm:py-4 sm:tracking-[0.18em]">
          <span className="inline-flex items-center gap-2">
            <BookOpen size={16} aria-hidden="true" />
            Prayer reading
          </span>
          <div className="flex items-center gap-3">
            <span lang="bo">ཞལ་འདོན།</span>
            <ReadingFontSelector
              variant="light"
              value={font.id}
              onChange={selectFont}
            />
          </div>
        </div>
        <div className="px-3 py-4 sm:px-10 sm:py-10 lg:px-16 lg:py-14">
          {prayer.content ? (
            <div
              className="mx-auto max-w-3xl text-lg leading-9 text-[#4d372b] sm:text-xl sm:leading-10 [&_a]:text-[#8d3c2d] [&_a]:underline [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-[#9b4635] [&_blockquote]:pl-5 [&_blockquote]:italic [&_h1]:mb-5 [&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_li]:mb-2 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-6 [&_p]:border-b [&_p]:border-[#5b43311f] [&_p]:pb-5 [&_p]:leading-[2.1] [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6"
              style={{ fontFamily: font.family }}
            >
              <ReactMarkdown>{prayer.content}</ReactMarkdown>
            </div>
          ) : (
            <p className="mx-auto max-w-3xl text-center text-[#766253]">
              This prayer does not have any text yet.
            </p>
          )}
        </div>
      </article>

      <div className="mx-auto mt-5 flex max-w-5xl flex-col items-start justify-between gap-3 text-sm sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
        <p className="text-[#f4e9d294]">
          A quiet home for prayer and reflection.
        </p>
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-[#eed8b352] px-5 py-2.5 font-semibold !text-[#f4e9d2] !no-underline transition hover:bg-[#eed8b317] hover:!text-[#fff7ea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c]"
          to="/prayers"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All prayers
        </Link>
      </div>
    </main>
  );
}
