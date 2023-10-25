import format from "pg-format";
import {
  Course,
  CourseUsersRes,
  CreateCourse,
} from "../interfaces/courses.interface";
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

export const getAllCourseUsersServices = async (
  id: string
): Promise<CourseUsersRes[]> => {
  const queryString: string = `SELECT
  u.id "userId",
  u.name "userName",
  c.id "courseId",
  c.name "courseName",
  c.description "courseDescription",
  uc.active "userActiveInCourse"
  FROM courses c
  JOIN "userCourses" uc ON uc."courseId" = c.id
  JOIN users u ON u.id = uc."userId"
  WHERE c.id = $1;`;

  const { rows }: QueryResult<CourseUsersRes> = await client.query(
    queryString,
    [id]
  );

  return rows;
};
