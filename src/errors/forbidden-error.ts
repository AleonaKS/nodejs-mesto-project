import { StatusCodes } from '../constants/status-codes';

export class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
    this.name = 'ForbiddenError';
  }
}

