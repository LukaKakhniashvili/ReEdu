// 1. make a promise that rejects or resolves 50/50
function promises() {
  return new Promise((resolve, reject) => {
    const isResolve = Math.random() >= 0.5;
    if (isResolve) {
      resolve("Promise resolved!");
    } else {
      reject("Promise rejected!");
    }
  });
}
promises()
  .then((message) => console.log(message))
  .catch((error) => console.log(error));

// 2. write a function that get data from: https://jsonplaceholder.typicode.com/users and return result
async function usersData() {
  const url = "https://jsonplaceholder.typicode.com/users";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
usersData().then((users) => {
  console.log(users);
  console.log(' ')
});

// 3. write a function that try to get data from: https://jsonplaceholde.typicode.com (link is invalid for this task) if request will failed try to retrieve it 5 times
async function fetchInvalidUrl(url, maxAttempts = 5) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts}, failed: ${error.message}`);

      if (attempts === maxAttempts) {
        console.error("Max retries reached. Couldn't fetch data.");
        return null;
      }
    }
  }
}
fetchInvalidUrl("https://jsonplaceholde.typicode.com").then((result) => {
  console.log(result);
  console.log(' ')
});

// 4. write a function that try to get data from this two sources:  https://dummyjson.com/users and https://jsonplaceholder.typicode.com/users and return the only response which has faster response, use fetch or axios method.
async function fetchFasterWithoutRace() {
  const url1 = "https://dummyjson.com/users";
  const url2 = "https://jsonplaceholder.typicode.com/users";

  let firstResponse = null;
  let isResolved = false;

  const fetchWithPriority = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      if (!isResolved) {
        isResolved = true;
        firstResponse = await response.json();
      }
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error.message);
    }
  };
  await Promise.all([fetchWithPriority(url1), fetchWithPriority(url2)]);
  return firstResponse;
}
fetchFasterWithoutRace().then((result) => {
  console.log(`data from the faster source:`)
  console.log(result);
  console.log(' ')
});

// 5. create a three promise that returns any kind of arrays with difference time. one of one of them should be reject other two should be fulfilled. merged the only fulfilled arrays.

