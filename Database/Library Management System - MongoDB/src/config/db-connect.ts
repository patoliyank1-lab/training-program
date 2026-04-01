import { connect } from "mongoose";
import { Logger } from "../middlewares/logger.js";
import { config } from "dotenv";

config();

const uri = process.env.MONGO_URL!;
export const connectDB = async () => {
  try {
    await connect(uri);
    Logger.info("MongoDB Connected successfully!");
  } catch (error: any) {
    Logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
