const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const booksSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", booksSchema);
// "name: "The Silent Algorithm",
// "author": "Arjun Mehta",
// "genre": "Technology",
// "publisher": "Rajesh pubhisher",
// "price": 499,
// "inStock": true,
//     "rating": 4.5
