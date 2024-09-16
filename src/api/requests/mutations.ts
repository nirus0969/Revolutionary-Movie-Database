import { gql } from '@apollo/client';
import { SMALL_MOVIE_FRAGMENT } from './fragments.ts';

export const CREATE_USER = gql`
  mutation InsertUser($user: UserInput!) {
    insertUser(user: $user) {
      _id
      username
    }
  }
`;

export const UPDATE_RATING = gql`
  mutation UpdateRating($ratingInput: RatingInput!) {
    changeRating(ratingInput: $ratingInput)
  }
`;

export const ADD_TO_WATCHLIST = gql`
  mutation addMovieToWatchList($userId: String!, $movieId: String!) {
    addMovieToWatchList(userId: $userId, movieId: $movieId) {
      _id
      watchlist {
        ...SmallMovieFields
      }
    }
  }
  ${SMALL_MOVIE_FRAGMENT}
`;

export const REMOVE_FROM_WATCHLIST = gql`
  mutation removeMovieFromWatchList($userId: String!, $movieId: String!) {
    removeMovieFromWatchList(userId: $userId, movieId: $movieId) {
      _id
      watchlist {
        ...SmallMovieFields
      }
    }
  }
  ${SMALL_MOVIE_FRAGMENT}
`;
