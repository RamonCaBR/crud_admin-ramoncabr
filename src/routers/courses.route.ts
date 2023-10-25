import { Router } from "express";
import { bodyValidation } from "../middlewares/bodyValidation.middleware";
import { createUserSchema } from "../schemas/courses.schema";
import {
  createCourseController,
  deactivateUserController,
  getAllCoursesController,
  registerUserController,
} from "../controllers/courses.controller";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { tokenValidation } from "../middlewares/tokenValidation.middleware";
import { verifyIfUserExists } from "../middlewares/verifyIfUserExists.middleware";
import { verifyIfCourseExists } from "../middlewares/verifyIfCourseExists.middleware";

export const coursesRoutes: Router = Router();

coursesRoutes.get("/", getAllCoursesController);

coursesRoutes.use(tokenValidation, isAdmin);

coursesRoutes.post(
  "/",
  bodyValidation(createUserSchema),
  createCourseController
);

coursesRoutes.post(
  "/:courseId/users/:userId",
  verifyIfUserExists,
  verifyIfCourseExists,
  registerUserController
);
coursesRoutes.delete(
  "/:courseId/users/:userId",
  verifyIfUserExists,
  verifyIfCourseExists,
  deactivateUserController
);
