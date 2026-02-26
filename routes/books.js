const express = require("express");

const books = require("../data/books.json");

const app = express.Router();

/*
Route : /books
  Method GET
  Description : Get all the List of Books in the system
  Access : public 
  Parameters: None
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

/*
Route : /booka/:id
  Method GET
  Description : Get books by their id
  Access : public 
  Parameters: ID
*/

app.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id == id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }
  res.status(200).json({
    success: true,
    data: book,
  });
});

/*
Route : /books
  Method POST
  Description : Create a New Boook for the Suystem
  Access : public 
  Parameters: None
*/

app.post("/", (req, res) => {
  const { id, title, author, genre, publishedYear, price, inStock, rating } =
    req.body;
  if (
    !id ||
    !title ||
    !author ||
    !genre ||
    !publishedYear ||
    !price ||
    !inStock ||
    !rating
  ) {
    return res.status(404).json({
      success: false,
      message: "provide Neccessary Details",
    });
  }

  if (books.find((each) => each.id == id)) {
    return res.status(404).json({
      success: false,
      message: "Book ID already exits",
    });
  }

  books.push({
    id,
    title,
    author,
    genre,
    publishedYear,
    price,
    inStock,
    rating,
  });

  res.status(200).json({
    success: true,
    message: "books inserted SuccessFully",
    data: books,
  });
});

/*
Route : /books
  Method PUT
  Description : Update Boook by their ID
  Access : public 
  Parameters: id
*/

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(404).json({
      success: false,
      message: "Please Provde an Appropriate Data",
    });
  }
  if (!books.find((each) => each.id == id)) {
    return res.status(200).json({
      success: false,
      message: "Book Not Exists",
    });
  }

  const updatedBooks = books.map((each) => {
    if (each.id == id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });

  res.status(200).json({
    message: "Data Updated Success Fully",
    data: updatedBooks,
  });
});

/*
Route : /books/:id
  Method DELETE
  Description : Delete Boook by their ID
  Access : public 
  Parameters: id
*/

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const data = books.find((each) => each.id == id);
  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Book doesnt Exist",
    });
  }

  const updatedBooks = books.filter((each) => each.id != id);

  res.status(200).json({
    success: true,
    message: "Deleted Successfully",
    data: updatedBooks,
  });
});

module.exports = app;
