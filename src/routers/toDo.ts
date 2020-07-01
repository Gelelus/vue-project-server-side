import { Router } from "express";

import TodoController from "../controllers/todo-controller";

const router = Router();

router.get("/", TodoController.getTodos); 
router.get("/:id", TodoController.getTodo); 


router.post("/",  TodoController.addTodo); 

router.put("/",  TodoController.updateTodo); 

router.delete("/:id", TodoController.deleteTodo); 

export default router;
