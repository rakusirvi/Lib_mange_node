// data Transfer object

class issuedBookDTO {
  _id;
  name;
  author;
  genre;
  price;
  publisher;
  issuedBy;
  issuedDate;
  returnDate;

  constructor(user) {
    this.id = user.issuedBooks._id;
    this.name = user.issuedBooks.name;
    this.author = user.issuedBooks.author;
    this.genre = user.issuedBooks.genre;
    this.price = user.issuedBooks.price;
    this.publisher = user.issuedBooks.publisher;
    this.issuedBy = user.name;
    this.issuedDate = user.issuedDate;
    this.returnDate = user.returnDate;
  }
}

module.exports = issuedBookDTO;
