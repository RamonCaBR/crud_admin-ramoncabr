import { Router } from "express";
import { usersRoutes } from "./users.route";
import { coursesRoutes } from "./courses.route";

export const routes: Router = Router();

routes.use("/", usersRoutes);
routes.use("/courses", coursesRoutes);
