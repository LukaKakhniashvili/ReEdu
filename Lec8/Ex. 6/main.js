function saveToLocalStorage(field) {
  const value = document.getElementById(field).value;
  localStorage.setItem(field, value);
}

function loadFromLocalStorage() {
  const name = localStorage.getItem("name") || "";
  const email = localStorage.getItem("email") || "";
  const phone = localStorage.getItem("phone") || "";

  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
}

window.onload = loadFromLocalStorage;
