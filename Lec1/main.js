// 1. You need to write a function that reverses the words in a given string. Words are always separated by a single space. e.g: "Hello World" --> "World Hello"
// Version 1: with Reverse function
function reverseWords(str) {
  return str.split(" ").reverse().join(" ");
}
console.log(reverseWords("Hello World"));

// Version 2: without Reverse function
function reverseWords(str) {
  let words = str.split(" ");
  let reversedWords = [];

  for (let i = words.length - 1; i >= 0; i--) {
    reversedWords[words.length - 1 - i] = words[i];
  }
  return reversedWords.join(" ");
}
console.log(reverseWords("Hello World"));

// 2. Write a function that cleans whole sentences to numbers. eg: 'This looks5 grea8t!' -> 'This looks great!'
// Version 1: with Regex
function sentenceCleaner(sent) {
  return sent.replace(/[0-9]/g, "");
}

console.log(sentenceCleaner("This looks5 grea8t!"));

// Version 2: without Regex
function sentenceCleaner(sent) {
  let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let cleanedSentence = "";

  for (let i = 0; i < sent.length; i++) {
    if (!numbers.includes(sent[i])) {
      cleanedSentence += sent[i];
    }
  }
  return cleanedSentence;
}
console.log(sentenceCleaner("This looks5 grea8t!"));

// 3. Given a string, you have to return a string in which each character (case-sensitive) is repeated once. e.g: "String"      -> "SSttrriinngg" e.g: "Hello World" -> "HHeelllloo  WWoorrlldd"
// Version 1: with Map
function repeatedChars(str) {
  return str
    .split("")
    .map((char) => char + char)
    .join("");
}
console.log(repeatedChars("Hello World"));

// Version 2: without Map
function repeatedChars(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    result += str[i] + str[i];
  }
  return result;
}
console.log(repeatedChars("Hello World"));

// 4. Make a function that takes a sentences and return the abbreaviate of it. e.g: Sam Harris => S.H.   e.g: hello world everyone => H.W.E
// Version 1: with For Loop
function abbreviateOfSentence(sentence) {
  let words = sentence.split(" ");
  let abbreviation = "";

  for (let i = 0; i < words.length; i++) {
    if (words[i]) {
      abbreviation += words[i][0].toUpperCase() + ".";
    }
  }
  return abbreviation.slice(0, -1);
}
console.log(abbreviateOfSentence("sam harris"));
console.log(abbreviateOfSentence("hello world everyone"));

// Version 2: without For Loop
function abbreviateOfSentence(sentence) {
  return sentence
    .split(" ")
    .map((word) => word[0])
    .join(".")
    .toUpperCase();
}
console.log(abbreviateOfSentence("sam harris"));
console.log(abbreviateOfSentence("hello world everyone"));


// 5. Make a function that takes a number as a argument and return random word which length would be the number. e.g: 4 => 'h1zt',  5 => 'zvc1e'. you should build random string from all characters and numbers.
function randomStringGenerator(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";
  for (let i = 0; i < length; i++) {
    const index = (new Date().getMilliseconds() + i) % chars.length;
    result += chars[index];
  }
  return result;
}

console.log(randomStringGenerator(4));
console.log(randomStringGenerator(5));
