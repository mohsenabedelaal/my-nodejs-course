const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Item = require("./models/items");
const mongodb =
  "mongodb+srv://mohsen:mohsen.abedelaal.92@cluster0.cenyy.mongodb.net/items-database?retryWrites=true&w=majority";
mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
    app.listen(3000);
  })
  .catch((error) => console.log(error));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  /*
  We can you sendFile method to return the specific file or 
  we can use the ejs approch by renaming the file ext from html
  to ejs and render(filename)
  */
  // res.sendFile("./views/index.html", { root: __dirname });
  // const items = [
  //   { name: "Book", price: 3000 },
  //   { name: "Mobile Phone", price: 100000 },
  //   { name: "Mouse", price: 12000 },
  // ];
  // res.render("index", { items });
  res.redirect("/get-items");
});

app.get("/create-item", (req, res) => {
  const item = new Item({
    name: "computer",
    price: 5000,
  });
  item
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.get("/get-items", (req, res) => {
  Item.find()
    .then((result) => res.render("index", { items: result }))
    .catch((err) => res.render("error"));
});

app.get("/get-item", (req, res) => {
  Item.findById("612a77abe55b38570a543452")
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.get("/add-item", (req, res) => {
  // res.sendFile("./views/add-item.html", { root: __dirname });
  res.render("add-item");
});
app.use((req, res) => {
  // res.sendFile("./views/error.html", { root: __dirname });
  res.render("error");
});
