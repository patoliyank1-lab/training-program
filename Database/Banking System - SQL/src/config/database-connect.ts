import { Sequelize } from "sequelize-typescript";
import { Logger } from "../middlewares/logger.js";
import { lodVariable } from "./dotenv.js";
import { User } from "../models/user-model.js";
import { Account } from "../models/account-model.js";
import { Transaction } from "../models/transaction-model.js";

const database = lodVariable("PG_DATABASE");
const user = lodVariable("PG_USER");
const password = lodVariable("PG_PASSWORD");
const host = lodVariable("PG_HOST");
const port = Number(lodVariable("PG_PORT"));

let sequelize: Sequelize | null = null;

export async function connectDB() {
  try {

    if (!sequelize) {
      sequelize = new Sequelize({
        dialect: "postgres",
        database,
        username: user,
        password,
        host,
        port,
        logging: false,
        models: [User, Account, Transaction],
      });
    }

    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    Logger.info("Database connected successfully.");

    return sequelize;
  } catch (error) {
    console.log(error);
    
    Logger.error("Database connection failed:", error);
    process.exit(1); // Fail fast in production
  }
}

export { sequelize };
