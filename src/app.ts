import express, { json } from 'express';
import mongoose from 'mongoose';
import fakeAuth from './middlewares/fakeAuth';
import userRoutes from './routes/user';
import cardRoutes from './routes/card';
import errorHandler from './middlewares/errorHandler';

const { PORT = 3000 } = process.env;
const app = express();
app.use(json());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(fakeAuth);
app.use(userRoutes);
app.use(cardRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущени на порту: ${PORT}`);
});
