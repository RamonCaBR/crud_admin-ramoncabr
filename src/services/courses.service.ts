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
