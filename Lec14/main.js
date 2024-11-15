const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const EXPENSES_FILE = "expenses.json";
const DELETE_KEY = "12345";

const readExpenses = () => {
  try {
    const data = fs.readFileSync(EXPENSES_FILE, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
};

const writeExpenses = (expenses) => {
  try {
    fs.writeFileSync(EXPENSES_FILE, JSON.stringify(expenses, null, 2));
    console.log("Expenses have been saved!");
  } catch (err) {
    console.error("Error writing to file:", err);
  }
};

app.get("/", (req, res) => {
  res.send(`
      <h1>Welcome to the Expenses API!</h1>
      <p><a href="/expenses">Click here to get started</a></p>
    `);
});

app.get("/expenses", (req, res) => {
  const expenses = readExpenses();
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedExpenses = expenses.slice(startIndex, endIndex);

  res.json({
    total: expenses.length,
    page,
    totalPages: Math.ceil(expenses.length / limit),
    expenses: paginatedExpenses,
  });
});

app.post("/expenses", (req, res) => {
  const { description, amount, date } = req.body;

  if (!description || !amount || !date) {
    return res
      .status(400)
      .json({ error: "All fields (description, amount, date) are required." });
  }

  const expenses = readExpenses();
  const newExpense = {
    id: expenses.length + 1,
    description,
    amount: parseFloat(amount),
    date,
  };

  expenses.push(newExpense);
  writeExpenses(expenses);

  res.status(201).json({
    message: "Expense added successfully",
    expense: newExpense,
  });
});

app.put("/expenses/:id", (req, res) => {
  try {
    const expenses = readExpenses();
    const { id } = req.params;
    const { description, amount, date } = req.body;
    const expenseIndex = expenses.findIndex((exp) => exp.id === parseInt(id));

    if (expenseIndex === -1) {
      return res.status(404).json({ error: "Expense not found" });
    }

    if (description) expenses[expenseIndex].description = description;
    if (amount) expenses[expenseIndex].amount = parseFloat(amount);
    if (date) expenses[expenseIndex].date = date;

    writeExpenses(expenses);
    res.json({
      message: "Expense updated successfully",
      expense: expenses[expenseIndex],
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/expenses/:id", (req, res) => {
  try {
    const { key } = req.headers;
    const { id } = req.params;

    if (key !== DELETE_KEY) {
      return res.status(403).json({ error: "Unauthorized: Invalid key" });
    }

    const expenses = readExpenses();
    const expenseIndex = expenses.findIndex((exp) => exp.id === parseInt(id));

    if (expenseIndex === -1) {
      return res.status(404).json({ error: "Expense not found" });
    }

    expenses.splice(expenseIndex, 1);
    writeExpenses(expenses);

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "An unexpected error occurred" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
