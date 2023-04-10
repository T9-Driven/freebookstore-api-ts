import userControllers from "controllers/userControllers";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/", userControllers.create)



