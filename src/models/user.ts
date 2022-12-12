import { Schema, model } from 'mongoose';
import validator from 'validator';
import { IUserModel } from '../types/user';

const userSchema = new Schema<IUserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email: string) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(link: string) {
        return validator.isURL(link, { require_protocol: true });
      },
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
}, {
  versionKey: false,
});

export default model<IUserModel>('user', userSchema);
