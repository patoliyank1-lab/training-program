import { Redis } from "ioredis";
import { Logger } from "../middlewares/logger.js";

const redis = new Redis();

redis.on("error", (error) => Logger.error(error));
redis.on("connect", () => {
  Logger.info("redis Connected successfully!");
});

// Get key data from Redis cache
async function getCache(key: any) {
  try {
    const cacheData = await redis.get(key);
    if(cacheData){
        Logger.info(`get Cache in key : ${key}`);
    }
    return cacheData;
  } catch (err) {
    Logger.info(`fail to get Cache in key : ${key}`);

    return null;
  }
}

// Set Redis cache Key with a given expiry
function setCache(key: any, data: any) {
  try {
    redis.set(key, JSON.stringify(data));
    Logger.info(`set Cache in key : ${key}`);
  } catch (err) {
    Logger.info(`fail to set Cache in key : ${key}`);
    return null;
  }
}

// Remove given Redis cache key
function removeCache(key: any) {
  try {
    redis.del(key);
  } catch (err) {
    return null;
  }
}

export async function deleteKeysByPattern(pattern:any) {
  let keys = await redis.keys(`${pattern}*`);
  keys.forEach((key) => {
    redis.del(key)
  });
  Logger.info(`Remove all cash data from ${pattern}`)
}

export { getCache, setCache, removeCache };
