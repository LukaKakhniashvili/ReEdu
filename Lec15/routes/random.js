const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (Math.random() < 0.5) {
    return res.status(403).json({ error: "Request blocked randomly!" });
  }
  res.send("Request passed successfully!");
});

module.exports = router;
