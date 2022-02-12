import express from 'express';

const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const sessionRouter = require('./route/session');

require('dotenv').config();

const client = redis.createClient(6379, 'localhost');

client.on('error', function (err) {
  console.log(`Connection Error[redis]${err}`);
});

client.on('connect', function () {
  console.log('Complete Connect To Redis');
});

const sessionInfo = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  store: new redisStore({
    client,
    ttl: 3600,
  }),
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionInfo));
app.use(bodyParser.json());

app.use('/session', sessionRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
