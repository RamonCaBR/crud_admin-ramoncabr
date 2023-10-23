import { Request, Response } from "express";
import { CreateUser, User, UserRes } from "../interfaces/users.interface";
import { createUserService } from "../services/users.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response<UserRes>> => {
  const user: UserRes = await createUserService(req.body);

  return res.status(201).json(user);
};
