import { model, Schema } from 'mongoose';
import { urlPattern } from '../constants';

type Card = {
  createdAt: Date;
  likes: Schema.Types.ObjectId[];
  link: string;
  name: string;
  owner: Schema.Types.ObjectId;
};

const cardSchema = new Schema<Card>({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link: string) => urlPattern.test(link),
      message: 'Некорректная ссылка на изображение карточки',
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

export default model<Card>('Card', cardSchema);
