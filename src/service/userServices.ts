import userRepositories from "repositories/userRepositories";
import bcrypt from "bcrypt";
import { UserCreate } from "interfaces/UserCreate";

async function create({ name, email, password }: UserCreate): Promise<void> {
  const hashPassword: string = await bcrypt.hash(password, 10);
  await userRepositories.create({ name, email, password: hashPassword });
}

export default {
  create,
};
