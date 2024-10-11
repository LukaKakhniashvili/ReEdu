document.addEventListener("DOMContentLoaded", () => {
  const userList = document.getElementById("user-list");
  const loadingMessage = document.getElementById("loading-message");

  function fetchUsers() {
    const api1 = "https://fakestoreapi.com/users";
    const api2 = "https://jsonplaceholder.typicode.com/users";

    Promise.all([fetch(api1), fetch(api2)])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => {
        const [users1, users2] = data;

        displayUsers(users1, "FakeStore API");
        displayUsers(users2, "JsonPlaceholder API");

        loadingMessage.style.display = "none";
      })
      .catch((error) => {
        console.error("Error:", error);
        loadingMessage.textContent = "Error loading users!";
      });
  }

  function displayUsers(users, source) {
    users.forEach((user) => {
      const userContainer = document.createElement("div");
      userContainer.classList.add("user-container");

      userContainer.innerHTML = `
          <h3>${user.name || user.username}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>API:</strong> ${source}</p>`;

      userList.appendChild(userContainer);
    });
  }

  fetchUsers();
});
