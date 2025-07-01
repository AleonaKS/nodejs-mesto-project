import { StatusCodes } from '../constants/status-codes';

export class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}