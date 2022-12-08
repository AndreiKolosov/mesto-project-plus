import { Schema, Date } from 'mongoose';

export interface ICardModel {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}
