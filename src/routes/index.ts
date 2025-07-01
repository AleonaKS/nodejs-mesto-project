import { Router } from 'express';
import { auth } from '../middlewares/auth';
import usersRouter from './users';
import cardsRouter from './cards';
import { createUser, login, logout } from '../controllers/users';
import { validateCreateUser, validateLogin } from '../middlewares/validators';
import { NotFoundError } from '../errors/not-found-error';
import { ErrorMessages } from '../constants';

const router = Router();

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
router.post('/signout', logout);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (_req, _res, next) => {
  next(new NotFoundError(ErrorMessages.PAGE_NOT_FOUND_ERROR));
});

export default router;
