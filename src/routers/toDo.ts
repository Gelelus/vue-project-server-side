import { Router } from "express";

import TodoController from "../controllers/todo-controller";
import auth from "../middleware/auth";
import validation from "../middleware/validation";
import Todo from "../dtos/todo.dto";

const router = Router();

router.get("/", auth, TodoController.getTodos);
router.get("/:id", auth, TodoController.getTodo);

router.post("/", auth, validation(Todo), TodoController.addTodo);

router.put("/", auth, validation(Todo), TodoController.updateTodo);

router.delete("/:id", auth, TodoController.deleteTodo);

export default router;
