/*
NOTE: These types need to be identical to the ones specified in the api/requests/queries file.
 */

export type Genre = {
  name: string;
};

export type BigMovieData = {
  _id: string;
  genres: Genre[];
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
};

export type SmallMovieData = {
  _id: string;
  poster_path: string;
  original_title: string;
  vote_count: number;
  vote_average: number;
};

export type Movies = {
  movies: SmallMovieData[];
  totalCount: number;
};

export type User = {
  _id: string;
  username: string;
};

export type UserWithWatchList = {
  _id: string;
  watchlist: SmallMovieData[];
};
