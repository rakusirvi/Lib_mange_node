const express = require("express");
const users = require("../data/users.json");
const { get } = require("./books");
const {
  updateUser,
  addUser,
  deleteUser,
  getAllUsers,
  getAllUsersById,
  subcriptionDetailsID,
} = require("../controllers/userController");

const app = express.Router();

/*
Route : /users
  Method GET
  Description : Get all the List of users in the system
  Access : public 
  Parameters: None
*/

app.get("/", getAllUsers);

/*
Route : /users/:id
  Method GET
  Description : Get user by their id
  Access : public 
  Parameters: ID
*/

app.get("/:id", getAllUsersById);

/*
Route : /users
  Method POST
  Description : Create a New User for the Suystem
  Access : public 
  Parameters: None
*/

app.post("/", addUser);

/*
Route : /users/:id
  Method PUT
  Description : Updating users with ID 
  Access : public 
  Parameters: ID
*/

app.put("/:id", updateUser);

/*
Route : /users/:id
  Method DELETE
  Description : Deliting users by their ID 
  Access : public 
  Parameters: ID
*/

app.delete("/:id", deleteUser);

/*
Route : /users/subsciption-details/:id
  Method GET
  Description : Get All the Subscription Details by their ID
  Access : public 
  Parameters: ID
*/

app.get("/subsciption-details/:id", subcriptionDetailsID);

module.exports = app;
