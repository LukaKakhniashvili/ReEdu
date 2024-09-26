// 1. Check if any number in the array is divisible by 5 and if true, find its index e.g: [3, 6, 10, 12] → 2
const nums = [3, 6, 10, 12];
const indexOfNums = nums.findIndex((num) => num % 5 === 0);
console.log(`index of number, which is divisible by 5: ${indexOfNums}`);

// 2. Filter out negative numbers from a nested array e.g: [[1, -2], [3, -4], [5]] → [1, 3, 5]
const nestedArr = [[1, -2], [3, -4], [5]];
const result = [];

nestedArr.forEach((subArr) => {
  subArr.forEach((num) => {
    if (num >= 0) {
      result.push(num);
    }
  });
});
console.log(`array without negative numbers: ${result}`);

// 3. Filter out non-array elements and then check if the remaining elements are arrays e.g: [1, [2, 3], "hello", [4]] → true for remaining arrays
const arr = [1, [2, 3], "hello", [4]];
const isArray = arr.filter((item) => Array.isArray(item)).every(Array.isArray);
console.log(isArray);

// 4. Flatten a nested array and find the sum of all elements e.g: [[2, 4], [6, 8]] → 20
const nestedArr2 = [
  [2, 4],
  [6, 8],
];
const sum = nestedArr2.flat().reduce((acc, num) => acc + num, 0);
console.log(`sum of array nums: ${sum}`);

// 5. Flatten a nested array, then square each number, and calculate sum the squares
const nestedArr3 = [
  [2, 4],
  [6, 8],
];
const sumOfSquares = nestedArr3
  .flat()
  .map((num) => num ** 2)
  .reduce((acc, num) => acc + num, 0);
console.log(`sum of numbers' square: ${sumOfSquares}`);

// 6. Get the total number of characters by eye color (hint. a map of eye color to count)
// e.g: {
// brown: 1,
// yellow: 1,
// blue: 2
// }

const characters = [
  {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    eye_color: "blue",
    gender: "male",
  },
  {
    name: "Darth Vader",
    height: "202",
    mass: "136",
    eye_color: "yellow",
    gender: "male",
  },
  {
    name: "Leia Organa",
    height: "150",
    mass: "49",
    eye_color: "brown",
    gender: "female",
  },
  {
    name: "Anakin Skywalker",
    height: "188",
    mass: "84",
    eye_color: "blue",
    gender: "male",
  },
];

const eyeColorCount = characters
  .map((color) => color.eye_color)
  .reduce((acc, eyeColor) => {
    acc[eyeColor] = (acc[eyeColor] || 0) + 1;
    return acc;
  }, {});
console.log(eyeColorCount);
