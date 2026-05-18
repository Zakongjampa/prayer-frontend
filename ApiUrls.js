const BASE_URL = meta.env.VITE_API_URL | "http://localhost:8080";

// ---- Users -------
export const API_URL_USERS =  `${BASE_URL}/user`;
export const API_URL_PRAYERS =  `${BASE_URL}/prayer`;
export const API_URL_LIKES =  `${BASE_URL}/liked`;
export const API_URL_LOGIN = `${BASE_URL}/login`;