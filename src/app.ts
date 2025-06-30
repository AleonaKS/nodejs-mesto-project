import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { NotFoundError } from './errors';
import errorHandler from './middlewares/error-handler';
import addUserId from './middlewares/addUserId';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';

dotenv.config();

const {
  DB_NAME = 'mestodb',
  MONGO_HOST = 'mongodb://localhost:27017',
  PORT = 3000,
} = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(`${MONGO_HOST}/${DB_NAME}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(addUserId);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
