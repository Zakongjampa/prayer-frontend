import apiClient from "./apiClient";

export async function createTsok(tsok) {
  const response = await apiClient.post("/tsoks", tsok);
  return response.data;
}

export async function getSharedTsok(shareToken) {
  const response = await apiClient.get(
    `/tsoks/${encodeURIComponent(shareToken)}`,
  );
  return response.data;
}

export async function updateTsok(shareToken, tsok, manageToken) {
  const response = await apiClient.put(
    `/tsoks/${encodeURIComponent(shareToken)}`,
    tsok,
    { headers: { "X-Tsok-Manage-Token": manageToken } },
  );
  return response.data;
}

export async function deleteTsok(shareToken, manageToken) {
  const response = await apiClient.delete(
    `/tsoks/${encodeURIComponent(shareToken)}`,
    { headers: { "X-Tsok-Manage-Token": manageToken } },
  );
  return response.data;
}

export async function createTsokParticipant(shareToken) {
  const response = await apiClient.post(
    `/tsoks/${encodeURIComponent(shareToken)}/participants`,
  );
  return response.data;
}

export async function getTsokProgress(shareToken, participantToken) {
  const response = await apiClient.get(
    `/tsoks/${encodeURIComponent(shareToken)}/progress`,
    { headers: { "X-Tsok-Participant-Token": participantToken } },
  );
  return response.data;
}

export async function updateTsokProgress(
  shareToken,
  progress,
  participantToken,
) {
  const response = await apiClient.put(
    `/tsoks/${encodeURIComponent(shareToken)}/progress`,
    progress,
    { headers: { "X-Tsok-Participant-Token": participantToken } },
  );
  return response.data;
}

export async function likeTsokPrayer(shareToken, prayerId, participantToken) {
  const response = await apiClient.post(
    `/tsoks/${encodeURIComponent(shareToken)}/likes/${prayerId}`,
    undefined,
    { headers: { "X-Tsok-Participant-Token": participantToken } },
  );
  return response.data;
}
