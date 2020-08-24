const express = require("express");
const path = require("path");
const members = require("./json-data/members.js");

const app = express();

// routes
// simple REST api
app.get("/api/members", (req, res) => {
  res.json(members);
});

// set static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});