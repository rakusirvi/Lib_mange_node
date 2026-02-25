const express = require("express");

const app = express();

const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Home Page",
    message2: "This is the second message",
    message3: "This is the third message",
  });
});

app.listen(PORT, () => {
  console.log(
    `Server is running on port this is the port number http://localhost:${PORT}`,
  );
});
