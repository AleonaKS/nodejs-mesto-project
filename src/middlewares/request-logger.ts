import { NextFunction, Request, Response } from 'express';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'request.log', level: 'info' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const {
    method, url, body, query, cookies,
  } = req;

  const timestamp = new Date().toISOString();

  logger.info('Request received', {
    timestamp,
    method,
    url,
    body,
    query,
    cookies,
  });

  next();
};
