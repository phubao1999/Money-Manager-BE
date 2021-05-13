import { Request, Response } from "express";
import * as env from "../environments/enviroments";
import ResponseHelper from "./responseHelper";

const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PASSWORD || "",
  password: process.env.REDIS_PORT || 6379,
});

export default {
  cacheData(key: any, value: any) {
    return client.set(key, env.environment.redis_cache, value.toString());
  },
  getCacheData(key: string) {
    return client.get(key, (err: Error, reply: any) => {
      if (err) throw err;
      console.log(reply);
      return reply;
    });
  },
  cacheMiddleware(req: Request, res: Response, next: any) {
    const { dataKey } = req.params;

    client.get(dataKey, (err: Error, data: any) => {
      if (err) throw err;

      if (data !== null) {
        ResponseHelper.sendResponse(data, "Data Process Success");
      } else {
        next();
      }
    });
  },
};
