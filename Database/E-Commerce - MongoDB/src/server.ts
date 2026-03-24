import express from "express";
import { connectDB } from "./config/db-connect.js";
import { Logger, pinoLog, winLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/error-handler.js";
import APIrouter from "./router/index-route.js";
import helmet from "helmet";
const app = express();

const port = process.env.PORT ?? 4000;
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(pinoLog);
app.use(winLogger);

// root route
app.use("/api", APIrouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Welcome to typescript backend!");
});

// Server setup
connectDB().then(() => {
  app.listen(port, function (err) {
    if (err) Logger.error(err);
    Logger.info(`Server is ruining on : http://localhost:${port}/`);
  });
});

export { app };
