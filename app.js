import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import redis from 'redis';
import connectRedis from 'connect-redis';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const redisStore = connectRedis(session);

const client = redis.createClient(process.env.REDIS_PORT);
