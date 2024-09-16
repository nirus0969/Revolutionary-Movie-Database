import { user } from '../models/User.js';
import { movie } from '../models/Movie.js';

const Rating = {
  async rating_user(parent) {
    return user.findById(parent.userId);
  },
  async rating_movie(parent) {
    return movie.findById(parent.movieId);
  },
};

export default Rating;
