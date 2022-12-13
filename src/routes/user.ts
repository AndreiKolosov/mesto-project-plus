import { Router } from 'express';
import { userAvatarValidator, userIdValidator, userProfileValidator } from '../utils/validators';
import {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getAuthUser,
} from '../controllers/user';

const router = Router();

router.get('/users', getUsers);
router.get('/users/me', getAuthUser);
router.get('/users/:userId', userIdValidator, getUserById);
router.patch('/users/me', userProfileValidator, updateProfile);
router.patch('/users/me/avatar', userAvatarValidator, updateAvatar);

export default router;
