import apiClient from "./apiClient";

export async function getCurrentUser() {
  const response = await apiClient.get("/users/me");
  return response.data;
}

export async function updateCurrentUser(profile) {
  const response = await apiClient.put("/users/me", profile);
  return response.data;
}

export async function deleteCurrentUser() {
  const response = await apiClient.delete("/users/me");
  return response.data;
}

export async function getUsers(params = {}) {
  const response = await apiClient.get("/users", { params });
  return response.data;
}

export async function getUserById(userId) {
  const response = await apiClient.get(`/admin/users/${userId}`);
  return response.data;
}

export async function updateUser(userId, profile) {
  const response = await apiClient.put(`/admin/users/${userId}`, profile);
  return response.data;
}

export async function deleteUser(userId) {
  const response = await apiClient.delete(`/admin/users/${userId}`);
  return response.data;
}

export async function updateCurrentPassword(passwords) {
  const response = await apiClient.patch("/users/me/password", passwords);
  return response.data;
}
