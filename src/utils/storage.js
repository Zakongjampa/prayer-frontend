function setLocalStorage(auth) {
  const user = auth.user;

  localStorage.setItem("accessToken", auth.accessToken);
  localStorage.setItem("refreshToken", auth.refreshToken);
  localStorage.setItem("username", user.username ?? "");
  localStorage.setItem("id", user.id ?? "");
  localStorage.setItem("firstname", user.firstName ?? "");
  localStorage.setItem("lastname", user.lastName ?? "");
  localStorage.setItem("isAdmin", String(Boolean(user.admin)));
}

function unsetLocalStorage() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  localStorage.removeItem("firstname");
  localStorage.removeItem("lastname");
  localStorage.removeItem("isAdmin");
}

function updateLocalAuthTokens(auth) {
  localStorage.setItem("accessToken", auth.accessToken);

  if (typeof auth.refreshToken === "string" && auth.refreshToken.length > 0) {
    localStorage.setItem("refreshToken", auth.refreshToken);
  }
}

export { setLocalStorage, unsetLocalStorage, updateLocalAuthTokens };