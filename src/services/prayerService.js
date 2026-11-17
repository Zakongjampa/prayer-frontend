import apiClient from "./apiClient";

export async function getPrayers(params = {}) {
  const response = await apiClient.get("/prayer", { params });
  return response.data;
}

export async function createPrayer(prayer) {
  const response = await apiClient.post("/prayer", prayer);
  return response.data;
}

export async function getPrayerById(prayerId) {
  const response = await apiClient.get(`/prayer/${prayerId}`);
  return response.data;
}

export async function updatePrayer(prayerId, prayer) {
  const response = await apiClient.put(`/prayer/${prayerId}`, prayer);
  return response.data;
}

export async function deletePrayer(prayerId) {
  const response = await apiClient.delete(`/prayer/${prayerId}`);
  return response.data;
}

export async function getPrayerList(params = {}) {
  const response = await apiClient.get("/prayerList", { params });
  return response.data;
}

export async function searchPrayers(query) {
  const response = await apiClient.get("/prayer/search", {
    params: { query },
  });
  return response.data;
}

export async function getPrayerNames() {
  const response = await apiClient.get("/prayer/names");
  return response.data;
}
