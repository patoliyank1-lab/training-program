import type { Request, Response, NextFunction } from "express";
import pino from "pino";
import { pinoHttp } from "pino-http";
import winston from "winston";
import { v4 as uuidv4 } from "uuid";
import path from "node:path";

const transport = pino.transport({
  targets: [
    {
      target: "pino-roll",
      options: {
        file: path.join("logs", "app.log"),
        frequency: "daily", 
        mkdir: true, 
        dateFormat: "yyyy-MM-dd", 
      },
    },
  ],
});
export const logger = pino(
  {
    level: process.env.PINO_LOG_LEVEL || "info",
  },
  transport,
);

export const pinoLog = pinoHttp({
  logger: logger,
});

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = (): string => {
  return "debug";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf(
     
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const transports = [new winston.transports.Console()];

export const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export const winLogger = (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers["x-request-id"] || uuidv4();
  const { method, url, ip, headers } = req;
  const userAgent = headers["user-agent"];

  req.winLog = Logger.child({
    request_id: requestId,
  });

  req.winLog.info(
    `requestId:${requestId} method:${method}, url:${url}, ip:${ip} userAgent:${userAgent}`,
  );
  next();
};
