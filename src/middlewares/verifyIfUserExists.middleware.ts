import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { QueryResult } from "pg";
import { User } from "../interfaces/users.interface";
import AppError from "../errors/App.error";

export const verifyIfUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const queryString: string = "SELECT * FROM users WHERE id = $1;";

  const { rows }: QueryResult<User> = await client.query(queryString, [
    req.params.userId,
  ]);

  if (rows.length === 0) throw new AppError("User/course not found", 404);

  return next();
};
