import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    _id: ObjectId,
    username: {
      type: String,
      unique: true,
    },
    password: String,
    created: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    watchlist: [String],
  },
  {
    versionKey: false,
  }
);

const user = mongoose.model('User', userSchema);

export { user };
