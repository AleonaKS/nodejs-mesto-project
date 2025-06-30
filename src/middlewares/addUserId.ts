import { NextFunction, Request, Response } from 'express';

import { AuthContext } from '../types/types';

const addUserId = (
  _req: Request,
  res: Response<unknown, AuthContext>,
  next: NextFunction,
) => {
  res.locals.user = {
    _id: '6862707fd78a3e14efd3b4e0',
  };
  next();
};

export default addUserId;
