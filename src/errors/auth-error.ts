import { StatusCodes } from '../constants/status-codes';

export class AuthError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_AUTHORIZED;
  }
}
