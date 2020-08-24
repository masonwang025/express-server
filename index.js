const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
// const logger = require("./middleware/logger"); app.use(logger);

const app = express();

// handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// template rendering
app.get("/", (req, res) => res.render("index")); //homepage route

// members api routes
app.use("/api/members", require("./routes/api/members"));

// set static folder
// app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
