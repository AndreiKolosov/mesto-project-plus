import { Router } from 'express';
import { cardIdValidator, createCardValidator } from '../utils/validators';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/card';

const router = Router();

router.get('/cards', getCards);
router.post('/cards', createCardValidator, createCard);
router.delete('/cards/:cardId', cardIdValidator, deleteCard);
router.put('/cards/:cardId/likes', cardIdValidator, likeCard);
router.delete('/cards/:cardId/likes', cardIdValidator, dislikeCard);

export default router;
