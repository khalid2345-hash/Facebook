const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Route
app.post("/submit", (req, res) => {
  const { email, password } = req.body;
  res.send("Form received!");
});

// ❌ Wrong (hardcoded port)
// app.listen(3000, () => console.log("Server running"));

console.log("Correct (Render expects this")  // <- missing closing parenthesis
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
