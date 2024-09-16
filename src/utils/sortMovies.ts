import { SmallMovieData } from '../types/gqlResponses';

export const sortMovies = (
  movies: SmallMovieData[],
  sortBy: string
): SmallMovieData[] => {
  switch (sortBy) {
    case 'vote_average':
      return [...movies].sort((a, b) => b.vote_average - a.vote_average);
    case 'title':
      return [...movies].sort((a, b) => a.original_title.localeCompare(b.original_title));
    case 'vote_count':
      return [...movies].sort((a, b) => b.vote_count - a.vote_count);
    case 'original_title':
      return [...movies].sort((a, b) => a.original_title.localeCompare(b.original_title));
    default:
      return movies;
  }
};
