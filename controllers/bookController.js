const booksModel = require("../models/booksModel");
const { bookModel, userModel } = require("../models/index");

const issuedBookDTO = require("../Dtos/book-dto");

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: books,
//   });
// });

exports.getAllBook = async (req, res) => {
  const books = await bookModel.find();

  if (books.length === 0) {
    return res.status.json({
      success: true,
      message: "no Books In the System",
    });
  }

  res.status(200).json({
    success: true,
    data: books,
  });
};
// app.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const book = books.find((each) => each.id == id);

//   if (!book) {
//     return res.status(404).json({
//       success: false,
//       message: "Books Not Found",
//     });
//   }
//   res.status(200).json({
//     success: true,
//     data: book,
//   });
// });

exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await booksModel.findById(id);

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
};

// app.get("/issued/for-users", (req, res) => {
//   const userWithIssuedBooks = users.filter((each) => {
//     if (each.issuedBooks > 0) {
//       return each;
//     }
//   });

//   const issuedBooks = [];
//   userWithIssuedBooks.forEach((each) => {
//     const book = books.find((book) => book.id === each.issuedBooks);
//     book.issuedBy = each.name;
//     book.issuedDate = each.issuedDate;
//     book.returnDate = each.returnDate;
//     issuedBooks.push(book);
//   });

//   if (!issuedBooks) {
//     return res.status(404).json({
//       success: false,
//       message: "Not Books Issued",
//     });
//   }

//   res.status(200).json({
//     success: this.true,
//     data: issuedBooks,
//   });
// });

exports.getAllIssuedBook = async (req, res) => {
  const users = await userModel
    .find({
      issuedBooks: { $exists: true },
    })
    .populate("issuedBooks");

  const issuedBookToUsers = users.map((each) => {
    return new issuedBookDTO(each);
  });

  if (issuedBookToUsers.length === 0) {
    return res.status(200).json({
      success: false,
      message: "No book Issued to user",
    });
  }

  return res.status(200).json({
    success: true,
    data: issuedBookToUsers,
  });
};

// app.post("/", (req, res) => {

//   const { id, title, author, genre, publisher, price, inStock, rating } =
//     req.body;
//   if (
//     !id ||
//     !title ||
//     !author ||
//     !genre ||
//     !publisher ||
//     !price ||
//     !inStock ||
//     !rating
//   ) {
//     return res.status(404).json({
//       success: false,
//       message: "provide Neccessary Details",
//     });
//   }

//   if (books.find((each) => each.id == id)) {
//     return res.status(404).json({
//       success: false,
//       message: "Book ID already exits",
//     });
//   }

//   books.push({
//     id,
//     title,
//     author,
//     genre,
//     publisher,
//     price,
//     inStock,
//     rating,
//   });

//   res.status(200).json({
//     success: true,
//     message: "books inserted SuccessFully",
//     data: books,
//   });
// });

exports.addBook = async (req, res) => {
  const { data } = req.body;
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({
      success: false,
      message: "please Provide the Data to add a new Book",
    });
  }

  await bookModel.create(data);

  const allBooks = await bookModel.find();
  res.status(200).json({
    success: true,
    message: "Books Added Success Fully",
    BookThatYouAdd: data,
    AllBooks: allBooks,
  });
};

// app.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;

//   if (!data || Object.keys(data).length === 0) {
//     return res.status(404).json({
//       success: false,
//       message: "Please Provde an Appropriate Data",
//     });
//   }
//   if (!books.find((each) => each.id == id)) {
//     return res.status(200).json({
//       success: false,
//       message: "Book Not Exists",
//     });
//   }

//   const updatedBooks = books.map((each) => {
//     if (each.id == id) {
//       return {
//         ...each,
//         ...data,
//       };
//     }
//     return each;
//   });

//   res.status(200).json({
//     message: "Data Updated Success Fully",
//     data: updatedBooks,
//   });
// });

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please Proper Insert an Data... to update",
    });
  }

  const updatedBook = await bookModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });

  //  This is Use for updating Data using by diff Parameter's like name , id  , and {new : true} returns the updated data to the updatedBook object
  //   const updatedBook1 = await bookModel.findOneAndUpdate({ _id: id }, data, {
  //     new: true,
  //   });

  res.status(200).json({
    success: true,
    message: "Book Updated SuccessFully",
    data: updatedBook,
  });
};

// app.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const data = books.find((each) => each.id == id);
//   if (!data) {
//     return res.status(404).json({
//       success: false,
//       message: "Book doesnt Exist",
//     });
//   }

//   const updatedBooks = books.filter((each) => each.id != id);

//   res.status(200).json({
//     success: true,
//     message: "Deleted Successfully",
//     data: updatedBooks,
//   });
// });

exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  const book = await bookModel.findById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not Found with ID " + id,
    });
  }

  await bookModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: `Book is Deteled Successfully with ID ${id}`,
  });
};
