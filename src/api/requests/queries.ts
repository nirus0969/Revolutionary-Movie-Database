import { gql } from '@apollo/client';
import { BIG_MOVIE_FRAGMENT, SMALL_MOVIE_FRAGMENT } from './fragments.ts';

export const GET_ALL_GENRES = gql`
  query AllGenres($upper_limit: Int) {
    allGenres(upper_limit: $upper_limit) {
      name
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($movieId: String!) {
    movie(movieId: $movieId) {
      ...BigMovieFields
    }
  }
  ${BIG_MOVIE_FRAGMENT}
`;

export const GET_MOVIES = gql`
  query GetMovies(
    $limit: Int!
    $page: Int!
    $genres: [String]
    $search: String
    $ascDesc: Int
    $sortParam: String
  ) {
    movies(
      limit: $limit
      page: $page
      genres: $genres
      search: $search
      asc_desc: $ascDesc
      sort_param: $sortParam
    ) {
      movies {
        ...SmallMovieFields
      }
      totalCount
    }
  }
  ${SMALL_MOVIE_FRAGMENT}
`;

export const GET_USER = gql`
  query UserByUsername($credentials: UserInput!) {
    verifyUser(credentials: $credentials) {
      user {
        _id
        username
      }
      error
    }
  }
`;

export const GET_USER_WATCHLIST = gql`
  query getUserWatchlist($userId: String!, $limit: Int!, $page: Int!) {
    getUserWatchlist(userId: $userId, limit: $limit, page: $page) {
      movies {
        ...SmallMovieFields
      }
      totalCount
    }
  }
  ${SMALL_MOVIE_FRAGMENT}
`;

export const MOVIE_IN_WATCHLIST = gql`
  query MovieInWatchlist($userId: String!, $movieId: String!) {
    movieInWatchlist(userId: $userId, movieId: $movieId)
  }
`;
