import { Router } from "express";
import express from "express";

import * as router from "./export-router";

import options from "../middleware/options";


const mainRouter = Router();

mainRouter.use(express.json());
mainRouter.use(options);
mainRouter.use("/todo", router.toDoRouter);
mainRouter.use("/users", router.userRouter);

export default mainRouter;
