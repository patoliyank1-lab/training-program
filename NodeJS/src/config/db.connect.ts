import { connect } from "mongoose";
import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";
import { Logger } from "../middlewares/logger.js";
import { config } from "dotenv";

config();

const uri = process.env.MONGO_URL!;
const AdminName = process.env.ADMIN_NAME!;
const AdminEmail = process.env.ADMIN_EMAIL!;
const AdminUsername = process.env.ADMIN_USERNAME!;
const AdminPassword = process.env.ADMIN_PASSWORD!;
export const connectDB = async () => {
  try {
    await connect(uri);
    createAdmin();
    Logger.info("MongoDB Connected successfully!");
  } catch (error: any) {
    Logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const createAdmin = async () => {
  try {
    const Admin = await User.findOne({ role: "admin" });

    if (!Admin) {
      const newAdmin = new User({
        name: AdminName,
        email: AdminEmail,
        username: AdminUsername,
        password: await hashPassword(AdminPassword),
        role: "admin",
      });

      await newAdmin.save();
    }
  } catch (error) {
    Logger.error(error);
  }
};
