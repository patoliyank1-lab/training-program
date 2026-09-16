import express from "express";
import { connectDB } from "./config/db-connect.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { Logger, winLogger } from "./middlewares/logger.js";
import router from "./routes/index-route.js";

const port = process.env.PORT ?? 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(winLogger);

// root route
app.use("/api", router);
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
