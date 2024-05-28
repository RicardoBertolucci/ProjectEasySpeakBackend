const express = require("express");
const ConsultationController = require("../controllers/consultationController.js");

const route = express.Router();

route
  .get("/consultations", ConsultationController.findAllConsultation)
  .get("/consultations/:id", ConsultationController.findConsultaltionById)
  .post("/consultations", ConsultationController.createConsultation)
  .put("/consultations/:id", ConsultationController.updateConsultation)
  .delete("/consultations/:id", ConsultationController.deleteConsultation);

module.exports = route;