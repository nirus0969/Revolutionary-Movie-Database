import { rating } from '../models/Rating.js';

const Movie = {
  async movie_ratings(parent) {
    return rating.find({ movieId: parent._id });
  },
  async vote_average(parent) {
    if (parent.vote_count <= 0) {
      return 0;
    }
    return Number(parent.vote_sum / parent.vote_count);
  },
};

export default Movie;
