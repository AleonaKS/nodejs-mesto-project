import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../constants/status-codes';

interface ErrorWithStatus extends Error {
  statusCode?: number;
}

export default function errorHandler(
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { statusCode = StatusCodes.SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === StatusCodes.SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
  });
}
