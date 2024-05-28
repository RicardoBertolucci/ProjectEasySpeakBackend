const database = require("../models");

class ConsultationController {
  static async findAllConsultation(req, res) {
    try {
      const consultationFound = await database.EZSP_T_CONSULTATIONS.findAll();

      if (!consultationFound || consultationFound.length === 0) {
        return res.status(404).send("No consultations registered!");
      }

      res.send(consultationFound);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error!");
    }
  }

  static async findConsultaltionById(req, res) {
    const { id } = req.params;
    try {
      const consultationFound = await database.EZSP_T_CONSULTATIONS.findOne({
        where: { id: Number(id) },
      });

      if (!consultationFound) {
        res.status(404).send("Consultation not found");
      }

      res.send(consultationFound);
    } catch (error) {
      res.status(500).send("Internal server error!");
    }
  }

  static async createConsultation(req, res) {
    const consultation = {
      id_patient: req.userId,
      id_fono: req.body.fono,
      dt_consult: req.body.date,
      hr_consult: req.body.hour,
      dt_created: new Date(),
      dt_updated: new Date(),
    };

    try {
      const newConsultation = await database.EZSP_T_CONSULTATIONS.create(consultation);
      res.status(201).send(newConsultation);
    } catch (error) {
      res.status(500).send("Internal server error!");
    }
  }

  static async updateConsultation(req, res) {
    const { id } = req.params;

    const consultation = {
      id_patient: req.userId,
      id_fono: req.body.fono,
      dt_consult: req.body.date,
      hr_consult: req.body.hour,
      dt_updated: new Date(),
    };

    try {
      const consultationFound = await database.EZSP_T_CONSULTATIONS.findOne({
        where: { id: Number(id) },
      });

      if (!consultationFound) {
        return res.status(404).send("Consultation not found");
      }

      await database.EZSP_T_CONSULTATIONS.update(consultation, { where: { id: Number(id) } });

      const newConsultation = await database.EZSP_T_CONSULTATIONS.findOne({
        where: { id: Number(id) },
      });

      res.send(newConsultation);
    } catch (error) {
      res.status(500).send("Internal server error!");
    }
  }

  static async deleteConsultation(req, res) {
    const { id } = req.params;

    try {
      const consultationFound = await database.EZSP_T_CONSULTATIONS.findOne({where: { id: Number(id)}});

      if (!consultationFound) {
        return res.status(404).send("Consultation not found");
      }

      await database.EZSP_T_CONSULTATIONS.destroy({ where: { id: Number(id) } });

      res.send(`Consultation ${consultationFound.ds_name} delete successful!`);
    } catch (error) {
      res.status(500).send("Internal server error!");
    }
  }
}

module.exports = ConsultationController;
