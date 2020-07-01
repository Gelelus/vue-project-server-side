import service from "../services/todo-service";
import { RequestHandler } from "express";

class TodoController {
  constructor() {}

  static addTodo: RequestHandler = async (req, res) => {
    try {   
      const result = await service.add(req.body);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static deleteTodo: RequestHandler = async (req, res) => {
    try {
      const result = await service.del(req.params.id);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static updateTodo: RequestHandler = async (req, res) => {
    try {
      const result = await service.update(req.body);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

 

  static getTodo: RequestHandler = async (req, res) => {
    try {
      const result = await service.get(req.params.id);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static getTodos: RequestHandler = async (_req, res) => {
    try {
      const result = await service.getAll();
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  
}

export default TodoController;
