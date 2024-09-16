import { gql } from '@apollo/client';

export const SMALL_MOVIE_FRAGMENT = gql`
  fragment SmallMovieFields on Movie {
    _id
    poster_path
    original_title
    vote_count
    vote_average
  }
`;

export const BIG_MOVIE_FRAGMENT = gql`
  fragment BigMovieFields on Movie {
    _id
    genres {
      name
    }
    release_date
    runtime
    overview
    poster_path
    original_title
    vote_count
    vote_average
  }
`;
