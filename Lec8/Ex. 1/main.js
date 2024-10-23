function checkUppercase() {
  const inputText = document.getElementById("inputText").value;
  const result = document.getElementById("result");

  const regex = /^[A-Z]/;

  if (regex.test(inputText)) {
    result.textContent = "The string starts with an uppercase letter.";
    result.style.color = "green";
  } else {
    result.textContent = "The string does not start with an uppercase letter.";
    result.style.color = "red";
  }
}
