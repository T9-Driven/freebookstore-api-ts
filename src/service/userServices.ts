import userRepositories from "repositories/userRepositories";
import bcrypt from "bcrypt";
import { UserCreate } from "interfaces/UserCreate";
import { invalidCredentialsError } from "errors";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function create({ name, email, password }: UserCreate): Promise<void> {
  const hashPassword: string = await bcrypt.hash(password, 10);
  await userRepositories.create({ name, email, password: hashPassword });
}

async function signin(email: string, password: string): Promise<string> {
  const { rows: users } = await userRepositories.findByEmail(email);
  if (users.length === 0) throw invalidCredentialsError();
  const [user] = users;

  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) throw invalidCredentialsError();

  const token = jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: 86400,
  });
  return token;
}

export default {
  create,
  signin,
};
