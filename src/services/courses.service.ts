import format from "pg-format";
import { Course, CreateCourse } from "../interfaces/courses.interface";
import { QueryResult } from "pg";
import { client } from "../database";

export const createCourseService = async (
  data: CreateCourse
): Promise<Course> => {
  const queryFormat: string = format(
    `INSERT INTO "courses" (%I) VALUES (%L) RETURNING *`,
    Object.keys(data),
    Object.values(data)
  );

  const { rows }: QueryResult<Course> = await client.query(queryFormat);

  return rows[0];
};

export const getAllCoursesService = async (): Promise<Course[]> => {
  const queryString: string = "SELECT * FROM courses;";

  const { rows }: QueryResult<Course> = await client.query(queryString);

  return rows;
};

export const registerUserService = async (
  userId: string,
  courseId: string
): Promise<void> => {
  const queryString: string = `INSERT INTO "userCourses" ("userId", "courseId")
  VALUES ($1, $2);`;

  await client.query(queryString, [userId, courseId]);
};

export const deactivateUserService = async (
  userId: string,
  courseId: string
): Promise<void> => {
  const queryString: string = `UPDATE "userCourses" uc
  SET active = false
  WHERE uc."userId" = $1 AND uc."courseId" = $2;`;

  await client.query(queryString, [userId, courseId]);
};
