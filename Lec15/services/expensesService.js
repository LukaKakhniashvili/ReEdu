const fs = require("fs");
const path = require("path");
const EXPENSES_FILE = path.join(__dirname, "../expenses.json");

const readExpenses = () => {
  try {
    const data = fs.readFileSync(EXPENSES_FILE, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error reading or parsing the expenses file:", err);
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

const addExpense = ({ description, amount, date }) => {
  const expenses = readExpenses();
  const newExpense = {
    id: expenses.length + 1,
    description,
    amount: parseFloat(amount),
    date,
  };
  expenses.push(newExpense);
  writeExpenses(expenses);
  return newExpense;
};

const updateExpense = (id, { description, amount, date }) => {
  const expenses = readExpenses();
  const expenseIndex = expenses.findIndex((exp) => exp.id === parseInt(id));

  if (expenseIndex === -1) return null;

  if (description) expenses[expenseIndex].description = description;
  if (amount) expenses[expenseIndex].amount = parseFloat(amount);
  if (date) expenses[expenseIndex].date = date;

  writeExpenses(expenses);
  return expenses[expenseIndex];
};

const deleteExpense = (id) => {
  const expenses = readExpenses();
  const expenseIndex = expenses.findIndex((exp) => exp.id === parseInt(id));

  if (expenseIndex === -1) return false;

  expenses.splice(expenseIndex, 1);
  writeExpenses(expenses);
  return true;
};

module.exports = {
  readExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};
