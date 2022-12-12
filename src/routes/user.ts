import { Router } from 'express';
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
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

export default router;
