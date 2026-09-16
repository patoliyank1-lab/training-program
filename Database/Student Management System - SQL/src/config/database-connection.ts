import { Sequelize } from "sequelize-typescript";
import { Client } from "pg";
import { Logger } from "../middlewares/logger.js";
import { lodVariable } from "./dotenv.js";
import { Student } from "../model/student-model.js";
import { Course } from "../model/course-model.js";
import { Enrollment } from "../model/enrollments-model.js";

const database = lodVariable("PG_DATABASE");
const user = lodVariable("PG_USER");
const password = lodVariable("PG_PASSWORD");
const host = lodVariable("PG_HOST");
const port = Number(lodVariable("PG_PORT"));

async function ensureDatabaseExists() {
  const client = new Client({
    user,
    password,
    host,
    port,
    database: "postgres", // Default database for PostgreSQL
  });

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [database],
    );
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${database}"`);
      Logger.info(`Database "${database}" created.`);
    } else {
      Logger.info(`Database "${database}" already exists.`);
    }
  } catch (error) {
    Logger.error("Database creation failed:", error);
    throw error;
  } finally {
    await client.end();
  }
}
let sequelize: Sequelize | null = null;

export async function connectDB() {
  try {
    // Ensure DB exists before connecting
    await ensureDatabaseExists();

    if (!sequelize) {
      sequelize = new Sequelize({
        dialect: "postgres",
        database,
        username: user,
        password,
        host,
        port,
        logging: false,
        models: [Student, Course, Enrollment],
      });
    }

    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    Logger.info("Database connected successfully.");

    return sequelize;
  } catch (error) {
    Logger.error("Database connection failed:", error);
    process.exit(1); // Fail fast in production
  }
}

export { sequelize };
