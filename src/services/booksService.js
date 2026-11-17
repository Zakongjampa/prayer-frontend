import apiClient from "./apiClient";

export async function getPublishedBooks(params = {}) {
  const response = await apiClient.get("/books", { params });
  return response.data;
}

export async function getPublishedBook(bookId) {
  const response = await apiClient.get(`/books/${bookId}`);
  return response.data;
}

export async function getPublishedPages(bookId, params = {}) {
  const response = await apiClient.get(`/books/${bookId}/pages`, { params });
  return response.data;
}

export async function getPublishedPage(bookId, pageNumber) {
  const response = await apiClient.get(
    `/books/${bookId}/pages/${pageNumber}`,
  );
  return response.data;
}

export async function getAllBooks(params = {}) {
  const response = await apiClient.get("/admin/books", { params });
  return response.data;
}

export async function createBook(book) {
  const response = await apiClient.post("/admin/books", book);
  return response.data;
}

export async function getBookForAdmin(bookId) {
  const response = await apiClient.get(`/admin/books/${bookId}`);
  return response.data;
}

export async function updateBook(bookId, book) {
  const response = await apiClient.put(`/admin/books/${bookId}`, book);
  return response.data;
}

export async function deleteBook(bookId) {
  const response = await apiClient.delete(`/admin/books/${bookId}`);
  return response.data;
}

export async function getPagesForAdmin(bookId, params = {}) {
  const response = await apiClient.get(`/admin/books/${bookId}/pages`, {
    params,
  });
  return response.data;
}

export async function createPage(bookId, page) {
  const response = await apiClient.post(
    `/admin/books/${bookId}/pages`,
    page,
  );
  return response.data;
}

export async function getPageForAdmin(bookId, pageNumber) {
  const response = await apiClient.get(
    `/admin/books/${bookId}/pages/${pageNumber}`,
  );
  return response.data;
}

export async function updatePage(bookId, pageNumber, page) {
  const response = await apiClient.put(
    `/admin/books/${bookId}/pages/${pageNumber}`,
    page,
  );
  return response.data;
}

export async function deletePage(bookId, pageNumber) {
  const response = await apiClient.delete(
    `/admin/books/${bookId}/pages/${pageNumber}`,
  );
  return response.data;
}
