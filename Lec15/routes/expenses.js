const express = require("express");
const router = express.Router();
const expensesService = require("../services/expensesService");

const validateExpenseFields = (req, res, next) => {
  const { description, amount, date } = req.body;

  if (!description || !amount || !date) {
    return res
      .status(400)
      .json({ error: "All fields (description, amount, date) are required." });
  }

  next();
};

const validateDeleteKey = (req, res, next) => {
  const DELETE_KEY = "12345";
  const { key } = req.headers;

  if (key !== DELETE_KEY) {
    return res.status(403).json({ error: "Unauthorized: Invalid key" });
  }

  next();
};

router.get("/", (req, res) => {
  const expenses = expensesService.readExpenses();
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const startIndex = (page - 1) * limit;
  const paginatedExpenses = expenses.slice(startIndex, startIndex + limit);

  res.json({
    total: expenses.length,
    page,
    totalPages: Math.ceil(expenses.length / limit),
    expenses: paginatedExpenses,
  });
});

router.post("/", validateExpenseFields, (req, res) => {
  const newExpense = expensesService.addExpense(req.body);
  res.status(201).json({
    message: "Expense added successfully",
    expense: newExpense,
  });
});

router.put("/:id", (req, res) => {
  const updatedExpense = expensesService.updateExpense(req.params.id, req.body);

  if (!updatedExpense) {
    return res.status(404).json({ error: "Expense not found" });
  }

  res.json({
    message: "Expense updated successfully",
    expense: updatedExpense,
  });
});

router.delete("/:id", validateDeleteKey, (req, res) => {
  const deleted = expensesService.deleteExpense(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: "Expense not found" });
  }

  res.json({ message: "Expense deleted successfully" });
});

module.exports = router;
