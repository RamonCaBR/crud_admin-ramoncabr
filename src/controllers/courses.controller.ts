import { Request, Response } from "express";
import { Course } from "../interfaces/courses.interface";
import { createCourseService } from "../services/courses.service";

export const createCourseController = async (
  req: Request,
  res: Response
): Promise<Response<Course>> => {
  const course: Course = await createCourseService(req.body);

  return res.status(201).json(course);
};
