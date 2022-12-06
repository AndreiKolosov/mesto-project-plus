import { ObjectId } from 'mongoose';
import { Request, Response } from 'express';

import Card from '../models/card';

export const getCards = (req: Request, res: Response) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch((err) => res.status(500).send({ message: err.message }));

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const id = req.user._id;

  return Card.create({ name, link, owner: id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId)
    .then(() => res.status(200).send({ message: 'success' }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const likeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const id = req.user._id;

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: id } },
    { new: true },
  )
    .then(() => res.status(200).send({ message: 'success' }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const dislikeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const id = req.user._id as ObjectId;

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: id } },
    { new: true },
  )
    .then(() => res.status(200).send({ message: 'success' }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
