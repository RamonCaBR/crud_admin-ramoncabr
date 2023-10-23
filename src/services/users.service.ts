import { QueryResult } from "pg";
import { CreateUser, UserRes } from "../interfaces/users.interface";
import { client } from "../database";
import format from "pg-format";

export const createUserService = async (data: CreateUser): Promise<UserRes> => {
  const queryFormat: string = format(
    `INSERT INTO "users" (%I) VALUES (%L)
    RETURNING id, name, email, admin`,
    Object.keys(data),
    Object.values(data)
  );

  const { rows }: QueryResult<UserRes> = await client.query(queryFormat);

  let user: UserRes = rows[0];

  if (!rows[0].admin)
    user = { id: rows[0].id, name: rows[0].name, email: rows[0].email };

  return user;
};
