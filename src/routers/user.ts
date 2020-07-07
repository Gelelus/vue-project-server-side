import { Router } from "express"

import validation from "../middleware/validation";
import validCreateUser from "../dtos/registration.dto"; 
import validLoginUser from "../dtos/login.dto";   
import auth from "../middleware/auth";
import UserController from "../controllers/user-controller";


const router = Router();

router.get("/:id", UserController.getUser); 
router.get("/", UserController.getAllUser); 

router.post("/", validation(validCreateUser),  UserController.addUser); 
router.post("/login",validation(validLoginUser) , UserController.login); 

router.put("/", auth, UserController.updateUser); 

router.delete("/:id", auth, UserController.deleteUser); 

export default router;
