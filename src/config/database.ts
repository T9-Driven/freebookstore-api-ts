import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

type OptionsType = {
  connectionString: string;
  ssl: boolean;
};

const options: OptionsType = {
  connectionString: process.env.DATABASE_URL,
  ssl: false,
};

if (process.env.MODE === "PROD") options.ssl = true;

const connectionDb = new Pool(options);

export default connectionDb;
