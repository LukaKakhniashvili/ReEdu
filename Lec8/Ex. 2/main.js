function checkDate() {
  const inputDate = document.getElementById("inputDate").value;
  const result = document.getElementById("dateResult");

  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

  if (regex.test(inputDate)) {
    result.textContent = "The date is valid.";
    result.style.color = "green";
  } else {
    result.textContent = "The date is not valid.";
    result.style.color = "red";
  }
}
