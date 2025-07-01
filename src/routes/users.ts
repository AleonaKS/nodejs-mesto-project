import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} from '../controllers/users';
import {
  validateUpdateUser,
  validateUpdateAvatar,
  validateUserId,
} from '../middlewares/validators';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateUpdateUser, updateUserInfo);
router.patch('/me/avatar', validateUpdateAvatar, updateUserAvatar);

export default router;
