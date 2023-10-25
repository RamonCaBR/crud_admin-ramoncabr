import { Request, Response } from "express";
import { Course } from "../interfaces/courses.interface";
import {
  createCourseService,
  deactivateUserService,
  getAllCoursesService,
  registerUserService,
} from "../services/courses.service";

export const createCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const course: Course = await createCourseService(req.body);

  return res.status(201).json(course);
};

export const getAllCoursesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allCourses: Course[] = await getAllCoursesService();

  return res.status(200).json(allCourses);
};

export const registerUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await registerUserService(req.params.userId, req.params.courseId);

  const message: string = "User successfully vinculed to course";

  return res.status(201).json({ message });
};

export const deactivateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deactivateUserService(req.params.userId, req.params.courseId);

  return res.sendStatus(204);
};
