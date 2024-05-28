const express = require("express");
const UserController = require("../controllers/userController.js");

const route = express.Router();

route
  .get("/users", UserController.findAllUsers)
  .get("/users/:id", UserController.findUserById)
  .post("/users", UserController.createUser)
  .post("/login", UserController.login)
  .put("/users/:id", UserController.updateUser)
  .delete("/users/:id", UserController.validToken, UserController.deleteUser)

module.exports = route;