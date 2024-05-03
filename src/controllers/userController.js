const database = require("../models");
const bcrypt = require("bcrypt");

class UserController {
  static async findAllUsers(req, res) {
    try {
      const usersFound = await database.EZSP_T_USERS.findAll();

      if (!usersFound) {
        res.status(404).send("Anyone user registered!");
      }

      res.status(200).send(usersFound);
    } catch (e) {
      res.status(500).send("Internal server error!");
    }
  }

  static async findUserById(req, res) {
    const { id } = req.params;
    try {
      const userFound = await database.EZSP_T_USERS.findOne({
        where: { id: Number(id) },
      });

      if (!userFound) {
        res.status(404).send("User not found!");
      }

      res.status(200).send(userFound);
    } catch (e) {
      res.status(500).send("Internal server error!");
    }
  }

  static async createUser(req, res) {
    const user = {
      ds_email: req.body.email,
      ds_password: await bcrypt.hash(req.body.password, 10),
      nr_crm: req.body.crm,
      dt_created: new Date(),
      dt_updated: new Date(),
    };

    try {
      const newUser = await database.EZSP_T_USERS.create(user);
      res.status(201).send(newUser);
    } catch (e) {
      res.status(500).send("Internal server error!");
    }
  }

  // static async login(req, res) {
  //   const email = req.body.email;
  //   const password = await bcrypt.hash(req.body.password, 10);

  //   try {
  //     const userExisted = database.EZSP_T_USERS.findOne({
  //       where: { ds_email: email },
  //     });

  //     if (!userExisted) {
  //       return res.status(404).send("Email not exist!");
  //     }

  //     const passwordExisted = database.EZSP_T_USERS.findOne({
  //       where: { ds_password: password },
  //     });

  //     if (!passwordExisted) {
  //       return res.status(404).send("Password not exist");
  //     }

  //     res.send("Successful");
  //   } catch (error) {
  //     res.status(500).send("Internal server error");
  //   }
  // }

  static async updateUser(req, res) {
    const { id } = req.params;
    const user = {
      ds_email: req.body.email,
      ds_password: req.body.password,
      nr_crm: req.body.crm,
      dt_updated: new Date(),
    };
    try {
      const userFound = await database.EZSP_T_USERS.findOne({
        where: { id: Number(id) },
      });

      if (!userFound) {
        return res.status(404).send("User not found!");
      }

      await database.EZSP_T_USERS.update(user, {
        where: { id: Number(userFound.id) },
      });

      const newUser = await database.EZSP_T_USERS.findOne({
        where: { id: Number(id) },
      });

      res.status(200).send(newUser);
    } catch (e) {
      res.status(500).send("Internal server error!");
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const userFound = await database.EZSP_T_USERS.findOne({
        where: { id: Number(id) },
      });

      if (!userFound) {
        res.status(404).send("User not found!");
      }

      await database.EZSP_T_USERS.destroy({
        where: { id: Number(userFound.id) },
      });

      res.status(200).send(`User ${userFound.ds_email} delete successful!`);
    } catch (error) {
      res.status(500).send("Internal server error!");
    }
  }
}

module.exports = UserController;
