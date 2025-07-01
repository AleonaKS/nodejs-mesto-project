import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

import { UnauthorizedError, ConflictError, BadRequestError, NotFoundError, ValidationError } from '../errors';
import User from '../models/user';
import { AuthContext } from '../types/types';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';  
import { JWT_SECRET, ErrorMessages } from '../constants';


export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundError('Пользователь с таким идентификатором не найден');
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
}

export async function updateUserAvatar(
  req: Request,
  res: Response<unknown, AuthContext>,
  next: NextFunction,
) {
  try {
    const user = await User.findByIdAndUpdate(
      res.locals.user._id,
      { avatar: req.body.avatar },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!user) {
      throw new NotFoundError('Пользователь с таким идентификатором не найден');
    }

    res.send(user);
  } catch (err) {
    if (err instanceof Error.CastError) {
      next(new ValidationError('Некорректный тип данных'));
    } else if (err instanceof Error.ValidationError) {
      next(new ValidationError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

export async function updateUserInfo(
  req: Request,
  res: Response<unknown, AuthContext>,
  next: NextFunction,
) {
  try {
    const user = await User.findByIdAndUpdate(res.locals.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new NotFoundError('Пользователь с таким идентификатором не найден');
    }

    res.send(user);
  } catch (err) {
    if (err instanceof Error.CastError) {
      next(new ValidationError('Некорректный тип данных'));
    } else if (err instanceof Error.ValidationError) {
      next(new ValidationError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}


export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    res.status(201).send(user);  
  } catch (err: any) {
    if (err.code === 11000) { 
      next(new ConflictError(ErrorMessages.USER_ALREADY_EXISTS_ERROR));
    } else if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные при создании пользователя'));
    } else {
      next(err);
    }
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({ message: ErrorMessages.LOGIN_SUCCESS_MESSAGE });
  } catch (err) {
    next(err);
  }
}

export function logout(req: Request, res: Response) {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.status(200).json({ message: ErrorMessages.LOGOUT_SUCCESS_MESSAGE });
}

export async function getCurrentUser(
  req: Request,
  res: Response<unknown, AuthContext>,
  next: NextFunction,
) {
  try {
    const userId = res.locals.user._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError(ErrorMessages.USER_NOT_FOUND_ERROR);
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
}