import { Request, Response } from "express";
import { UserRes } from "../interfaces/users.interface";
import {
  createUserService,
  getAllUsersService,
} from "../services/users.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response<UserRes>> => {
  const user: UserRes = await createUserService(req.body);

  return res.status(201).json(user);
};

export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response<UserRes[]>> => {
  const users: UserRes[] = await getAllUsersService();

  return res.status(200).json(users);
};
