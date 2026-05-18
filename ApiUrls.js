const BASE_URL = getBaseUrl();

// ---- Users -------
export const API_URL_USERS =  `${BASE_URL}/user`;
export const API_URL_PRAYERS =  `${BASE_URL}/prayer`;
export const API_URL_LIKES =  `${BASE_URL}/liked`;
export const API_URL_LOGIN = `${BASE_URL}/login`;

function getBaseUrl() {
    // Fallback for when the env var isn’t defined (e.g. local dev)
    return import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
  }