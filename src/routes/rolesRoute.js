const express = require("express");
const RoleController = require("../controllers/roleController.js");

const route = express.Router();

route
  .get("/roles", RoleController.findAllRoles)
  .get("/roles/:id", RoleController.findRoleById)
  .post("/roles", RoleController.createRole)
  .put("/roles/:id", RoleController.updateRole)
  .delete("/roles/:id", RoleController.deleteRole);

module.exports = route;