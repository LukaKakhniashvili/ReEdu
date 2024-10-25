function checkAnswer() {
  const question = document.getElementById("question").value;
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const userAnswer = parseFloat(document.getElementById("userAnswer").value);
  const result = document.getElementById("result");

  if (isNaN(a) || isNaN(b) || isNaN(userAnswer)) {
    result.innerText = "Please enter valid numbers for a, b, and your answer";
    result.style.color = "orange";
    return;
  }

  let correctAnswer;
  if (question === "What is a plus b?") {
    correctAnswer = a + b;
  } else if (question === "What is a minus b?") {
    correctAnswer = a - b;
  }

  if (userAnswer === correctAnswer) {
    result.innerText = "Correct! You're human!";
    result.style.color = "green";
  } else {
    result.innerText = "Wrong! You're a robot!";
    result.style.color = "red";
  }
}
