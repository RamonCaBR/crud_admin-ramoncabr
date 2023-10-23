import { Router } from "express";
import { bodyValidation } from "../middlewares/bodyValidation.middleware";
import { createUserSchema } from "../schemas/courses.schema";
import { createCourseController } from "../controllers/courses.controller";

export const coursesRoutes: Router = Router();

coursesRoutes.post(
  "/",
  bodyValidation(createUserSchema),
  createCourseController
);
