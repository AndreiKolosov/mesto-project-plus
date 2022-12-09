import express, { json } from 'express';
import * as dotenv from 'dotenv';
import { join } from 'path';
import mongoose from 'mongoose';
import fakeAuth from './middlewares/fakeAuth';
import rootRouter from './routes';
import errorHandler from './middlewares/errorHandler';

dotenv.config({ path: join(__dirname, '../', '.env') });

const {
  PORT = 3000,
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  ENV = 'development',
} = process.env;

const app = express();

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/mestodb`);

app.use(json());
app.use(fakeAuth);
app.use(rootRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`
    Server listening on port: ${PORT}
    DataBase host: ${DB_HOST}
    DataBase port: ${DB_PORT}
    App is running in ${ENV} mode
  `);
});
