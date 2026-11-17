import axios from "axios";
import { unsetLocalStorage, updateLocalAuthTokens } from "../utils/storage";

const apiRoot = (import.meta.env.VITE_API_URL ?? "http://localhost:8080").replace(
  /\/+$/,
  "",
);
const baseURL = apiRoot.endsWith("/api/v1")
  ? apiRoot
  : `${apiRoot}/api/v1`;

const apiClient = axios.create({ baseURL });
let refreshPromise;

export async function refreshAuthTokens(refreshToken) {
  const response = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
  return response.data;
}

function expireSession() {
  unsetLocalStorage();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:session-expired"));
  }
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    expireSession();
    throw new Error("Your session has expired. Please sign in again.");
  }

  let auth;
  try {
    auth = await refreshAuthTokens(refreshToken);
  } catch (error) {
    if ([400, 401, 403].includes(error.response?.status)) {
      expireSession();
    }
    throw error;
  }

  if (localStorage.getItem("refreshToken") !== refreshToken) {
    throw new Error("The authentication session changed during token refresh.");
  }

  if (typeof auth?.accessToken !== "string" || auth.accessToken.length === 0) {
    expireSession();
    throw new Error("The token refresh response did not include an access token.");
  }

  updateLocalAuthTokens(auth);
  return auth.accessToken;
}

function getRefreshedAccessToken() {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  const isAuthRequest = config.url?.startsWith("/auth/");

  if (accessToken && !isAuthRequest && !config.skipAuth) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    const isAuthRequest = config?.url?.startsWith("/auth/");

    if (
      error.response?.status !== 401 ||
      !config ||
      config._authRetry ||
      isAuthRequest
    ) {
      return Promise.reject(error);
    }

    config._authRetry = true;

    try {
      const accessToken = await getRefreshedAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient.request(config);
    } catch (refreshError) {
      const method = config.method?.toLowerCase();
      if (method === "get" || method === "head") {
        config.skipAuth = true;
        if (typeof config.headers?.delete === "function") {
          config.headers.delete("Authorization");
        } else if (config.headers) {
          for (const header of Object.keys(config.headers)) {
            if (header.toLowerCase() === "authorization") {
              delete config.headers[header];
            }
          }
        }
        return apiClient.request(config);
      }

      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
