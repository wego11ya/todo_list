const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const Todo = require("./models/todo");
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

app.get("/", (req, res) => {
  // 拿到全部的 Todo 資料
  Todo.find()
    .lean()
    .then((todos) => res.render("index", { todos: todos }))
    .catch((error) => console.error(error));
});

app.listen(3000, () => {
  console.log("App is running on port http://localhost:3000");
});
