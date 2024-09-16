import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ratingSchema = new Schema({
  _id: ObjectId,
  userId: ObjectId,
  movieId: ObjectId,
  rating: Number,
});

// Create index so a user cannot rate the same movie
ratingSchema.index({ userId: 1, movieId: 1 }, { unique: true });

const rating = mongoose.model('Rating', ratingSchema);

export { rating };
