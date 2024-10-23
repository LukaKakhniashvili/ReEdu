// Initialize random texts for both languages
const randomTexts = {
  en: ["Hello", "Good bye", "How are you?", "How old are you?"],
  ka: ["გამარჯობა", "ნახვამდის", "როგორ ხარ?", "რამდენი წლის ხარ?"],
};

function displayRandomTextInEnglish() {
  const randomIndex = Math.floor(Math.random() * randomTexts.en.length);
  const randomText = randomTexts.en[randomIndex];

  localStorage.setItem("currentText", randomText);
  document.getElementById("randomText").textContent = randomText;
}

function switchToGeorgian() {
  const currentText = localStorage.getItem("currentText");
  const index = randomTexts.en.indexOf(currentText);

  if (index !== -1) {
    document.getElementById("randomText").textContent = randomTexts.ka[index];
  }
}

function initializePage() {
  displayRandomTextInEnglish();
}

window.onload = initializePage;
