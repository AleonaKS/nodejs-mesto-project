import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { urlPattern, UserDefaults } from '../constants';

import {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} from '../controllers/users'; 

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().pattern(urlPattern).required(),
  }),
}), updateUserAvatar);


export default router;
