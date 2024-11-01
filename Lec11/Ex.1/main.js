document.getElementById("fetchBtn").addEventListener("click", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    let users = await response.json();

    users = users.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }));

    const saveResponse = await fetch("/saveUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    });

    document.getElementById("status").innerText = saveResponse.ok
      ? "Users saved successfully!"
      : "Failed to save users";
      document.getElementById("status").style.color = "green";
  } catch (error) {
    console.error("Error fetching or saving users:", error);
    document.getElementById("status").innerText =
      "Error fetching or saving users";
      document.getElementById("status").style.color = "red";
  }
});
