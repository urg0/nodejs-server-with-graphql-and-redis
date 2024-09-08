import logger from "../config/logger";
import redisClient from "../config/redis";

const DEFAULT_EXPIRATION_TIME = 3600; //one hour

export async function getOrSetCache<T>(
  key: string,
  dataRetriever: () => Promise<T>,
  ttl: number = DEFAULT_EXPIRATION_TIME
): Promise<T> {
  try {
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      logger.info(`Cache hit for key: ${key}`);
      return JSON.parse(cachedData) as T;
    }

    const freshData = await dataRetriever(); //fetched data from db
    await redisClient.set(key, JSON.stringify(freshData), {
      EX: ttl,
    });

    logger.info(`Cache miss for key: ${key}, data fetched and cached.`);
    return freshData;
  } catch (error) {
    logger.error(`Error with cache for key: ${key} - ${error}`);
    throw error;
  }
}
