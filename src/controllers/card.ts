import { ObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotFoundError, ServerError } from '../errors';
import Card from '../models/card';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => {
    if (!cards) {
      throw new ServerError('Произошла ошибка при получении списка постов. Попробуйте повторить позднее.');
    }

    res.send({ data: cards });
  })
  .catch(next);

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const id = req.user._id;

  return Card.create({ name, link, owner: id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError') {
        customError = new BadRequestError('Переданы некорректные данные при создании карточки.');
      }

      next(customError);
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId)
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => {
      let customError = err;

      if (customError.name === 'CastError') {
        customError = new NotFoundError('Карточка с указанным _id не найдена.');
      }

      next(customError);
    });
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const id = req.user._id;

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: id } },
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError') {
        customError = new BadRequestError('Переданы некорректные данные для постановки лайка.');
      }

      if (customError.name === 'CastError') {
        customError = new NotFoundError('Передан несуществующий _id карточки.');
      }

      next(customError);
    });
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const id = req.user._id as ObjectId;

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: id } },
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError') {
        customError = new BadRequestError('Переданы некорректные данные для снятия лайка.');
      }

      if (customError.name === 'CastError') {
        customError = new NotFoundError('Передан несуществующий _id карточки.');
      }

      next(customError);
    });
};
