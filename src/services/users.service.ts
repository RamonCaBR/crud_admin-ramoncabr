import { QueryResult } from "pg";
import {
  CreateUser,
  UserCoursesRes,
  UserRes,
} from "../interfaces/users.interface";
import { client } from "../database";
import format from "pg-format";
import { hashSync } from "bcryptjs";

export const createUserService = async (data: CreateUser): Promise<UserRes> => {
  const hashedPassword: string = hashSync(data.password);

  data["password"] = hashedPassword;

  const queryFormat: string = format(
    `INSERT INTO "users" (%I) VALUES (%L)
    RETURNING id, name, email, admin`,
    Object.keys(data),
    Object.values(data)
  );

  const { rows }: QueryResult<UserRes> = await client.query(queryFormat);

  return rows[0];
};

export const getAllUsersService = async (): Promise<UserRes[]> => {
  const queryString: string = "SELECT id, name, email, admin FROM users;";

  const { rows }: QueryResult<UserRes> = await client.query(queryString);

  return rows;
};

export const getAllUserCoursesServices = async (id: string) => {
  const queryString: string = `SELECT
  c.id "courseId",
  c.name "courseName",
  c.description "courseDescription",
  uc.active "userActiveInCourse",
  u.id "userId",
  u.name "userName"
  FROM users u
  JOIN "userCourses" uc ON uc."userId" = u.id
  JOIN courses c ON c.id = uc."courseId"
  WHERE u.id = $1`;

  const { rows }: QueryResult<UserCoursesRes> = await client.query(
    queryString,
    [id]
  );

  return rows;
};
