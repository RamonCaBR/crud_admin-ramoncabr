import { Router } from "express";
import { bodyValidation } from "../middlewares/bodyValidation.middleware";
import { createUserSchema } from "../schemas/courses.schema";
import {
  createCourseController,
  getAllCoursesController,
  registerUserController,
} from "../controllers/courses.controller";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { tokenValidation } from "../middlewares/tokenValidation.middleware";
import { verifyIfUserExists } from "../middlewares/verifyIfUserExists.middleware";
import { verifyIfCourseExists } from "../middlewares/verifyIfCourseExists.middleware";

export const coursesRoutes: Router = Router();

coursesRoutes.post(
  "/",
  tokenValidation,
  bodyValidation(createUserSchema),
  isAdmin,
  createCourseController
);
coursesRoutes.get("/", getAllCoursesController);
coursesRoutes.post(
  "/:courseId/users/:userId",
  tokenValidation,
  isAdmin,
  verifyIfUserExists,
  verifyIfCourseExists,
  registerUserController
);
