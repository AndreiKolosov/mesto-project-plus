import express, { json } from 'express';
import * as dotenv from 'dotenv';
import { join } from 'path';
import mongoose from 'mongoose';
import rootRouter from './routes';
import errorHandler from './middlewares/errorHandler';
import { createUser, login } from './controllers/user';
import auth from './middlewares/auth';
import { DB_URL, MODE, SERVER_PORT } from './utils/config';

dotenv.config({ path: join(__dirname, '../', '.env') });

const app = express();

mongoose.connect(DB_URL);

app.use(json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(rootRouter);
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`
    Server listening on: ${SERVER_PORT}
    App is running in ${MODE} mode
  `);
});
