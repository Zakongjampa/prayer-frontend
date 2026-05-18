function setLocalStorage(response) {
  localStorage.setItem("username", response.data.username);
  localStorage.setItem("id", response.data.id);
  localStorage.setItem("firstname", response.data.firstName);
  localStorage.setItem("lastname", response.data.lastName);
}

function unsetLocalStorage() {
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  localStorage.removeItem("firstname");
  localStorage.removeItem("lastname");
}

export {setLocalStorage, unsetLocalStorage}