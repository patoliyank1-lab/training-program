import "reflect-metadata";
import express from "express";
import { Logger, winLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/error-handler.js";
import cookieParser from "cookie-parser";
import Router from "./routes/index-route.js";
const app = express();

const port = process.env.PORT ?? 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("trust proxy", true);

app.use(winLogger);

app.use("/api", Router);

app.get("/", (req, res) => {
  res.send("Welcome to typescript backend!");
});
app.use(errorHandler);

// Server setup

app.listen(port, function (err) {
  if (err) Logger.error(err);
  Logger.info(`Server is ruining on : http://localhost:${port}/`);
});

export { app };
