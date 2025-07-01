import { Model, model, Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { urlPattern, UserDefaults } from '../constants';

export interface IUser extends Document {
  about: string;
  avatar: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  about: {
    default: UserDefaults.DEFAULT_ABOUT,
    maxlength: 200,
    minlength: 2,
    required: false,
    type: String,
  },
  avatar: {
    default: UserDefaults.DEFAULT_AVATAR,
    required: false,
    type: String,
    validate: {
      validator: (avatar: string) => urlPattern.test(avatar),
      message: 'Некорректная ссылка на фото профиля',
    },
  },
  name: {
    default: UserDefaults.DEFAULT_NAME,
    maxlength: 30,
    minlength: 2,
    required: false,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
    validate: {
      validator: (email: string) => isEmail(email),
      message: 'Некорректный email',
    },
  },
  password: {
    required: true,
    type: String,
    select: false, // не возвращать по умолчанию
  },
});
 
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default model<IUser, Model<IUser>>('user', userSchema);
