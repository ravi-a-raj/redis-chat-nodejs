"use strict";

import redis from "redis";
import promise from "bluebird";
import env from "node-env-file";

env("./.env");

//const REDIS_URL = process.env.REDIS_URL;
const REDIS_URL = "//redis-15193.c92.us-east-1-3.ec2.cloud.redislabs.com:15193";

promise.promisifyAll(redis.RedisClient.prototype);
promise.promisifyAll(redis.Multi.prototype);

export let client = () => {
    return new Promise((resolve, reject) => {
        let connector = redis.createClient(REDIS_URL);
		connector.auth("yVLS9KOWR9IVu83B3chy2zkFZnnUQK8K");
        connector.on("error", () => {
            reject("Redis Connection failed");
        });

        connector.on("connect", () => {
            resolve(connector);
        });
    });
};
