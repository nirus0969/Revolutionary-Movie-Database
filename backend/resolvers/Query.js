import { movie } from '../models/Movie.js';
import { user } from '../models/User.js';
import { rating } from '../models/Rating.js';
import bcrypt from 'bcrypt';

const Query = {
  async allGenres(_, args) {
    const upper_limit = args.upper_limit ? args.upper_limit : 100;

    const distinctGenres = await movie.distinct(
      'genres',
      {},
      { collation: { locale: 'en' } }
    );

    const uniqueGenres = [
      ...new Map(distinctGenres.map((item) => [item.id, item])).values(),
    ];

    return uniqueGenres.slice(0, upper_limit);
  },
  movie(_, args) {
    return movie.findById(args.movieId).exec();
  },
  async getUserWatchlist(_, args) {
    const skip = args.limit * args.page;

    const foundUser = await user.findOne({ _id: args.userId }).select('watchlist').exec();
    if (!foundUser || !foundUser.watchlist) {
      return { watchlist: [], totalCount: 0 };
    }

    const movie_ids = foundUser.watchlist.slice(skip, skip + args.limit);
    const movies = await movie.find({ _id: { $in: movie_ids } });
    const totalCount = foundUser.watchlist.length;

    return { movies, totalCount };
  },
  movieInWatchlist: async (_, args) => {
    const userWithSearchString = await user.findOne({
      _id: args.userId,
      watchlist: { $in: [args.movieId] },
    });

    if (userWithSearchString) {
      return true;
    } else {
      return false;
    }
  },
  ratingsByUser(_, args) {
    const skip = args.limit * args.page;
    return rating.find({ userId: args.userId }).skip(skip).limit(args.limit).exec();
  },
  async verifyUser(_, { credentials }) {
    const { username, password } = credentials;

    const foundUser = await user.findOne({ username }).exec();

    if (foundUser) {
      const match = await bcrypt.compare(password, foundUser.password);
      if (match) {
        return { user: foundUser };
      }
    }
    return { error: 'Invalid username or password' };
  },
  async movies(_, args) {
    const skip = args.limit * args.page;
    const sort_param = args.sort_param ? args.sort_param : 'popularity';
    const asc_desc = args.asc_desc ? args.asc_desc : -1;

    let moviesQuery;
    if (sort_param === 'average_rating') {
      moviesQuery = movie.aggregate([
        {
          $addFields: {
            average_rating: {
              $cond: {
                if: { $eq: ['$vote_count', 0] },
                then: 0,
                else: { $divide: ['$vote_sum', '$vote_count'] },
              },
            },
          },
        },
      ]);
      if (args.genres) {
        moviesQuery.match({ 'genres.name': { $in: args.genres } });
      }
      if (args.search) {
        moviesQuery.match({ original_title: { $regex: args.search, $options: 'i' } });
      }
      moviesQuery.sort({ average_rating: asc_desc }).skip(skip).limit(args.limit);
    } else {
      const sort = {};
      sort[sort_param] = asc_desc;
      moviesQuery = movie.find();

      if (args.genres) {
        moviesQuery.where({ genres: { $elemMatch: { name: { $in: args.genres } } } });
      }
      if (args.search) {
        moviesQuery.find({ original_title: { $regex: args.search, $options: 'i' } });
      }

      moviesQuery.sort(sort).skip(skip).limit(args.limit);
    }

    const movies = await moviesQuery.exec();

    let countQuery = movie.find().lean();

    if (args.genres) {
      countQuery.where({ genres: { $elemMatch: { name: { $in: args.genres } } } });
    }
    if (args.search) {
      countQuery.find({ original_title: { $regex: args.search, $options: 'i' } });
    }

    const totalCount = await countQuery.countDocuments();

    return { movies, totalCount };
  },
};

export default Query;
