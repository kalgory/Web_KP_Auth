import * as express from 'express';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import * as Redis from 'ioredis';

function redisLoader(app: express.Application) {
  const RedisStore = connectRedis(session);
  const redisOption = {
    port: typeof process.env.REDIS_PORT !== 'undefined' ? +process.env.REDIS_PORT : 6379,
    host: process.env.REDIS_HOST ?? 'localhost',
  };
  const redisClient = new Redis(redisOption);

  const sessionSecret = process.env.REDIS_SECRET ?? false;

  if (sessionSecret === false) {
    throw new Error('Undefined Session Secret');
  }

  redisClient.on('connect', () => console.log('Redis Connect'));
  redisClient.on('ready', () => console.log('Redis Ready'));
  redisClient.on('reconnecting', () => console.log('Redis Reconnecting'));
  redisClient.on('end', () => console.log('Redis End'));
  redisClient.on('error', (error: NodeJS.ErrnoException) =>
    console.log(`Redis Error ${error.message}`),
  );

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: sessionSecret,
      resave: false,
    }),
  );
}

export default redisLoader;
