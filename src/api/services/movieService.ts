import client from '../client.ts';
import { GET_ALL_GENRES, GET_MOVIE, GET_MOVIES } from '../requests/queries.ts';
import { BigMovieData, Genre, Movies } from '../../types/gqlResponses.ts';
import { PaginatedMovieFilter } from '../../types/gqlRequestBody.ts';

type GenreResponse = {
  allGenres: Genre[];
};

export async function fetchGenres(upperLimit: number): Promise<Genre[]> {
  try {
    const { data } = await client.query<GenreResponse>({
      query: GET_ALL_GENRES,
      variables: { upper_limit: upperLimit },
    });
    return data.allGenres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
}

type MovieResponse = {
  movie: BigMovieData;
};

export async function getMovieById(id: string): Promise<BigMovieData> {
  try {
    const { data } = await client.query<MovieResponse>({
      query: GET_MOVIE,
      variables: { movieId: id },
    });
    return data.movie;
  } catch (error) {
    console.error(`Error fetching movie with id ${id}: `, error);
    throw error;
  }
}

type MoviesResponse = {
  movies: Movies;
};

export async function getMoviesWithFilter(
  options: PaginatedMovieFilter
): Promise<Movies> {
  try {
    const { data } = await client.query<MoviesResponse>({
      query: GET_MOVIES,
      variables: {
        limit: options.limit,
        page: options.page,
        genres: options.genres,
        search: options.search,
        ascDesc: options.ascDesc,
        sortParam: options.sortParam,
      },
    });

    return data.movies;
  } catch (error) {
    console.error('Error fetching movies with filters:', error);
    throw error;
  }
}
