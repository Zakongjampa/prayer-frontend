import apiClient from "./apiClient";

const BOOKMARK_PAGE_SIZE = 100;

export async function getBookmarks(params = {}) {
  const response = await apiClient.get("/users/me/bookmarks", { params });
  return response.data;
}

function getBookmarkPage(response) {
  if (Array.isArray(response)) {
    return { items: response, totalPages: 1 };
  }

  if (response && typeof response === "object" && Array.isArray(response.content)) {
    const metadata = response.page ?? response;
    return {
      items: response.content,
      totalPages: Number.isInteger(metadata.totalPages)
        ? metadata.totalPages
        : 1,
    };
  }

  throw new Error("The bookmarks service returned an unexpected response.");
}

export async function getBookmarkedBooks() {
  const firstPage = getBookmarkPage(
    await getBookmarks({ page: 0, size: BOOKMARK_PAGE_SIZE }),
  );
  const remainingPages = await Promise.all(
    Array.from({ length: Math.max(0, firstPage.totalPages - 1) }, (_, index) =>
      getBookmarks({ page: index + 1, size: BOOKMARK_PAGE_SIZE }).then(
        getBookmarkPage,
      ),
    ),
  );
  const bookmarks = [
    ...firstPage.items,
    ...remainingPages.flatMap((page) => page.items),
  ];
  const books = new Map();

  for (const bookmark of bookmarks) {
    if (bookmark?.bookId == null) {
      throw new Error("A bookmark did not include a book ID.");
    }

    const key = String(bookmark.bookId);
    const book = books.get(key) ?? {
      id: bookmark.bookId,
      title: bookmark.bookTitle || "Untitled book",
      pageNumbers: new Set(),
    };
    if (Number.isInteger(bookmark.pageNumber)) {
      book.pageNumbers.add(bookmark.pageNumber);
    }
    books.set(key, book);
  }

  return Array.from(books.values(), ({ pageNumbers, ...book }) => ({
    ...book,
    pageCount: pageNumbers.size,
  }));
}

export async function createBookmark(bookId, pageNumber) {
  const response = await apiClient.post(
    `/users/me/bookmarks/${bookId}/pages/${pageNumber}`,
  );
  return response.data;
}

export async function deleteBookmark(bookId, pageNumber) {
  const response = await apiClient.delete(
    `/users/me/bookmarks/${bookId}/pages/${pageNumber}`,
  );
  return response.data;
}
