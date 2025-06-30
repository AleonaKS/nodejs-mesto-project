import { model, Schema } from 'mongoose';

interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    transform: (doc, ret) => ({
      name: ret.name,
      about: ret.about,
      avatar: ret.avatar,
      _id: ret._id,
    }),
  },
});

export default model<IUser>('user', userSchema);
