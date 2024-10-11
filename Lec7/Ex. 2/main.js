function fetchAndFilterUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      const filteredUsers = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        };
      });

      displayUsers(filteredUsers);
    })
    .catch((error) => console.error("Error:", error));
}

function displayUsers(users) {
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";

  users.forEach((user) => {
    const userContainer = document.createElement("div");
    userContainer.classList.add("user-container");

    userContainer.innerHTML = `
        <h3>${user.name} (username: ${user.username})</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>ID:</strong> ${user.id}</p>
      `;

    userList.appendChild(userContainer);
  });
}

fetchAndFilterUsers();
