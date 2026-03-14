import rateLimit from "express-rate-limit";

const apiLimiter = (rate: number, min: number, route: string) =>
  rateLimit({
    windowMs: min * 60 * 1000,
    max: rate,
    handler: (req, res) => {
      throw new Error(`hit rate limits on ${route}`);
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

export default apiLimiter;
