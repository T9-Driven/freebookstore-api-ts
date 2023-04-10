import { NextFunction, Request, Response } from "express";
import userServices from "service/userServices";
import { UserCreate } from "../interfaces/UserCreate";

async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const { name, email, password } = req.body as UserCreate;
  try {
    await userServices.create({ name, email, password });
    return res.sendStatus(201);
  } catch (err) {
    return next(err);
  }
}

export default {
  create,
};
