const express = require("express");
const expensesRoutes = require("./routes/expenses");
const randomRoutes = require("./routes/random");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.use("/expenses", expensesRoutes);
app.use("/random", randomRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "An unexpected error occurred" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
