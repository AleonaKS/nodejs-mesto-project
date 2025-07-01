import { NextFunction, Request, Response } from 'express';
import { Joi } from 'celebrate';
import { BadRequestError } from '../errors';
import { ErrorMessages, urlPattern, UserDefaults } from '../constants';

// User validators
const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).default(UserDefaults.DEFAULT_NAME),
  about: Joi.string().min(2).max(200).default(UserDefaults.DEFAULT_ABOUT),
  avatar: Joi.string().pattern(urlPattern).default(UserDefaults.DEFAULT_AVATAR),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(200),
});

const updateAvatarSchema = Joi.object({
  avatar: Joi.string().pattern(urlPattern).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Card validators
const createCardSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().uri().required(),
});

// ID validators
const objectIdSchema = Joi.string().hex().length(24);

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    return next(new BadRequestError(ErrorMessages.BAD_REQUEST_ERROR));
  }
  return next();
};

export const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return next(new BadRequestError(ErrorMessages.BAD_REQUEST_ERROR));
  }
  return next();
};

export const validateUpdateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateAvatarSchema.validate(req.body);
  if (error) {
    return next(new BadRequestError(ErrorMessages.BAD_REQUEST_ERROR));
  }
  return next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(new BadRequestError(ErrorMessages.BAD_REQUEST_ERROR));
  }
  return next();
};

export const validateCreateCard = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createCardSchema.validate(req.body);
  if (error) {
    return next(new BadRequestError(ErrorMessages.BAD_REQUEST_ERROR));
  }
  return next();
};

export const validateUserId = (req: Request, res: Response, next: NextFunction) => {
  const { error } = objectIdSchema.validate(req.params.userId);
  if (error) {
    return next(new BadRequestError(ErrorMessages.BAD_REQUEST_ERROR));
  }
  return next();
};

export const validateCardId = (req: Request, res: Response, next: NextFunction) => {
  const { error } = objectIdSchema.validate(req.params.cardId);
  if (error) {
    return next(new BadRequestError(ErrorMessages.BAD_REQUEST_ERROR));
  }
  return next();
};
