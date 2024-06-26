const express = require("express");

const users = require("./usersRoute.js");
const roles = require("./rolesRoute.js");
const consultations = require("./consultationRoute.js");

const routes = (app) => {
  app.use(
    express.json(),
    express.Router().get("/", (req, res) => {
      res.status(200).json("EAZYSPEAK");
    }),
    users,
    roles,
    consultations
  );
};

module.exports = routes;
