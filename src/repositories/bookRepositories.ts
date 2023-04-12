import { BookCreate } from "interfaces/BookCreate";
import connectionDb from "../config/database";

async function create({ name, author, userId, available }: BookCreate) {
  await connectionDb.query(
    `
        INSERT INTO books (name, author, "userId", available)
        VALUES ($1, $2, $3, $4);`,
    [name, author, userId, available]
  );
}

async function findAll() {
  return await connectionDb.query(`
      SELECT b.name, b.author FROM books b 
      JOIN users u ON b."userId" = u.id;
    `);
}

async function findByName(name: string) {
  return await connectionDb.query(
    `
          SELECT * FROM books 
          WHERE name = $1;
      `,
    [name]
  );
}

async function findById(id: number) {
  return await connectionDb.query(
    `
          SELECT * FROM books 
          WHERE id = $1;
      `,
    [id]
  );
}

async function takeBook(userId: number, bookId: number) {
  await connectionDb.query(
    `
      UPDATE books
      SET available = $1
      WHERE id = $2;
  `,
    [false, bookId]
  );

  await connectionDb.query(
    `
      INSERT INTO "myBooks" ("userId", "bookId")
      VALUES ($1, $2);
    `,
    [userId, bookId]
  );
}

async function findAllMyBooks(userId: number) {
  return await connectionDb.query(
    `
      SELECT u.name as "userName", b.name as "bookName", b.author as "bookAuthor" 
      FROM "myBooks" m
      JOIN users u ON m."userId" = u.id
      JOIN books b ON m."bookId" = b.id 
      WHERE u.id = $1;
  `,
    [userId]
  );
}

export default {
  create,
  findAll,
  findByName,
  takeBook,
  findAllMyBooks,
  findById,
};
