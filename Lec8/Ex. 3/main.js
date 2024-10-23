function checkPhoneNumber() {
  const inputPhone = document.getElementById("inputPhone").value;
  const result = document.getElementById("phoneResult");

  const regex = /^5\d{2}-\d{2}-\d{2}-\d{2}$/;

  if (regex.test(inputPhone)) {
    result.textContent = "The phone number is valid.";
    result.style.color = "green";
  } else {
    result.textContent = "The phone number is not valid.";
    result.style.color = "red";
  }
}
