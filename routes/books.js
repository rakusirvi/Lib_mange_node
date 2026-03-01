const express = require("express");

const books = require("../data/books.json");
const users = require("../data/users.json");

const { userModel, bookModel } = require("../models/index");
const {
  getAllBook,
  getSingleBookById,
  getAllIssuedBook,
  addBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController");

const app = express.Router();

/*
Route : /books
  Method GET
  Description : Get all the List of Books in the system
  Access : public 
  Parameters: None
*/

app.get("/", getAllBook);

/*
Route : /booka/:id
  Method GET
  Description : Get books by their id
  Access : public 
  Parameters: ID
*/

app.get("/:id", getSingleBookById);

/*
Route : /books
  Method POST
  Description : Create a New Boook for the Suystem
  Access : public 
  Parameters: None
*/

app.post("/", addBook);

/*
Route : /books
  Method PUT
  Description : Update Boook by their ID
  Access : public 
  Parameters: id
*/

app.put("/:id", updateBook);

/*
Route : /books/:id
  Method DELETE
  Description : Delete Boook by their ID
  Access : public 
  Parameters: id
*/

app.delete("/:id", deleteBook);

/*
Route : /books/Issued
  Method GET
  Description : GET all issued books
  Access : public 
  Parameters: None
*/

app.get("/issued/for-users", getAllIssuedBook);

module.exports = app;
