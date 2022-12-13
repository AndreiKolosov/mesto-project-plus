import * as dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import { join } from 'path';
import { errors } from 'celebrate';
import { createUser, login } from './controllers/user';
import rootRouter from './routes';
import { DB_URL, MODE, SERVER_PORT } from './utils/config';
import errorHandler from './middlewares/errorHandler';
import { requestLogger, errorLogger } from './middlewares/logger';
import auth from './middlewares/auth';
import { signUpValidator, signInValidator } from './utils/validators';
import { NotFoundError } from './errors';

dotenv.config({ path: join(__dirname, '../', '.env') });

const app = express();

mongoose.connect(DB_URL);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(requestLogger);

app.post('/signin', signInValidator, login);
app.post('/signup', signUpValidator, createUser);

app.use(auth);
app.use(rootRouter);

app.use(() => {
  throw new NotFoundError('Error 404');
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`
    Server listening on: ${SERVER_PORT}
    App is running in ${MODE} mode
  `);
});
