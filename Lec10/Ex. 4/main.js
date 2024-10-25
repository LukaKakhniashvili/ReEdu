function isWideNumber(number) {
  const digits = number.toString().split("").map(Number);
  const numberOfDigits = digits.length;
  const sumOfDigits = digits.reduce((sum, digit) => sum + digit, 0);
  return numberOfDigits > sumOfDigits;
}

function checkWideNumber() {
  const numberInput = parseInt(document.getElementById("numberInput").value);
  const result = document.getElementById("result");

  if (isNaN(numberInput)) {
    result.innerText = "Please enter a valid number.";
    result.style.color = "black";
    return;
  }

  const wide = isWideNumber(numberInput);
  if (wide) {
    result.innerText = `${numberInput} is a wide number.`;
    result.style.color = "green";
  } else {
    result.innerText = `${numberInput} is not a wide number.`;
    result.style.color = "red";
  }
}
