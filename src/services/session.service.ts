import "dotenv/config";
import { QueryResult } from "pg";
import { Session } from "../interfaces/session.interface";
import { client } from "../database";
import { User } from "../interfaces/users.interface";
import AppError from "../errors/App.error";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const createSessionService = async (data: Session): Promise<string> => {
  const { email, password }: Session = data;

  const queryString: string = `SELECT * FROM users WHERE email = $1`;

  const { rows }: QueryResult<User> = await client.query(queryString, [email]);

  const user: User = rows[0];

  if (!user) throw new AppError("Wrong email/password", 401);

  const isPasswordValid: boolean = compareSync(password, user.password);

  if (!isPasswordValid) throw new AppError("Wrong email/password", 401);

  const token: string = sign(
    { email: user.email },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );

  return token;
};
