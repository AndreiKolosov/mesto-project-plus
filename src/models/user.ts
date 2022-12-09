import { Schema, model } from 'mongoose';
import { urlRegex } from '../utils/validation';
import { IUserModel } from '../types/user';

const userSchema = new Schema<IUserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(link: string) {
        return urlRegex.test(link);
      },
      message: 'Переданна невалидная ссылка.',
    },
  },
}, {
  versionKey: false,
});

export default model<IUserModel>('user', userSchema);
