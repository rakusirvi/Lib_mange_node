const express = require("express");
require("dotenv").config();

const DataBaseConnection = require("./databaseConnection");
DataBaseConnection();

const usersRoutes = require("./routes/users");
const booksRoutes = require("./routes/books");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Home Page",
  });
});

app.use("/users", usersRoutes);
app.use("/books", booksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
