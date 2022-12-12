import express, { json } from 'express';
import * as dotenv from 'dotenv';
import { join } from 'path';
import mongoose from 'mongoose';
import rootRouter from './routes';
import errorHandler from './middlewares/errorHandler';
import { createUser, login } from './controllers/user';
import auth from './middlewares/auth';

dotenv.config({ path: join(__dirname, '../', '.env') });

const {
  PORT = 3000,
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  NODE_ENV = 'development',
} = process.env;

const app = express();

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/mestodb`);

app.use(json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(rootRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`
    Server listening on port: ${PORT}
    DataBase host: ${DB_HOST}
    DataBase port: ${DB_PORT}
    App is running in ${NODE_ENV} mode
  `);
});
