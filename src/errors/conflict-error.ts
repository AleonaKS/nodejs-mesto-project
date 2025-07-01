import { StatusCodes } from '../constants/status-codes';

export class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}