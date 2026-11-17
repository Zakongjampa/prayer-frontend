import apiClient from "./apiClient";

export async function getFavoriteBooks() {
  const response = await apiClient.get("/users/me/favorites");
  return response.data;
}

export async function getFavoriteBookIds() {
  const response = await apiClient.get("/users/me/favorites/ids");
  return response.data;
}

export async function putFavoriteBook(bookId) {
  const response = await apiClient.put(`/users/me/favorites/${bookId}`);
  return response.data;
}

export async function removeFavoriteBook(bookId) {
  const response = await apiClient.delete(`/users/me/favorites/${bookId}`);
  return response.data;
}
