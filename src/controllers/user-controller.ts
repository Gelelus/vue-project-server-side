import service from "../services/user-service";
import { RequestHandler } from "express";

class UserController {
  constructor() {}
  static addUser: RequestHandler = async (req, res) => {
    try {
      const result = await service.addUser(req.body);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static deleteUser: RequestHandler = async (req, res) => {
    try {
      const result = await service.delUser(req.params.id);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static updateUser: RequestHandler = async (req, res) => {
    try {
      const result = await service.updateUser(req.body, req.user);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static getUser: RequestHandler = async (req, res) => {
    try {
      const result = await service.getUser(req.params.id);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static getAllUser: RequestHandler = async (_req, res) => {
    try {
      const result = await service.getAllUser();
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static login: RequestHandler = async (req, res) => {
    try {
      const result = await service.login(req.body);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };
}

export default UserController;
