import mongoose from 'mongoose';
import { movie } from '../models/Movie.js';
import { user } from '../models/User.js';
import { rating } from '../models/Rating.js';
import bcrypt from 'bcrypt';

const Mutation = {
  removeMovieFromWatchList: async (_, args) => {
    return user.findByIdAndUpdate(
      args.userId,
      { $pull: { watchlist: args.movieId } },
      { new: true }
    );
  },
  addMovieToWatchList: async (_, args) => {
    const found_movie = await movie.findById(args.movieId);

    if (found_movie) {
      try {
        const updatedUser = await user.findByIdAndUpdate(
          args.userId,
          { $addToSet: { watchlist: args.movieId } },
          { new: true }
        );
        if (!updatedUser) {
          return null;
        }
        return updatedUser;
      } catch (error) {
        console.error('Error adding to watchlist:', error);
        return null;
      }
    }
  },
  insertUser: async (_, args) => {
    try {
      const hashedPassword = await bcrypt.hash(args.user.password, 10);
      const newUser = new user({
        ...args.user,
        password: hashedPassword,
        _id: new mongoose.Types.ObjectId(),
        watchlist: [],
      });
      const existingUser = await user.findOne({ username: args.user.username });
      if (existingUser) {
        return null;
      }

      return await newUser.save();
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  },
  removeRating: async (_, args) => {
    const foundRating = await rating.findById(args.ratingId);

    const ratingMovie = await movie.findById(foundRating.movieId);
    if (ratingMovie) {
      await movie.findByIdAndUpdate(foundRating.movieId, {
        $inc: {
          vote_count: -1,
          vote_sum: -foundRating.rating,
        },
      });
    }
    try {
      await rating.findByIdAndDelete(args.ratingId);
      console.log('deletion worked');
    } catch {
      return null;
    }
    return movie.findById(foundRating.movieId);
  },
  changeRating: async (_, { ratingInput }) => {
    try {
      const existingRating = await rating.findOne({
        userId: new mongoose.Types.ObjectId(ratingInput.userId),
        movieId: new mongoose.Types.ObjectId(ratingInput.movieId),
      });

      if (existingRating) {
        const difference = ratingInput.rating - existingRating.rating;

        await rating.findByIdAndUpdate(
          existingRating._id,
          { $set: { rating: ratingInput.rating } },
          { new: true }
        );

        await movie.findByIdAndUpdate(ratingInput.movieId, {
          $inc: { vote_sum: difference },
        });
      } else {
        const newRating = new rating({
          ...ratingInput,
          _id: new mongoose.Types.ObjectId(),
        });

        await newRating.save();

        await movie.findByIdAndUpdate(ratingInput.movieId, {
          $inc: {
            vote_count: 1,
            vote_sum: ratingInput.rating,
          },
        });
      }

      return true;
    } catch (error) {
      console.error('Error updating rating:', error);
      return false;
    }
  },
};

export default Mutation;
