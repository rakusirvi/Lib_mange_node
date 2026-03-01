const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    issuedBooks: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: false,
    },
    issuedDate: {
      type: String,
      required: false,
    },
    returnDate: {
      type: String,
      required: false,
    },
    subscriptionType: {
      type: String,
      required: true,
    },
    subscriptionDate: {
      type: String,
      required: true,
    },
  },
  { Timestamp: true },
);

module.exports = mongoose.model("User", userSchema);

// "name": "Rohan",
// "surname": "Sharma",
// "email": "rohan.sharma1@example.com",
// "issuedBooks": 2,
// "issuedDate": "01/10/26",
// "returnDate": "01/24/26",
// "subscriptionType": "Premium",
// "subscriptionDate": "12/15/25"
