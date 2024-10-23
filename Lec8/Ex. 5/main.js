function initializeHoroscopes() {
  const horoscopes = [
    "Horoscope 1",
    "Horoscope 2",
    "Horoscope 3",
    "Horoscope 4",
    "Horoscope 5",
    "Horoscope 6",
    "Horoscope 7",
    "Horoscope 8",
    "Horoscope 9",
    "Horoscope 10"
  ];

  if (!localStorage.getItem("horoscopes")) {
    localStorage.setItem("horoscopes", JSON.stringify(horoscopes));
  }
}

function getDailyHoroscope() {
  initializeHoroscopes();

  const horoscopes = JSON.parse(localStorage.getItem("horoscopes"));

  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const horoscopeIndex = dayOfYear % horoscopes.length;

  document.getElementById("dailyHoroscope").textContent =
    horoscopes[horoscopeIndex];
}

window.onload = getDailyHoroscope;
