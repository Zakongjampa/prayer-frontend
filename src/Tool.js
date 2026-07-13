function setLocalStorage(response) {
  const user = response?.data ?? {};

  localStorage.setItem("username", user.username ?? "");
  localStorage.setItem("id", user.id ?? "");
  localStorage.setItem("firstname", user.firstName ?? "");
  localStorage.setItem("lastname", user.lastName ?? "");
  localStorage.setItem("isAdmin", String(Boolean(user.admin)));
}

function unsetLocalStorage() {
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  localStorage.removeItem("firstname");
  localStorage.removeItem("lastname");
  localStorage.removeItem("isAdmin");
}

export {setLocalStorage, unsetLocalStorage}