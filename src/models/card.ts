import { Schema, model } from 'mongoose';
import validator from 'validator';
import { ICardModel } from '../types/card';

const cardSchema = new Schema<ICardModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link: string) {
        return validator.isURL(link, { require_protocol: true });
      },
      message: 'Передана невалидная ссылка',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
});

export default model<ICardModel>('card', cardSchema);
