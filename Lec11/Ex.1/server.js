const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

app.post("/saveUsers", (req, res) => {
  const users = req.body;

  fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).send("Error saving users");
    }
    res.send("Users saved successfully!");
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
