import apiClient from "./apiClient";

export async function loginUser(credentials) {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
}

export async function registerUser(user) {
  const registration = {
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
  };
  const response = await apiClient.post("/auth/signup", registration);
  return response.data;
}

export { refreshAuthTokens } from "./apiClient";

export async function logoutUser(refreshToken) {
  const response = await apiClient.post("/auth/logout", { refreshToken });
  return response.data;
}
