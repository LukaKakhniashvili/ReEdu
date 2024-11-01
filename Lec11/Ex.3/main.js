// 3. Write a random text into a file named text.txt. Then, read this file and count how many vowels are present.

const fs = require("fs");

function generateRandomText(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz ";
  let text = "";

  for (let i = 0; i < length; i++) {
    const randomChar =
      characters[Math.floor(Math.random() * characters.length)];
    text += randomChar;

    if (Math.random() < 0.05) text += " ";
    if (Math.random() < 0.02) text += ". ";
  }

  return text.trim();
}

const randomText = generateRandomText(500);
fs.writeFileSync("text.txt", randomText, "utf8");
console.log("Random text written to text.txt");

const data = fs.readFileSync("text.txt", "utf8");

const vowelCount = data.match(/[aeiouAEIOU]/g)?.length || 0;
console.log(`Number of vowels in the text: ${vowelCount}`);
