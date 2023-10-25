import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { QueryResult } from "pg";
import { Course } from "../interfaces/courses.interface";
import AppError from "../errors/App.error";

export const verifyIfCourseExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const queryString: string = "SELECT * FROM courses WHERE id = $1;";

  const { rows }: QueryResult<Course> = await client.query(queryString, [
    req.params.courseId,
  ]);

  if (rows.length === 0) throw new AppError("User/course not found", 404);

  return next();
};
