const apiUrl = "http://localhost:3000/expenses";

async function getExpenses(page = 1) {
  try {
    const response = await fetch(`${apiUrl}?page=${page}`);
    const data = await response.json();

    if (!data.expenses || !Array.isArray(data.expenses)) {
      throw new Error("Expected an object with an 'expenses' array");
    }

    const expenses = data.expenses;
    const expenseTable = document.querySelector("#expenseTable tbody");
    expenseTable.innerHTML = "";

    expenses.forEach((exp) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${exp.id}</td>
        <td class="desc">${exp.description}</td>
        <td class="amt">${exp.amount}</td>
        <td class="date">${exp.date}</td>
        <td>
          <button class="delete" onclick="deleteExpense(${exp.id})">Delete</button>
          <button class="edit" onclick="editExpense(${exp.id})">Edit</button>
        </td>
      `;
      expenseTable.appendChild(row);
    });

    createPagination(data.page, data.totalPages);
  } catch (err) {
    console.error("Error fetching expenses:", err);
  }
}

document
  .querySelector("#expenseForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const description = document.querySelector("#description").value;
    const amount = document.querySelector("#amount").value;
    const date = document.querySelector("#date").value;

    const newExpense = { description, amount, date };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });

      if (response.ok) {
        await getExpenses();
        document.querySelector("#expenseForm").reset();
      } else {
        alert("Failed to add expense");
      }
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  });

async function deleteExpense(id) {
  const userKey = prompt("Please enter the DELETION KEY:");

  if (userKey === null || userKey === "") {
    alert("Delete operation cancelled.");
    return;
  }
  const DELETE_KEY = "12345";

  if (userKey !== DELETE_KEY) {
    alert("Invalid Password");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        key: DELETE_KEY,
      },
    });

    if (response.ok) {
      alert("Expense deleted successfully!");
      getExpenses();
    } else {
      alert("Failed to delete expense.");
    }
  } catch (err) {
    console.error("Error deleting expense:", err);
    alert("An error occurred while trying to delete the expense.");
  }
}

function editExpense(id) {
  const row = document.querySelector(`button[onclick="editExpense(${id})"]`)
    .parentElement.parentElement;

  const currentDescription = row.querySelector(".desc").innerText;
  const currentAmount = row.querySelector(".amt").innerText;
  const currentDate = row.querySelector(".date").innerText;

  row.innerHTML = `
    <td>${id}</td>
    <td><input type="text" id="editDescription${id}" value="${currentDescription}" /></td>
    <td><input type="number" id="editAmount${id}" value="${currentAmount}" /></td>
    <td><input type="date" id="editDate${id}" value="${currentDate}" /></td>
    <td>
      <button class="save_edit" onclick="saveEdit(${id})">Save</button>
      <button class="cancel_edit" onclick="cancelEdit(${id}, '${currentDescription}', ${currentAmount}, '${currentDate}')">Cancel</button>
    </td>
  `;
}

async function saveEdit(id) {
  const description = document.querySelector(`#editDescription${id}`).value;
  const amount = parseFloat(document.querySelector(`#editAmount${id}`).value);
  const date = document.querySelector(`#editDate${id}`).value;

  const updatedExpense = { description, amount, date };

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedExpense),
    });

    if (response.ok) {
      await getExpenses();
    } else {
      alert("Failed to update expense.");
    }
  } catch (err) {
    console.error("Error updating expense:", err);
  }
}

function cancelEdit(id, description, amount, date) {
  const row = document.querySelector(`button[onclick="saveEdit(${id})"]`)
    .parentElement.parentElement;

  row.innerHTML = `
    <td>${id}</td>
    <td class="desc">${description}</td>
    <td class="amt">${amount}</td>
    <td class="date">${date}</td>
    <td>
      <button class="delete" onclick="deleteExpense(${id})">Delete</button>
      <button class="edit" onclick="editExpense(${id})">Edit</button>
    </td>
  `;
}

function createPagination(currentPage, totalPages) {
  const paginationContainer = document.querySelector("#pagination");
  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.innerText = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => getExpenses(currentPage - 1));
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.disabled = i === currentPage;
    pageButton.addEventListener("click", () => getExpenses(i));
    paginationContainer.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => getExpenses(currentPage + 1));
  paginationContainer.appendChild(nextButton);
}

window.onload = () => getExpenses();
