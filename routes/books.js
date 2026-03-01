const express = require("express");

const {
  getAllBook,
  getSingleBookById,
  getAllIssuedBook,
  addBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController");

const app = express.Router();

app.get("/", getAllBook);
app.get("/:id", getSingleBookById);
app.post("/", addBook);
app.put("/:id", updateBook);
app.delete("/:id", deleteBook);
app.get("/issued/for-users", getAllIssuedBook);

module.exports = app;
