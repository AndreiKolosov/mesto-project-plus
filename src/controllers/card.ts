import { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import STATUS_CODES from '../utils/variables';
import Card from '../models/card';
import { toggleLike } from './helpers';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ServerError,
} from '../errors';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => {
    if (!cards) {
      throw new ServerError('На сервере произошла ошибка.');
    }

    res.status(STATUS_CODES.Ok).send({ data: cards });
  })
  .catch(next);

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const id = req.user as ObjectId;

  return Card.create({ name, link, owner: id })
    .then((card) => res.status(STATUS_CODES.Created).send({ data: card }))
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
  const userId = req.user as JwtPayload;

  return Card.findOne({ _id: cardId })
    .then((card) => {
      const ownerId = String(card?.owner);

      if (userId?._id !== ownerId) {
        throw new ForbiddenError('Вы не являетесь владельцем карточки');
      }

      return Card.deleteOne({ _id: card?._id });
    })
    .then(() => res.status(STATUS_CODES.Ok).send({ message: 'Карточка удалена' }))
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
  const userId = req.user as ObjectId;

  return toggleLike(cardId, userId, 'addLike')
    .then((card) => res.status(STATUS_CODES.Ok).send(card))
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
  const userId = req.user as ObjectId;

  return toggleLike(cardId, userId, 'removeLike')
    .then((card) => res.status(STATUS_CODES.Ok).send(card))
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
