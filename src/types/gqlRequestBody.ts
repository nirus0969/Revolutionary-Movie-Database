export type MovieFilterOptions = {
  genres?: string[];
  search?: string;
  ascDesc?: number;
  sortParam?: string;
};

export type PaginationOptions = {
  limit: number;
  page: number;
};

export type PaginatedMovieFilter = MovieFilterOptions & PaginationOptions;

export type UserInput = {
  username: string;
  password: string;
};

export type RatingInput = {
  userId: string;
  movieId: string;
  rating: number;
};
