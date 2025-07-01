import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate'; 

import {
  createCard,
  deleteCard,
  dislikeCard,
  getCards,
  likeCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards); 

router.post('/', celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
}), createCard);

const idParamValidation = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
});

router.delete('/:id', idParamValidation, deleteCard);
router.put('/:id/likes', idParamValidation, likeCard);
router.delete('/:id/likes', idParamValidation, dislikeCard);

export default router;

