import { Router } from 'express';
import { auth } from '../middlewares/auth';
import usersRouter from './users';
import cardsRouter from './cards';
import { createUser, login, logout } from '../controllers/users'; 
import { NotFoundError } from '../errors/not-found-error'; 
import { celebrate, Joi, Segments } from 'celebrate';
import { ErrorMessages, urlPattern, UserDefaults } from '../constants';


const router = Router();

router.post('/signup', celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).default(UserDefaults.DEFAULT_NAME),
    about: Joi.string().min(2).max(200).default(UserDefaults.DEFAULT_ABOUT),
    avatar: Joi.string().pattern(urlPattern).default(UserDefaults.DEFAULT_AVATAR),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signout', logout);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (_req, _res, next) => {
  next(new NotFoundError(ErrorMessages.PAGE_NOT_FOUND_ERROR));
});

export default router;
