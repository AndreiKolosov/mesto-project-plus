import { NextFunction, Request, Response } from 'express';
import { ICustomError } from '../types/error';

const errorHandler = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message = 'Произошла ошибка на сервере.' } = err;

  res
    .status(statusCode)
    .send({ message });
  return next();
};

export default errorHandler;
