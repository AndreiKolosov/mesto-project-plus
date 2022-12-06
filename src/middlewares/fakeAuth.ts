import { NextFunction, Request, Response } from 'express';

const fakeAuth = (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '638f5195be3b7d277143c3c6',
  };
  next();
};

export default fakeAuth;
