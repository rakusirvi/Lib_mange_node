const express = require("express");
const users = require("../data/users.json");
const { get } = require("./books");

const app = express.Router();

/*
Route : /users
  Method GET
  Description : Get all the List of users in the system
  Access : public 
  Parameters: None
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/*
Route : /users/:id
  Method GET
  Description : Get user by their id
  Access : public 
  Parameters: ID
*/

app.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id == id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

/*
Route : /users
  Method POST
  Description : Create a New User for the Suystem
  Access : public 
  Parameters: None
*/

app.post("/", (req, res) => {
  const {
    id,
    name,
    surname,
    email,
    issuedBooks,
    issuedDate,
    returnDate,
    subscriptionType,
    subscriptionDate,
  } = req.body;
  if (
    !id ||
    !name ||
    !surname ||
    !email ||
    !issuedBooks ||
    !issuedDate ||
    !returnDate ||
    !subscriptionDate ||
    !subscriptionType
  ) {
    return res.status(404).json({
      success: true,
      message: "please Provide all the Details",
    });
  }
  const userID = users.find((each) => each.id == id);
  if (userID) {
    return res.status(409).json({
      success: false,
      message: `User Already Exits with id ${id}`,
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    issuedBooks,
    issuedDate,
    returnDate,
    subscriptionType,
    subscriptionDate,
  });

  res.status(201).json({
    success: true,
    message: `User registered Success fully with ID ${id}`,
  });
});

/*
Route : /users/:id
  Method PUT
  Description : Updating users with ID 
  Access : public 
  Parameters: ID
*/

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const userID = users.find((each) => each.id == id);
  if (!userID) {
    return res.status(206).json({
      success: false,
      message: `User Not Exits with Id ${id}`,
    });
  }

  const updatedUser = users.map((each) => {
    if (each.id == id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });

  res.status(200).json({
    data: updatedUser,
    message: `User Details Updaed Successfully`,
  });
});

/*
Route : /users/:id
  Method DELETE
  Description : Deliting users by their ID 
  Access : public 
  Parameters: ID
*/

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found with id " + id + "",
    });
  }
  // if user Exists Filter it out from the Array (filter used)
  const updatedUsers = users.filter((each) => each.id != id);

  // second method to delete users
  // const index = users.indexOf(user);
  // users.splice(index, 1);

  res.status(200).json({
    success: true,
    data: updatedUsers,
    message: "User Deleted SuccessFully",
  });
});

/*
Route : /users/subsciption-details/:id
  Method GET
  Description : Get All the Subscription Details by their ID
  Access : public 
  Parameters: ID
*/

app.get("/subsciption-details/:id", (req, res) => {
  const { id } = req.params;

  //find the user by their id
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No user with Subscription",
    });
  }

  // Extract the Subscription details

  const getDateInDays = (data = "") => {
    let date;
    if (data) {
      date = new Date(data);
    } else {
      date = new Date();
    }
    let days = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType.toLowerCase() === "basic") {
      date = date + 30;
    } else if (user.subscriptionType.toLowerCase() === "standard") {
      date = date + 100;
    } else if (user.subscriptionType.toLowerCase() === "premium") {
      date = date + 365;
    }
    return date;
  };

  // subscription Callculation
  // january 1, 1970 UTC // milliseec
  let returningDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExp = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    subscriptionExpired: subscriptionExp < currentDate,
    daysLeftForExpired:
      subscriptionExp < currentDate
        ? "Subscription Expired"
        : subscriptionExp - currentDate,
    returnDate:
      returningDate < currentDate ? "Book is OverDue" : user.returnDate,
    fine:
      returningDate < currentDate
        ? subscriptionExp <= currentDate
          ? 200
          : 100
        : 0,
  };

  res.status(200).json({
    success: true,
    data: data,
  });
});

module.exports = app;
