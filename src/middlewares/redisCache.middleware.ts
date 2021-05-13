import { Request, Response } from "express";
import * as env from "../environments/enviroments";

const redis = require("redis");
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);

export default {
  cacheData(key: any, value: any) {
    return client.settex(key, env.environment.redis_cache, value);
  },
  cacheMiddleware(req: Request, res: Response, next: any) {
    const { dataKey } = req.params;

    client.get(dataKey, (err: Error, data: any) => {
      if (err) throw err;

      if (data !== null) {
        res.send({
          dataKey: data,
        });
      } else {
        next();
      }
    });
  },
};
