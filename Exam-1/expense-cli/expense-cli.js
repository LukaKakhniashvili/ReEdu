const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const expenseFilePath = path.join(__dirname, 'expenses.json');

const readExpenses = () => {
  if (!fs.existsSync(expenseFilePath)) {
    fs.writeFileSync(expenseFilePath, JSON.stringify([]));
    console.log('expenses.json file was created.');
  }
  const data = fs.readFileSync(expenseFilePath);
  return JSON.parse(data);
};

const writeExpenses = (expenses) => {
  fs.writeFileSync(expenseFilePath, JSON.stringify(expenses, null, 2));
  console.log('Expenses saved successfully!');
};

const createExpense = (category, price, description) => {
  if (price < 10) {
    console.log('Error: The minimum expense amount should be 10 GEL or more.');
    return;
  }

  const expenses = readExpenses();
  const newExpense = {
    id: Date.now().toString(),
    category,
    price,
    description,
    date: new Date().toISOString(),
  };

  expenses.push(newExpense);
  writeExpenses(expenses);
  console.log('Expense added successfully!');
};

const listExpenses = (sortBy = 'date', order = 'asc') => {
  const expenses = readExpenses();
  let sortedExpenses = [...expenses];

  if (sortBy === 'date') {
    sortedExpenses.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  if (sortBy === 'price') {
    sortedExpenses.sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }

  console.log(`Listing expenses sorted by ${sortBy} in ${order} order:`);
  sortedExpenses.forEach(expense => {
    console.log(`ID: ${expense.id}, Category: ${expense.category}, Price: ${expense.price} GEL, Date: ${expense.date}, Description: ${expense.description}`);
  });
};

const updateExpense = (id, category, price, description) => {
  const expenses = readExpenses();
  id = String(id);
  console.log('Update command - id:', id);

  const expenseIndex = expenses.findIndex(expense => expense.id === id);

  if (expenseIndex === -1) {
    console.log('Error: Expense not found.');
    return;
  }

  const updatedExpense = {
    ...expenses[expenseIndex],
    category,
    price,
    description,
    date: new Date().toISOString(),
  };

  expenses[expenseIndex] = updatedExpense;
  writeExpenses(expenses);
  console.log('Expense updated successfully!');
};

const deleteExpense = (id) => {
  const expenses = readExpenses();
  id = String(id);
  console.log('Delete command - id:', id);

  const updatedExpenses = expenses.filter(expense => expense.id !== id);
  if (updatedExpenses.length === expenses.length) {
    console.log('Error: Expense not found.');
    return;
  }
  writeExpenses(updatedExpenses);
  console.log('Expense deleted successfully!');
};

yargs
  .command(
    'create <category> <price> <description>',
    'Create a new expense',
    (yargs) => {
      yargs.positional('category', { describe: 'Expense category' })
        .positional('price', { describe: 'Expense price' })
        .positional('description', { describe: 'Expense description' });
    },
    (argv) => {
      const { category, price, description } = argv;
      createExpense(category, parseFloat(price), description);
    }
  )
  .command(
    'list [sortBy] [order]',
    'List all expenses, with optional sorting by date or price',
    (yargs) => {
      yargs.positional('sortBy', { describe: 'Sort by "date" or "price"', type: 'string', default: 'date' })
        .positional('order', { describe: 'Sort order "asc" or "desc"', type: 'string', default: 'asc' });
    },
    (argv) => {
      const { sortBy, order } = argv;
      listExpenses(sortBy, order);
    }
  )
  .command(
    'update <id> <category> <price> <description>',
    'Update an existing expense by ID',
    (yargs) => {
      yargs.positional('id', { describe: 'Expense ID' })
        .positional('category', { describe: 'Expense category' })
        .positional('price', { describe: 'Expense price' })
        .positional('description', { describe: 'Expense description' });
    },
    (argv) => {
      const { id, category, price, description } = argv;
      updateExpense(id, category, parseFloat(price), description);
    }
  )
  .command(
    'delete <id>',
    'Delete an expense by ID',
    (yargs) => {
      yargs.positional('id', { describe: 'Expense ID' });
    },
    (argv) => {
      const { id } = argv;
      deleteExpense(id);
    }
  )
  .demandCommand()
  .help()
  .argv;
