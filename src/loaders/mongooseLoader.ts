import * as mongoose from 'mongoose';

function mongooseLoader(): void {
  const dbUser: string | undefined = process.env.MONGO_USER;
  const dbPassword: string | undefined = process.env.MONGO_PASSWORD;
  const dbName: string | undefined = process.env.MONGO_DB_NAME;
  const dbHost: string | undefined = process.env.MONGO_HOST;
  const dbProtocol: string | undefined = process.env.MONGO_PROTOCOL;
  const connectStr = `${dbProtocol}://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
  mongoose.connect(connectStr, (err) => {
    if (err) {
      console.error('mongodb connection error', err);
    } else {
      console.log('mongodb connected');
    }
  });
}

export default mongooseLoader;
