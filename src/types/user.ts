import { Model, Document, ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
}

export interface IUserModel extends Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<Document<unknown, any, IUser>>;
}
