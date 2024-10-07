// 1. write a function that takes a random number as an argument and logs the random number while the argument number and random number are equal. argument number should be from 0 to 10.
function equalRandomNumber(num) {
  if (num < 0 || num > 10) {
      console.log("Argument number must be between 0 and 10.");
      return;
  }
  let randomNumber;

  do {
      randomNumber = Math.floor(Math.random() * 11);
      console.log(`random number: ${randomNumber}`);
  } while (randomNumber === num);
}
equalRandomNumber(5);

// 2. write a function that imitates to return fake data, use setTimeout. make both async/await and .then.catch methods.
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        id: 1,
        name: "Luka Kakhniashvili",
        email: "test@gmail.com",
      };
      resolve(data);
    }, 500);
  });
}

async function fetchDataAsync() {
  const data = await getData();
  console.log("async/await:", data);
}

function fetchDataThen() {
  getData().then((data) => {
    console.log(".then.catch:", data);
  });
}
fetchDataAsync();
fetchDataThen();

// 3. write a sleep function. make a function that takes a ms as an argument and when you call this function waits untill this function resolved. use setTimeout and promises.
// eg: console.log('first')
// await sleep(2000)
// console.log('second')
// second should sleep after 2 seconds
// Sleep function that returns a promise
function sleep(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}
async function example() {
    console.log('first');
    await sleep(2000);
    console.log('second');
}
example();
