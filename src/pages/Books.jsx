import { useEffect, useState } from "react";
import { ArrowDown, BookOpen } from "lucide-react";
import CollectionHero from "../components/CollectionHero";
import CollectionItemLink from "../components/CollectionItemLink";
import CollectionPagination from "../components/CollectionPagination";
import CollectionResults from "../components/CollectionResults";
import CollectionSectionHeading from "../components/CollectionSectionHeading";
import { getBookmarkedBooks } from "../services/bookmarksService";
import { getFavoriteBooks } from "../services/favoritesService";
import { getPublishedBooks } from "../services/booksService";
import "./Home.css";

const PAGE_SIZE = 20;

function getBookPage(response) {
  if (Array.isArray(response)) {
    return { items: response, totalPages: null };
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
      return { items, totalPages };
    }
  }

  throw new Error("The books service returned an unexpected response.");
}

function getBookId(book) {
  return book.id ?? book.bookId ?? book.number;
}

export default function Books({ userId }) {
  const [page, setPage] = useState(0);
  const [booksPageResult, setBooksPageResult] = useState({
    page: null,
    items: [],
    totalPages: null,
    error: null,
  });
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [featuredError, setFeaturedError] = useState(null);
  const [bookmarkedBooksResult, setBookmarkedBooksResult] = useState({
    userId: null,
    items: [],
    error: null,
  });
  const [favoriteBooksResult, setFavoriteBooksResult] = useState({
    userId: null,
    items: [],
    error: null,
  });
  useEffect(() => {
    let active = true;

    getPublishedBooks({ page, size: PAGE_SIZE })
      .then((response) => {
        const result = getBookPage(response);
        if (active) setBooksPageResult({ page, ...result, error: null });
      })
      .catch((error) => {
        if (active) {
          setBooksPageResult({
            page,
            items: [],
            totalPages: null,
            error: error.message || "Failed to fetch books.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [page]);

  useEffect(() => {
    let active = true;

    getPublishedBooks({ page: 0, size: 10 })
      .then((response) => {
        const result = getBookPage(response);
        if (active) setFeaturedBooks(result.items.slice(0, 10));
      })
      .catch((error) => {
        if (active) {
          setFeaturedError(error.message || "Failed to fetch featured books.");
        }
      })
      .finally(() => {
        if (active) setFeaturedLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    if (userId == null) return;

    getBookmarkedBooks()
      .then((books) => {
        if (active) {
          setBookmarkedBooksResult({ userId, items: books, error: null });
        }
      })
      .catch((error) => {
        if (active) {
          setBookmarkedBooksResult({
            userId,
            items: [],
            error: error.message || "Failed to fetch your bookmarked books.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [userId]);

  useEffect(() => {
    let active = true;

    if (userId == null) return;

    getFavoriteBooks()
      .then((response) => {
        const result = getBookPage(response);
        if (active) {
          setFavoriteBooksResult({
            userId,
            items: result.items,
            error: null,
          });
        }
      })
      .catch((error) => {
        if (active) {
          setFavoriteBooksResult({
            userId,
            items: [],
            error: error.message || "Failed to fetch your favorite books.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const bookmarkedBooksLoading =
    userId != null && bookmarkedBooksResult.userId !== userId;
  const bookmarkedBooks =
    bookmarkedBooksResult.userId === userId
      ? bookmarkedBooksResult.items
      : [];
  const bookmarkedBooksError =
    bookmarkedBooksResult.userId === userId
      ? bookmarkedBooksResult.error
      : null;
  const favoriteBooksLoading =
    userId != null && favoriteBooksResult.userId !== userId;
  const favoriteBooks =
    favoriteBooksResult.userId === userId ? favoriteBooksResult.items : [];
  const favoriteBooksError =
    favoriteBooksResult.userId === userId
      ? favoriteBooksResult.error
      : null;
  const booksLoading = booksPageResult.page !== page;
  const books = booksLoading ? [] : booksPageResult.items;
  const totalPages = booksLoading ? null : booksPageResult.totalPages;
  const booksError = booksLoading ? null : booksPageResult.error;
  const hasNextPage =
    totalPages == null ? books.length === PAGE_SIZE : page + 1 < totalPages;

  return (
    <main className="mx-auto w-full max-w-6xl px-2 pb-8 pt-3 text-[#f4e9d2] sm:px-6 sm:pb-12 sm:pt-5 lg:px-8">
      <CollectionHero
        returnTo="/"
        eyebrow="A library for deeper reading"
        tibetanLabel="ཞལ་འདོན་དཔེ་ཆ།"
        title="Find a book to"
        titleEmphasis="read and return to."
        description="Explore books that bring related prayers together, and take your time with the pages that matter to you."
        artworkLabel="A book open on warm parchment"
        artworkKicker="From the library"
        artworkTibetan="དཔེ་ཆ།"
        artworkFooter="Pages worth returning to"
        actions={[
          {
            label: "Browse books",
            href: "#all-books",
            icon: ArrowDown,
            variant: "primary",
          },
          {
            label: "Featured books",
            href: "#featured-books",
            icon: BookOpen,
            variant: "tertiary",
          },
        ]}
      />

      <section
        className="py-8 sm:py-20"
        id="all-books"
        aria-labelledby="all-books-title"
      >
        <CollectionSectionHeading
          eyebrow="The collection"
          title="Browse all books."
          description="Choose a title to open its reading space. Books are shown 20 at a time."
          id="all-books-title"
          sideContent={
            <span className="rounded-full border border-[#eed8b333] bg-[#eed8b30e] px-4 py-2 text-sm text-[#f4e9d2b8]">
              {PAGE_SIZE} books per page
            </span>
          }
        />

        <CollectionResults
          loading={booksLoading}
          loadingMessage="Loading books..."
          error={booksError}
          emptyMessage={
            books.length === 0 ? "No published books found." : null
          }
        >
          <>
            <div className="grid gap-3 md:grid-cols-2">
              {books.map((book, index) => (
                <CollectionItemLink
                  key={getBookId(book) ?? `${book.title ?? book.name}-${index}`}
                  to={`/books/${getBookId(book)}`}
                  title={book.title || book.name || "Untitled book"}
                  subtitle={book.author}
                />
              ))}
            </div>
            <CollectionPagination
              label="Books"
              page={page}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              isLoading={booksLoading}
              onPageChange={setPage}
            />
          </>
        </CollectionResults>
      </section>

      {userId != null && (
        <section
          className="home-collections border-t border-[#eed8b333] py-8 sm:py-16"
          id="your-liked-books"
          aria-labelledby="your-liked-books-title"
        >
          <CollectionSectionHeading
            eyebrow="Saved by you"
            title="Your favorite books."
            description="Books you have chosen to keep close."
            id="your-liked-books-title"
            className="max-w-2xl"
          />
          <CollectionResults
            loading={favoriteBooksLoading}
            loadingMessage="Loading your favorite books..."
            error={favoriteBooksError}
            emptyMessage={
              favoriteBooks.length === 0
                ? "You have not favorited any books yet."
                : null
            }
          >
            <div className="grid gap-3 md:grid-cols-2">
              {favoriteBooks.map((book, index) => (
                <CollectionItemLink
                  key={getBookId(book) ?? `${book.title ?? book.name}-${index}`}
                  to={`/books/${getBookId(book)}`}
                  title={book.title || book.name || "Untitled book"}
                  subtitle={book.author}
                />
              ))}
            </div>
          </CollectionResults>
        </section>
      )}

      {userId != null && (
        <section
          className="home-collections border-t border-[#eed8b333] py-8 sm:py-16"
          id="your-bookmarks"
          aria-labelledby="your-bookmarks-title"
        >
          <CollectionSectionHeading
            eyebrow="Saved by you"
            title="Books you bookmarked."
            description="Books with pages you marked to return to."
            id="your-bookmarks-title"
            className="max-w-2xl"
          />
          <CollectionResults
            loading={bookmarkedBooksLoading}
            loadingMessage="Loading your bookmarks..."
            error={bookmarkedBooksError}
            emptyMessage={
              bookmarkedBooks.length === 0
                ? "You have not bookmarked any book pages yet."
                : null
            }
          >
            <div className="grid gap-3 md:grid-cols-2">
              {bookmarkedBooks.map((book) => (
                <CollectionItemLink
                  key={book.id}
                  to={`/books/${book.id}`}
                  title={book.title}
                  subtitle={`${book.pageCount} bookmarked ${
                    book.pageCount === 1 ? "page" : "pages"
                  }`}
                />
              ))}
            </div>
          </CollectionResults>
        </section>
      )}

      <section
        className="home-collections border-t border-[#eed8b333] py-8 sm:py-16"
        id="featured-books"
        aria-labelledby="featured-books-title"
      >
        <CollectionSectionHeading
          eyebrow="A place to begin"
          title="Top 10 books."
          description="Start with the first ten published titles in the collection."
          id="featured-books-title"
          className="max-w-2xl"
        />

        <CollectionResults
          loading={featuredLoading}
          loadingMessage="Loading featured books..."
          error={featuredError}
          emptyMessage={
            featuredBooks.length === 0 ? "No featured books to show yet." : null
          }
        >
          <div className="grid gap-3 md:grid-cols-2">
            {featuredBooks.map((book, index) => (
              <CollectionItemLink
                key={getBookId(book) ?? index}
                to={`/books/${getBookId(book)}`}
                title={book.title || book.name || "Untitled book"}
                subtitle={book.author}
                rank={index + 1}
              />
            ))}
          </div>
        </CollectionResults>
      </section>
    </main>
  );
}