// 1. Create a function that counts the Number of Digits in Each Element, e.g: [123, 45, 6] becomes [3, 2, 1])
// Version 1: with Map method\
function digitsCounter(arr) {
    return arr.map(num => num.toString().length);
}
const arr = [123, 45, 6];
const counter = digitsCounter(arr);
console.log(`${arr} - Number of Digits in Each Elements: ${counter}`);

// Version 2: without Map method
function digitsCounter(arr) {
    const counts = [];
    for (let i = 0; i < arr.length; i++) {
        counts.push(arr[i].toString().length);
    }
    return counts;
}
const arr2 = [123, 45, 6];
const counter2 = digitsCounter(arr2);
console.log(`${arr2} - Number of Digits in Each Elements: ${counter2}`);


// 2. Write a function that takes an array of numbers and reverses the order of its elements using a loop. Don't use reverse(). e.g: [1,2,3] => [3,2,1]
function reverseArray(arr) {
    const reversed = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
}
const input = [1, 2, 3];
const result = reverseArray(input);
console.log(`${input} - Reversed: ${result}`);


// 3. Write a function that returns the sum of the squares of all the numbers in an array (e.g., [1, 2, 3] returns 1^2 + 2^2 + 3^2 = 14). Use a loop to calculate the squares.
function sumOfSquares(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i] * arr[i];
    }
    return sum;
}
const sumArr = [1, 2, 3];
const square = sumOfSquares(sumArr);
console.log(`sum of the squares of all the numbers in an array ${sumArr} is: ${square}`);


// 4. Write a function that counts the total number of characters in all the strings in an array. e.g:["a", "ab", "abc"] => 6
function CharactersCounter(arr) {
    let totalCount = 0;
    for (let i = 0; i < arr.length; i++) {
        totalCount += arr[i].length;
    }
    return totalCount;
}
const strings = ["a", "ab", "abc"];
const charsCounter = CharactersCounter(strings);
console.log(`total number of characters in all the strings in an array ${strings} is: ${charsCounter}`);


// 5. Write a function that takes an array of strings and returns the new array with the palindrome words. palindrome words are level, becase if you reverse this word its the same, like madam.  e.g: ['level', 'giga', 'ana', 'button', 'abba'] => ['level', 'ana', 'abba']
function palindromesFinder(arr) {
    const palindromes = [];
    for (let i = 0; i < arr.length; i++) {
        const word = arr[i];
        const reversedWord = word.split('').reverse().join('');
        if (word === reversedWord) {
            palindromes.push(word);
        }
    }
    return palindromes;
}
const words = ['level', 'giga', 'ana', 'button', 'abba'];
const palindromeWords = palindromesFinder(words);
console.log(`palindrome words from array: ${words} are: ${palindromeWords}`);


// 6. Write a function that filters out all words from an array that contain special characters (e.g., @, #, $). Bonus: Return both the filtered array and the removed words. dont use filter metohds use it with for loop.
function filterSpecialCharacters(arr) {
    const filtered = [];
    const removed = [];
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;

    for (let i = 0; i < arr.length; i++) {
        const word = arr[i];
        if (specialChars.test(word)) {
            removed.push(word);
        } else {
            filtered.push(word);
        }
    }
    return { filtered, removed };
}
const totalWords = ["level", "button", "gig@", "USD$", "test@gmail.com", "Facebook", "Coding@", "#hashtag"];
const wordsWithoutSpecialChars = filterSpecialCharacters(totalWords);
const wordsWithSpecialChars = filterSpecialCharacters(totalWords);
console.log(wordsWithoutSpecialChars.filtered);
console.log(wordsWithSpecialChars.removed);

