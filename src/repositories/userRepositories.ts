import connectionDb from "config/database";
import { UserCreate } from "interfaces/UserCreate";
import { QueryResult } from "pg";

async function create({ name, email, password }): Promise<void> {
  await connectionDb.query(
    `
          INSERT INTO users (name, email, password)
          VALUES ($1, $2, $3)
      `,
    [name, email, password]
  );
}

async function findById(id: number): Promise<QueryResult<UserCreate>> {
  return await connectionDb.query(
    `    
      SELECT * FROM users WHERE id=$1
    `,
    [id]
  );
}

export default {
  create,
  findById,
};
