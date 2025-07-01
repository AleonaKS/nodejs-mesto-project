import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import errorHandler from './middlewares/error-handler';
import { requestLogger } from './middlewares/request-logger';
import routes from './routes/index';
import { errors } from 'celebrate';

dotenv.config();

const {
  DB_NAME = 'mestodb',
  MONGO_HOST = 'mongodb://localhost:27017',
  PORT = 3000,
} = process.env;

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(`${MONGO_HOST}/${DB_NAME}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(routes);

app.use(errors()); 

app.use(errorHandler); 

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

