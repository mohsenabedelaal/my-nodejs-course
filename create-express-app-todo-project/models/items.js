const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
/*
the name inside the model must be the same name as the collection created in the db and you put it here 
like this patern (first character is UpperCase and singular so it will convert it into ==> plural and lowerCase)
*/
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
