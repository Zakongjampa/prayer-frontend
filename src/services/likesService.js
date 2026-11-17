import apiClient from "./apiClient";

export async function getLikedByCurrentUser() {
  const response = await apiClient.get("/users/me/likes");
  return response.data;
}

export async function getLikedPrayersByCurrentUser() {
  const response = await apiClient.get("/users/me/likes/prayers");
  return response.data;
}

export async function putLikePrayer(prayerId) {
  const response = await apiClient.put(`/users/me/likes/${prayerId}`);
  return response.data;
}

export async function likePrayer(prayerId) {
  const response = await apiClient.post(`/users/me/likes/${prayerId}`);
  return response.data;
}

export async function unlikePrayer(prayerId) {
  const response = await apiClient.delete(`/users/me/likes/${prayerId}`);
  return response.data;
}

export async function getTopLikedPrayers() {
  const response = await apiClient.get("/liked/top-liked");
  return response.data;
}
