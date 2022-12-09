import { ObjectId } from 'mongoose';
import User from '../../models/user';
import Card from '../../models/card';

export const updateUser = (
  userId: string | ObjectId,
  fields: { name?: string; about?: string; avatar?: string },
) => {
  const { name, avatar, about } = fields;

  return User.findByIdAndUpdate(
    userId,
    { name, about, avatar },
    { new: true, runValidators: true },
  );
};

export const toggleLike = (
  cardId: string | ObjectId,
  userId: string | ObjectId,
  action: 'addLike' | 'removeLike',
) => {
  if (action === 'addLike') {
    return Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
  }
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId as ObjectId } },
    { new: true },
  );
};
