import express from "express";
import { connectDB } from "./config/db.connect.js";
import { pinoLog, winLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import router from "./route.js";
const app = express();

const port = process.env.PORT ?? 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(pinoLog);
app.use(winLogger);

// root route
app.use("/", router);
app.use(errorHandler);

// Handling GET / Request
app.get("/", (req, res) => {
  res.send("Welcome to typescript backend!");
});

// Server setup
connectDB().then(() => {
  app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
  });
});
