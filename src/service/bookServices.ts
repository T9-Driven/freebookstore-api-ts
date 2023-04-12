import { BookCreate } from "interfaces/BookCreate";
import { conflictError, notFoundError } from "../errors/index";
import bookRepositories from "../repositories/bookRepositories";

async function create({ name, author, userId, available }: BookCreate) {
  const { rows: books } = await bookRepositories.findByName(name);
  if (books.length !== 0) throw conflictError("Book already exists");

  await bookRepositories.create({ name, author, userId, available });
}

async function findAll() {
  const { rows: books } = await bookRepositories.findAll();
  if (books.length === 0) throw notFoundError();
  return books;
}

async function takeBook(userId: number, bookId: number) {
  const {
    rows: [book],
    rowCount,
  } = await bookRepositories.findById(bookId);
  if (rowCount) throw notFoundError();
  if (!book.available) throw conflictError("Book not available");

  await bookRepositories.takeBook(userId, bookId);
}

async function findAllMyBooks(userId) {
  const { rows: books } = await bookRepositories.findAllMyBooks(userId);
  if (books.length === 0) throw notFoundError();

  return books;
}

export default {
  create,
  findAll,
  takeBook,
  findAllMyBooks,
};
