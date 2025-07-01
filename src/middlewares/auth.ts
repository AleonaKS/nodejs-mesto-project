import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthError } from '../errors/auth-error';
import { JWT_SECRET } from '../constants';

export interface AuthRequest extends Request {
  user?: { _id: string };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return next(new AuthError('Необходима авторизация'));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { _id: string };
    req.user = { _id: payload._id };
    res.locals.user = { _id: payload._id };
    next();
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
};
