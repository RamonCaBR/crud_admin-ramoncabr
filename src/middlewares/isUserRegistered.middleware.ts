import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database";
import { QueryExists } from "../interfaces/users.interface";
import AppError from "../errors/App.error";

export const isUserRegistered = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.id;

  const queryString: string = `SELECT EXISTS (SELECT 1 FROM "userCourses" WHERE "userId" = $1);`;

  const { rows }: QueryResult<QueryExists> = await client.query(queryString, [
    userId,
  ]);

  if (!rows[0].exists) throw new AppError("No course found", 404);

  return next();
};
