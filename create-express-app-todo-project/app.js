const express = require("express");
const mongodbUrl = require("./env");
const app = express();
/* use urlencoded to parse body variables (TEXT INPUTS) that are sent */
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const Item = require("./models/items");
const mongodb = mongodbUrl;
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

app.post("/items", (req, res) => {
  // console.log(req.body);
  const item = new Item(req.body);
  item
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => res.redirect("error"));
});

app.get("/item/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const item = Item.findById(id).then((result) => {
    console.log(result);
    res.render("item-details", { item: result });
  });
});

app.delete("/item/:id", (req, res) => {
  const { id } = req.params;
  const item = Item.findByIdAndDelete(id).then((result) => {
    res.json({ redirect: "/get-items" });
  });
});

app.put("/item/:id", (req, res) => {
  const { id } = req.params;
  const item = Item.findByIdAndUpdate(id, req.body).then((result) => {
    res.json({ msg: "Updated Successfully" });
  });
});
app.use((req, res) => {
  // res.sendFile("./views/error.html", { root: __dirname });
  res.render("error");
});
