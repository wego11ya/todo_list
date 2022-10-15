const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const Todo = require("./models/todo");
const routes = require("./routes");
const app = express();

//設定連線到mongodb
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(routes);

app.listen(3000, () => {
  console.log("App is running on port http://localhost:3000");
});
