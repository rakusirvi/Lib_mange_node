const express = require("express");

const books = require("../data/books.json");
const users = require("../data/users.json");
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
      message: "Books Not Found",
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

/*
Route : /books/Issued
  Method GET
  Description : GET all issued books
  Access : public 
  Parameters: None
*/

app.get("/issued/for-users", (req, res) => {
  const userWithIssuedBooks = users.filter((each) => {
    if (each.issuedBooks > 0) {
      return each;
    }
  });

  const issuedBooks = [];
  userWithIssuedBooks.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBooks);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;
    issuedBooks.push(book);
  });

  if (!issuedBooks) {
    return res.status(404).json({
      success: false,
      message: "Not Books Issued",
    });
  }

  res.status(200).json({
    success: this.true,
    data: issuedBooks,
  });
});

module.exports = app;
