import { user } from '../models/User.js';
import { movie } from '../models/Movie.js';

const User = {
  async watchlist(parent) {
    const foundUser = await user.findOne({ _id: parent._id }).select('watchlist').exec();
    if (!foundUser || !foundUser.watchlist) {
      return { watchlist: [], totalCount: 0 };
    }

    const movie_ids = foundUser.watchlist;
    const movies = await movie.find({ _id: { $in: movie_ids } });
    return movies;
  },
};

export default User;
