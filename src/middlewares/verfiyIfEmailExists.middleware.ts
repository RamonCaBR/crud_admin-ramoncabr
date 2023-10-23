import { NextFunction, Request, Response } from "express";
import { QueryExists, User } from "../interfaces/users.interface";
import { QueryResult } from "pg";
import { client } from "../database";
import AppError from "../errors/App.error";

export const verfiyIfEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email }: User = req.body;

  const queryString: string = `SELECT EXISTS (SELECT 1 FROM "users" WHERE email = $1);`;

  const { rows }: QueryResult<QueryExists> = await client.query(queryString, [
    email,
  ]);

  if (rows[0].exists) throw new AppError("Email already exists.", 409);

  return next();
};
