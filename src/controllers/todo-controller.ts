import service from "../services/todo-service";
import { RequestHandler } from "express";

class TodoController {
  constructor() {}

  static addTodo: RequestHandler = async (req, res) => {
    try {   
      const result = await service.addTodo(req.body);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static deleteTodo: RequestHandler = async (req, res) => {
    try {
      const result = await service.delTodo(req.params.id);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static updateTodo: RequestHandler = async (req, res) => {
    try {
      const result = await service.updateTodo(req.body);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

 

  static getTodo: RequestHandler = async (req, res) => {
    try {
      const result = await service.getTodo(req.params.id);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static getTodosOnMonth: RequestHandler = async (req, res) => {
    try {
      const result = await service.getMonthTodos(req.query);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static getTodos: RequestHandler = async (_req, res) => {
    try {
      const result = await service.getTodayTodos();
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  
}

export default TodoController;
