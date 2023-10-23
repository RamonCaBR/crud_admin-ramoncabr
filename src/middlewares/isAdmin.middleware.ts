import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database";
import { User } from "../interfaces/users.interface";
import AppError from "../errors/App.error";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userEmail = res.locals.email;

  const queryString: string = `SELECT * FROM users WHERE email = $1`;

  const { rows }: QueryResult<User> = await client.query(queryString, [
    userEmail,
  ]);

  const user: User = rows[0];

  if (!user.admin) throw new AppError("Insufficient permission", 403);

  return next();
};
