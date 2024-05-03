const database = require("../models");

class RoleController {
  static async findAllRoles(req, res) {
    try {
      const rolesFound = await database.EZSP_T_ROLES.findAll();

      if (!rolesFound) {
        res.status(404).send("Anyyone role registered!");
      }

      res.send(rolesFound);
    } catch (error) {
      res.status(500).send("Internal server error!");
    }
  }

  static async findRoleById(req, res) {
    const { id } = req.params;
    try {
      const roleFound = await database.EZSP_T_ROLES.findOne({
        where: { id: Number(id) },
      });

      if (!roleFound) {
        res.status(404).send("Role not found");
      }

      res.send(roleFound);
    } catch (error) {
      res.status(500).send("Internal server error!");
    }
  }

  static async createRole(req, res) {
    const role = {
      ds_name: req.body.name,
      dt_created: new Date(),
      dt_updated: new Date(),
    };

    try {
      const newRole = await database.EZSP_T_ROLES.create(role);
      res.status(201).send(newRole);
    } catch (error) {
      res.status(500).send("Internal server error!");
    }
  }

  static async updateRole(req, res) {
    const { id } = req.params;

    const role = {
      ds_name: req.body.name,
      dt_created: new Date(),
      dt_updated: new Date(),
    };

    try {
      const roleFound = await database.EZSP_T_ROLES.findOne({
        where: { id: Number(id) },
      });

      if (!roleFound) {
        return res.status(404).send("Role not found");
      }

      await database.EZSP_T_ROLES.update(role, { where: { id: Number(id) } });

      const newRole = await database.EZSP_T_ROLES.findOne({
        where: { id: Number(id) },
      });

      res.send(newRole);
    } catch (error) {
      res.status(500).send("Internal server error!");
    }
  }

  static async deleteRole(req, res) {
    const { id } = req.params;

    try {
      const roleFound = await database.EZSP_T_ROLES.findOne({where: { id: Number(id)}});

      if (!roleFound) {
        return res.status(404).send("Role not found");
      }

      await database.EZSP_T_ROLES.destroy({ where: { id: Number(id) } });

      res.send(`Role ${roleFound.ds_name} delete successful!`);
    } catch (error) {
      res.status(500).send("Internal server error!");
    }
  }
}

module.exports = RoleController;
