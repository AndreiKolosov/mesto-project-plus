/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';

const { NODE_ENV, JWT_SECRET } = process.env;

const jwtSecret = NODE_ENV && JWT_SECRET && NODE_ENV === 'production' ? JWT_SECRET : 'dev-super-secret';

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};

export default auth;
