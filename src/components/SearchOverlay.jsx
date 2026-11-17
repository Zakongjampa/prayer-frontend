import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getPublishedBooks } from "../services/booksService";
import { searchPrayers } from "../services/prayerService";

function getItems(response) {
  if (Array.isArray(response)) return response;

  if (response && typeof response === "object") {
    if (Array.isArray(response.content)) return response.content;
    if (Array.isArray(response.items)) return response.items;
  }

  throw new Error("The search service returned an unexpected response.");
}

function SearchResultSection({ title, type, items, error, onClose }) {
  return (
    <section className="mb-8" aria-label={`${title} results`}>
      <h2 className="mb-3 text-lg font-semibold text-[#f4e9d2]">{title}</h2>
      {error ? (
        <p className="rounded-xl border border-[#ffb8a833] bg-[#a8323210] p-4 text-sm text-[#ffb8a8]">
          {error}
        </p>
      ) : items.length === 0 ? (
        <p className="text-sm text-[#f4e9d294]">No {title.toLowerCase()} found.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, index) => {
            const id = item.id ?? item.bookId ?? item.number;
            const name = item.name || item.title || "Untitled";
            const key = id ?? `${name}-${index}`;

            return (
              <li key={key}>
                {id == null ? (
                  <span className="flex items-center gap-3 rounded-xl border border-[#eed8b333] p-4 text-[#f4e9d2]">
                    <BookOpen size={18} aria-hidden="true" />
                    {name}
                  </span>
                ) : (
                  <Link
                    className="group flex items-center gap-3 rounded-xl border border-[#eed8b333] bg-[#eed8b30e] p-4 !text-[#f4e9d2] !no-underline transition hover:border-[#eed8b370] hover:bg-[#eed8b317] hover:!text-[#fff7ea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c]"
                    onClick={onClose}
                    to={type === "prayers" ? `/prayer/${id}` : `/books/${id}`}
                  >
                    <BookOpen
                      className="shrink-0 text-[#d3a77c]"
                      size={18}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">{name}</span>
                    <ArrowRight
                      className="shrink-0 text-[#d3a77c] transition-transform group-hover:translate-x-1"
                      size={17}
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default function SearchOverlay({ scope, onClose }) {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState({
    query: "",
    scope: null,
    prayers: [],
    books: [],
    errors: {},
  });
  const inputRef = useRef(null);
  const normalizedQuery = query.trim();
  const canSearch = normalizedQuery.length >= 2;
  const resultsReady =
    searchResult.query === normalizedQuery && searchResult.scope === scope;
  const loading = canSearch && !resultsReady;

  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (!canSearch) return undefined;

    let active = true;
    const timer = window.setTimeout(() => {
      const prayerRequest =
        scope !== "books"
          ? searchPrayers(normalizedQuery)
              .then((response) => ({ items: getItems(response) }))
              .catch((error) => ({
                items: [],
                error: error.message || "Prayer search failed.",
              }))
          : Promise.resolve({ items: [] });
      const bookRequest =
        scope !== "prayers"
          ? getPublishedBooks({
              query: normalizedQuery,
              page: 0,
              size: 10,
            })
              .then((response) => ({ items: getItems(response) }))
              .catch((error) => ({
                items: [],
                error: error.message || "Book search failed.",
              }))
          : Promise.resolve({ items: [] });

      Promise.all([prayerRequest, bookRequest]).then(
        ([prayerResults, bookResults]) => {
          if (active) {
            setSearchResult({
              query: normalizedQuery,
              scope,
              prayers: prayerResults.items,
              books: bookResults.items,
              errors: {
                prayers: prayerResults.error,
                books: bookResults.error,
              },
            });
          }
        },
      );
    }, 250);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [canSearch, normalizedQuery, scope]);

  const handleSubmit = (event) => event.preventDefault();
  const showPrayers = scope !== "books";
  const showBooks = scope !== "prayers";
  const hasResults =
    searchResult.prayers.length > 0 || searchResult.books.length > 0;
  const hasErrors = Boolean(
    searchResult.errors.prayers || searchResult.errors.books,
  );
  const title =
    scope === "prayers"
      ? "Search prayers"
      : scope === "books"
        ? "Search books"
        : "Search prayers and books";

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#1a0d0f]/95 px-4 py-5 text-[#f4e9d2] backdrop-blur-md sm:px-8 sm:py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-search-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d3a77c]">
              Search the collection
            </p>
            <h1 className="text-2xl font-semibold sm:text-3xl" id="site-search-title">
              {title}
            </h1>
          </div>
          <button
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[#eed8b352] text-[#f4e9d2] transition hover:bg-[#eed8b317] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c]"
            type="button"
            aria-label="Close search"
            onClick={onClose}
          >
            <X size={21} aria-hidden="true" />
          </button>
        </div>

        <form
          className="mb-6 flex items-center gap-3 rounded-2xl border border-[#eed8b352] bg-[#fff7ea] px-4 py-3 text-[#34251d] shadow-[0_12px_35px_rgba(0,0,0,0.2)] sm:px-5"
          role="search"
          onSubmit={handleSubmit}
        >
          <Search className="shrink-0 text-[#9b4635]" size={21} aria-hidden="true" />
          <input
            ref={inputRef}
            className="min-w-0 flex-1 bg-transparent text-base text-[#34251d] outline-none placeholder:text-[#927e69] sm:text-lg"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              scope === "prayers"
                ? "Search prayers..."
                : scope === "books"
                  ? "Search books..."
                  : "Search prayers and books..."
            }
            aria-label={title}
          />
          {query && (
            <button
              className="shrink-0 rounded-full px-3 py-1 text-sm font-semibold text-[#813f32] transition hover:bg-[#82493414]"
              type="button"
              onClick={() => setQuery("")}
            >
              Clear
            </button>
          )}
        </form>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {!normalizedQuery ? (
            <p className="py-8 text-center text-[#f4e9d294]">
              Start typing to find a prayer or book.
            </p>
          ) : normalizedQuery.length < 2 ? (
            <p className="py-8 text-center text-[#f4e9d294]">
              Enter at least 2 characters to search.
            </p>
          ) : loading ? (
            <p className="py-8 text-center text-[#f4e9d2b8]" role="status">
              Searching...
            </p>
          ) : (
            <>
              {!hasResults && !hasErrors && (
                <p className="mb-6 text-center text-[#f4e9d2b8]">
                  No matches found.
                </p>
              )}
              {showPrayers && (
                <SearchResultSection
                  title="Prayers"
                  type="prayers"
                  items={searchResult.prayers}
                  error={searchResult.errors.prayers}
                  onClose={onClose}
                />
              )}
              {showBooks && (
                <SearchResultSection
                  title="Books"
                  type="books"
                  items={searchResult.books}
                  error={searchResult.errors.books}
                  onClose={onClose}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
