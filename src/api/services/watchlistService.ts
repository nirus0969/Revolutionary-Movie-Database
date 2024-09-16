import { Movies, UserWithWatchList } from '../../types/gqlResponses.ts';
import client from '../client.ts';
import { GET_USER_WATCHLIST, MOVIE_IN_WATCHLIST } from '../requests/queries.ts';
import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST } from '../requests/mutations.ts';

type UserWatchlistResponse = {
  getUserWatchlist: Movies;
};

export const getUserWatchlist = async (
  userId: string,
  limit: number,
  page: number
): Promise<Movies> => {
  try {
    const { data, errors } = await client.query<UserWatchlistResponse>({
      query: GET_USER_WATCHLIST,
      variables: {
        userId: userId,
        limit: limit,
        page: page,
      },
      //Apollo doesn't realize that the query should return a different result after the watchlist has been mutated.
      fetchPolicy: 'network-only',
    });

    if (errors) {
      console.error('Errors returned from the query:', errors);
    }

    console.log('data:', data);

    return data.getUserWatchlist;
  } catch (error) {
    console.error('Error fetching user watchlist:', error);
    throw error;
  }
};

type AddToWatchlistResponse = {
  addToWatchlist: UserWithWatchList;
};

export const addToWatchlist = async (
  userId: string,
  movieId: string
): Promise<UserWithWatchList | null> => {
  try {
    const { data } = await client.mutate<AddToWatchlistResponse>({
      mutation: ADD_TO_WATCHLIST,
      variables: { userId, movieId },
      refetchQueries: [
        {
          query: MOVIE_IN_WATCHLIST,
          variables: { userId, movieId },
        },
      ],
    });
    if (data && data.addToWatchlist) {
      return data.addToWatchlist;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error adding movie to watchlist:', error);
    throw error;
  }
};

type RemoveFromWatchlistResponse = {
  removeFromWatchlist: UserWithWatchList;
};

export const removeFromWatchlist = async (
  userId: string,
  movieId: string
): Promise<UserWithWatchList | null> => {
  try {
    const { data } = await client.mutate<RemoveFromWatchlistResponse>({
      mutation: REMOVE_FROM_WATCHLIST,
      variables: { userId, movieId },
      refetchQueries: [
        {
          query: MOVIE_IN_WATCHLIST,
          variables: { userId, movieId },
        },
      ],
    });

    if (data && data.removeFromWatchlist) {
      return data.removeFromWatchlist;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error removing movie from watchlist:', error);
    throw error;
  }
};

type MovieInWatchlistResponse = {
  movieInWatchlist: boolean;
};

export const isMovieInWatchlist = async (
  userId: string,
  movieId: string
): Promise<boolean> => {
  try {
    const { data } = await client.query<MovieInWatchlistResponse>({
      query: MOVIE_IN_WATCHLIST,
      variables: {
        userId: userId,
        movieId: movieId,
      },
    });

    return data.movieInWatchlist;
  } catch (error) {
    console.error('Error checking movie in watchlist:', error);
    throw error;
  }
};
