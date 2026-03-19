import express from "express";
import swaggerUi from "swagger-ui-express";
import { Server as SocketIOServer } from 'socket.io';
import { connectDB } from "./config/db.connect.js";
import { Logger, pinoLog, winLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import router from "./route.js";
import helmet from "helmet";
import { imageRemoveCronJob } from "./utils/cron.js";
import { swaggerSpec } from "./swagger.js";
import { createServer } from "node:http";
import { handleSocketConnection } from "./controllers/socketCtr.js";
const app = express();

const port = process.env.PORT ?? 4000;
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(pinoLog);
app.use(winLogger);

const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
handleSocketConnection(io);

// root route
app.use("/", router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Welcome to typescript backend!");
});

imageRemoveCronJob("0 0 * * *");
// Server setup
connectDB().then(() => {
  app.listen(port, function (err) {
    if (err) Logger.error(err);
    Logger.info(`Server is ruining on : http://localhost:${port}/`);
  });
});

export { app };
