import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import ReadingFontSelector from "../components/ReadingFontSelector";
import useReadingFont from "../hooks/useReadingFont";
import {
  getPublishedBook,
  getPublishedPage,
  getPublishedPages,
} from "../services/booksService";
import {
  getFavoriteBookIds,
  putFavoriteBook,
  removeFavoriteBook,
} from "../services/favoritesService";
import "./Home.css";

const PAGE_SIZE = 1;

function getBookPageSummaries(response) {
  if (Array.isArray(response)) {
    return {
      items: response,
      totalPages: response.length,
      allItems: true,
    };
  }

  if (response && typeof response === "object") {
    const items = Array.isArray(response.content)
      ? response.content
      : Array.isArray(response.items)
        ? response.items
        : null;

    if (items) {
      const metadata = response.page ?? response;
      const totalPages = Number.isInteger(metadata.totalPages)
        ? metadata.totalPages
        : Number.isFinite(metadata.totalElements)
          ? Math.ceil(metadata.totalElements / PAGE_SIZE)
          : null;
      return { items, totalPages, allItems: false };
    }
  }

  throw new Error("The book pages service returned an unexpected response.");
}

export default function ReadBook({ userId }) {
  const { id } = useParams();
  const { font, selectFont } = useReadingFont();
  const [bookResult, setBookResult] = useState({
    id: null,
    book: null,
    error: null,
  });
  const [page, setPage] = useState(0);
  const [pageResult, setPageResult] = useState({
    id: null,
    index: null,
    bookPage: null,
    totalPages: null,
    error: null,
  });
  const [fontSize, setFontSize] = useState(20);
  const [favoriteIdsResult, setFavoriteIdsResult] = useState({
    userId: null,
    bookId: null,
    ids: [],
    error: null,
  });
  const [favoriteMutation, setFavoriteMutation] = useState({
    bookId: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    let active = true;

    getPublishedBook(id)
      .then((book) => {
        if (active) setBookResult({ id, book, error: null });
      })
      .catch((error) => {
        if (active) {
          setBookResult({
            id,
            book: null,
            error: `Failed to fetch the book: ${error.message}`,
          });
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    let active = true;

    if (userId == null) return;

    getFavoriteBookIds()
      .then((ids) => {
        if (!Array.isArray(ids)) {
          throw new Error("The favorites service returned an unexpected response.");
        }
        if (active) {
          setFavoriteIdsResult({ userId, bookId: id, ids, error: null });
        }
      })
      .catch((error) => {
        if (active) {
          setFavoriteIdsResult({
            userId,
            bookId: id,
            ids: [],
            error: error.message || "Failed to fetch your favorite books.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [id, userId]);

  useEffect(() => {
    let active = true;

    getPublishedPages(id, { page, size: PAGE_SIZE })
      .then((response) => {
        const result = getBookPageSummaries(response);
        const summary = result.allItems
          ? result.items[page]
          : result.items[0];

        if (!summary) {
          if (active) {
            setPageResult({
              id,
              index: page,
              bookPage: null,
              totalPages: result.totalPages,
              error: null,
            });
          }
          return null;
        }

        if (!Number.isInteger(summary.pageNumber)) {
          throw new Error("The book page summary did not include a page number.");
        }

        return getPublishedPage(id, summary.pageNumber).then((bookPage) => {
          if (active) {
            setPageResult({
              id,
              index: page,
              bookPage,
              totalPages: result.totalPages,
              error: null,
            });
          }
        });
      })
      .catch((error) => {
        if (active) {
          setPageResult({
            id,
            index: page,
            bookPage: null,
            totalPages: null,
            error: error.message || "Failed to fetch this book page.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [id, page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const bookLoading = bookResult.id !== id;
  const book = bookLoading ? null : bookResult.book;
  const bookError = bookLoading ? null : bookResult.error;
  const pageLoading = pageResult.id !== id || pageResult.index !== page;
  const bookPage = pageLoading ? null : pageResult.bookPage;
  const pageError = pageLoading ? null : pageResult.error;
  const totalPages = pageLoading ? null : pageResult.totalPages;
  const title = book?.title || book?.name || "Untitled book";
  const pageNumber = bookPage?.pageNumber ?? page + 1;
  const pageContent = bookPage?.content ?? bookPage?.text ?? "";
  const hasNextPage =
    totalPages == null ? Boolean(bookPage) : page + 1 < totalPages;
  const favoritesLoading =
    userId != null &&
    (favoriteIdsResult.userId !== userId || favoriteIdsResult.bookId !== id);
  const isFavorite =
    favoriteIdsResult.userId === userId &&
    favoriteIdsResult.bookId === id &&
    favoriteIdsResult.ids.some((favoriteId) => String(favoriteId) === id);
  const favoriteMutationLoading =
    favoriteMutation.bookId === id && favoriteMutation.loading;
  const favoriteError =
    (favoriteIdsResult.userId === userId &&
      favoriteIdsResult.bookId === id &&
      favoriteIdsResult.error) ||
    (favoriteMutation.bookId === id && favoriteMutation.error);

  const handleFavoriteToggle = async () => {
    setFavoriteMutation({ bookId: id, loading: true, error: null });
    try {
      if (isFavorite) {
        await removeFavoriteBook(id);
      } else {
        await putFavoriteBook(id);
      }

      setFavoriteIdsResult((current) => {
        const currentIds =
          current.userId === userId && current.bookId === id ? current.ids : [];
        const ids = isFavorite
          ? currentIds.filter((favoriteId) => String(favoriteId) !== id)
          : [...currentIds, id];
        return { userId, bookId: id, ids, error: null };
      });
      setFavoriteMutation({ bookId: id, loading: false, error: null });
    } catch (error) {
      setFavoriteMutation({
        bookId: id,
        loading: false,
        error: error.message || "Failed to update this book's favorite status.",
      });
    }
  };

  if (bookLoading || bookError || !book) {
    const error = bookError;
    return (
      <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-6 text-[#f4e9d2] sm:px-6 lg:px-8">
        <Link
          className="inline-flex items-center gap-2 !text-[#d3a77c] !no-underline hover:!text-[#f4e9d2]"
          to="/books"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to books
        </Link>
        <div
          className={`home-paper-texture mt-8 rounded-3xl border border-[#fff6e08c] bg-[#ead8b5] p-8 text-[#5f4738] sm:p-12 ${error ? "text-[#8b3029]" : ""}`}
          role={error ? "alert" : "status"}
        >
          {bookLoading ? "Opening your book..." : error || "Book not found."}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-1 pb-4 text-[#f4e9d2] sm:px-6 sm:pb-10 lg:px-8">
      <header className="sticky top-0 z-30 -mx-1 mb-4 border-b border-[#eed8b333] bg-[#2a1619]/95 px-1 py-2 backdrop-blur sm:-mx-6 sm:mb-8 sm:px-6 sm:py-4 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between gap-3">
            <Link
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold !text-[#d3a77c] !no-underline transition hover:bg-[#eed8b317] hover:!text-[#f4e9d2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c]"
              to="/books"
            >
              <ArrowLeft size={17} aria-hidden="true" />
              Library
            </Link>
            <div className="flex flex-wrap items-center justify-end gap-1">
              <ReadingFontSelector
                value={font.id}
                onChange={selectFont}
              />
              <span
                aria-live="polite"
                className="mr-2 whitespace-nowrap text-sm text-[#f4e9d2b8]"
              >
                Page {pageNumber}
                {totalPages != null ? ` of ${totalPages}` : ""}
              </span>
              <button
                className="inline-flex size-9 items-center justify-center rounded-full border border-[#eed8b352] text-[#f4e9d2] transition hover:bg-[#eed8b317] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c] disabled:cursor-not-allowed disabled:opacity-40"
                type="button"
                aria-label="Decrease text size"
                onClick={() => setFontSize((size) => Math.max(16, size - 2))}
                disabled={fontSize <= 16}
              >
                <Minus size={16} aria-hidden="true" />
              </button>
              <button
                className="inline-flex size-9 items-center justify-center rounded-full border border-[#eed8b352] text-[#f4e9d2] transition hover:bg-[#eed8b317] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c] disabled:cursor-not-allowed disabled:opacity-40"
                type="button"
                aria-label="Increase text size"
                onClick={() => setFontSize((size) => Math.min(28, size + 2))}
                disabled={fontSize >= 28}
              >
                <Plus size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="relative">
              <h1
                className="truncate px-12 text-lg font-semibold tracking-tight sm:text-xl"
                id="book-reader-title"
              >
                {title}
              </h1>
              {userId != null && (
                <button
                  className="absolute right-0 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#eed8b352] text-[#f4e9d2] transition hover:bg-[#eed8b317] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c] disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={handleFavoriteToggle}
                  aria-label={
                    favoritesLoading
                      ? "Checking favorite status"
                      : favoriteMutationLoading
                        ? "Saving favorite status"
                        : isFavorite
                          ? `Remove ${title} from favorites`
                          : `Add ${title} to favorites`
                  }
                  aria-pressed={isFavorite}
                  disabled={favoritesLoading || favoriteMutationLoading}
                >
                  <Heart
                    size={18}
                    fill={isFavorite ? "currentColor" : "none"}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              {book.author && (
                <p className="text-sm text-[#f4e9d2a6]">{book.author}</p>
              )}
            </div>
            {favoriteError && (
              <p className="mt-2 text-sm text-[#ffb8a8]" role="alert">
                {favoriteError}
              </p>
            )}
          </div>
          {totalPages > 0 && (
            <div
              className="mt-4 h-1 overflow-hidden rounded-full bg-[#eed8b31f]"
              role="progressbar"
              aria-label="Reading progress"
              aria-valuemin={1}
              aria-valuemax={totalPages}
              aria-valuenow={Math.min(page + 1, totalPages)}
            >
              <div
                className="h-full rounded-full bg-[#d3a77c] transition-[width] duration-300 motion-reduce:transition-none"
                style={{
                  width: `${Math.min(100, ((page + 1) / totalPages) * 100)}%`,
                }}
              />
            </div>
          )}
        </div>
      </header>

      <section
        className="mx-auto max-w-4xl"
        aria-labelledby="book-reader-title"
      >
        {book.description && (
          <details className="mb-5 rounded-xl border border-[#eed8b333] px-4 py-3 text-sm text-[#f4e9d2b8]">
            <summary className="cursor-pointer font-semibold text-[#d3a77c]">
              About this book
            </summary>
            <p className="mt-3 leading-6">{book.description}</p>
          </details>
        )}

        {pageLoading ? (
          <p
            className="rounded-2xl border border-[#eed8b333] bg-[#eed8b30e] p-6 text-center text-[#f4e9d2b8]"
            role="status"
          >
            Loading page {page + 1}...
          </p>
        ) : pageError ? (
          <p
            className="rounded-2xl border border-[#ffb8a833] bg-[#a8323210] p-6 text-[#ffb8a8]"
            role="alert"
          >
            {pageError}
          </p>
        ) : !bookPage ? (
          <p className="rounded-2xl border border-[#eed8b333] bg-[#eed8b30e] p-6 text-center text-[#f4e9d2a6]">
            No pages are available for this book yet.
          </p>
        ) : (
          <article className="home-manuscript-texture overflow-hidden rounded-2xl border border-[#fff6e08c] bg-[#f4e8cf] text-[#4d372b] shadow-[0_22px_55px_rgba(8,3,4,0.22)] sm:rounded-[1.75rem]">
            <div className="flex items-center justify-between border-b border-[#6f4c2f24] px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8c765f] sm:px-8 sm:py-4 sm:tracking-[0.18em]">
              <span className="inline-flex items-center gap-2">
                <BookOpen size={16} aria-hidden="true" />
                Reading page
              </span>
              <span>Page {pageNumber}</span>
            </div>
            <div className="px-3 py-5 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
              {pageContent ? (
                <div
                  className="mx-auto max-w-3xl leading-[1.8] text-[#4d372b] sm:leading-[1.95] [&_a]:text-[#8d3c2d] [&_a]:underline [&_blockquote]:my-6 sm:[&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-[#9b4635] [&_blockquote]:pl-4 sm:[&_blockquote]:pl-5 [&_blockquote]:italic [&_h1]:mb-5 [&_h1]:mt-8 sm:[&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mb-4 [&_h2]:mt-7 sm:[&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_li]:mb-2 [&_ol]:my-5 sm:[&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 sm:[&_p]:mb-7 [&_p]:border-b [&_p]:border-[#5b43311f] [&_p]:pb-4 sm:[&_p]:pb-5 [&_ul]:my-5 sm:[&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6"
                  style={{
                    fontFamily: font.family,
                    fontSize: `${fontSize}px`,
                  }}
                >
                  <ReactMarkdown>{pageContent}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-center text-[#766253]">
                  This page does not have any text yet.
                </p>
              )}
            </div>
          </article>
        )}

        {bookPage && (
          <nav
            aria-label="Book page navigation"
            className="mt-3 flex items-center justify-between gap-2 sm:mt-6 sm:gap-3"
          >
            <button
              className="inline-flex size-10 items-center justify-center gap-2 rounded-full border border-[#eed8b352] text-sm font-semibold text-[#f4e9d2] transition hover:bg-[#eed8b317] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c] disabled:cursor-not-allowed disabled:opacity-40 sm:size-auto sm:px-5 sm:py-2.5"
              type="button"
              aria-label="Previous page"
              onClick={() => setPage((currentPage) => currentPage - 1)}
              disabled={page === 0 || pageLoading}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">Previous</span>
            </button>
            <span
              aria-live="polite"
              className="whitespace-nowrap text-xs text-[#f4e9d2b8] sm:text-sm"
            >
              Page {pageNumber}
              {totalPages != null ? ` of ${totalPages}` : ""}
            </span>
            <button
              className="inline-flex size-10 items-center justify-center gap-2 rounded-full bg-[#783b30] text-sm font-semibold text-[#fff7ea] shadow-[0_7px_18px_rgba(74,31,25,0.18)] transition hover:bg-[#5f2d26] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd795e] disabled:cursor-not-allowed disabled:opacity-40 sm:size-auto sm:px-5 sm:py-2.5"
              type="button"
              aria-label="Next page"
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={!hasNextPage || pageLoading}
            >
              <span className="sr-only sm:not-sr-only">Next</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </nav>
        )}
      </section>
    </main>
  );
}
