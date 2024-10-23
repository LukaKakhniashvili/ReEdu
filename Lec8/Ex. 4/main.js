function checkEmail() {
  const inputEmail = document.getElementById("inputEmail").value;
  const result = document.getElementById("emailResult");

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (regex.test(inputEmail)) {
    result.textContent = "The email is valid.";
    result.style.color = "green";
  } else {
    result.textContent = "The email is not valid.";
    result.style.color = "red";
  }
}
