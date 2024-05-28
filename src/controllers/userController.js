const database = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

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

    let permission = '';

    try {
      const userExisted = await database.EZSP_T_USERS.findOne({where: {ds_email: user.ds_email}});
      
      if(userExisted !== null){
        return res.status(409).send("User already exist!");
      }

      const newUser = await database.EZSP_T_USERS.create(user);

      if(user.nr_crm == null){
        await database.EZSP_T_PERMISSIONS.create({id_user: newUser.id, id_role: 1 });
        permission = await database.EZSP_T_ROLES.findOne({where: {id: 1}});
      } else {
        await database.EZSP_T_PERMISSIONS.create({id_user: newUser.id, id_role: 2 }); 
        permission = await database.EZSP_T_ROLES.findOne({where: {id: 2}});
      }

      res.status(201).send(user);
    } catch (e) {
      res.status(500).send("Internal server error!");
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const userExisted = await database.EZSP_T_USERS.findOne({
        where: { ds_email: email },
      });

      if (!userExisted) {
        return res.status(404).send(`User ${email} not exist!`);
      }

      const validPassword = await bcrypt.compare(
        password,
        userExisted.ds_password
      );

      if (validPassword !== true) {
        return res.status(404).send(`Password it's wrong`);
      }

      const token = jwt.sign({ userId: userExisted.id }, "easyspeak", {
        expiresIn: "1h",
      });

      const role = await database.EZSP_T_PERMISSIONS.findOne({where: {id_user: userExisted.id}});
      
      let permission;

      if(role?.id_role == 1) {
        permission = "Paciente";
      } else if (role?.id_role == 2){
        permission = "Fono";
      } else {
        permission = null;
      }

      res.send({token, role: permission});
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  static async validToken(req, res, next) {
    const token = req.headers['authorization'];

    console.log(token);

    if(!token) {
      return res.status(401).send({message: 'token not provided'});
    }

    jwt.verify(token, 'easyspeak', (err, decoded) => {
      if(err) {
        return res.status(401).send("Invalid token");
      }

      req.userId = decoded.userId;

      next();
    })
  }

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
