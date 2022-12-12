import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { BadRequestError, NotFoundError, ServerError } from '../errors';
import STATUS_CODES from '../utils/variables';
import User from '../models/user';
import { updateUser } from './helpers';

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => {
    if (!users) {
      throw new ServerError(
        'На сервере произошла ошибка.',
      );
    }

    res.send(users);
  })
  .catch(next);

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => res.status(STATUS_CODES.Ok).send(user))
    .catch((err) => {
      let customError = err;

      if (customError.name === 'CastError') {
        customError = new NotFoundError('Пользователь с указанным _id не найден.');
      }

      next(customError);
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.status(STATUS_CODES.Created).send(user))
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError') {
        customError = new BadRequestError(
          'Переданы некорректные данные при создании пользователя.',
        );
      }

      next(customError);
    });
};

export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const id = req.user._id;

  return updateUser(id, { name, about })
    .then((user) => res.status(STATUS_CODES.Ok).send(user))
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError') {
        customError = new BadRequestError('Переданы некорректные данные при обновлении профиля.');
      }

      if (customError.name === 'CastError') {
        customError = new NotFoundError('Пользователь с указанным _id не найден.');
      }

      next(customError);
    });
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const id = req.user._id;

  return updateUser(id, { avatar })
    .then((user) => res.status(STATUS_CODES.Ok).send(user))
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError') {
        customError = new BadRequestError('Переданы некорректные данные при обновлении аватара.');
      }

      if (customError.name === 'CastError') {
        customError = new NotFoundError('Пользователь с указанным _id не найден.');
      }

      next(customError);
    });
};
