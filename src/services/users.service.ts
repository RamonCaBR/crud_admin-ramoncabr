import { QueryResult } from "pg";
import { CreateUser, UserRes } from "../interfaces/users.interface";
import { client } from "../database";
import format from "pg-format";

export const createUserService = async (data: CreateUser): Promise<UserRes> => {
  const queryFormat: string = format(
    `INSERT INTO "users" (%I) VALUES (%L) RETURNING name, email, admin;`,
    Object.keys(data),
    Object.values(data)
  );

  const query: QueryResult<UserRes> = await client.query(queryFormat);

  return query.rows[0];
};
