export const typeDefs = `#graphql

    type User {
        _id: ID!,
        username: String!,
        password: String!,
        watchlist: [Movie]!
    }

    type Rating {
        _id: ID!,
        userId: ID!,
        movieId: ID!,
        rating: Float!,
        rating_user: User!,
        rating_movie: Movie!
    }

    type Collection {
        id: Int!,
        name: String!,
        poster_path: String!,
        backdrop_path: String!
    }

    type Genre {
        id: Int!, 
        name: String!
    }

    type Company {
        name: String!, 
        id: Int!
    }

    type Country {
        iso_3166_1: String!,
        name: String! 
    }

    type Language {
        iso_639_1: String!, 
        name: String!
    }

    type Movie {
        _id: ID,
        adult: Boolean!,
        belongs_to_collection: Collection,
        budget: Int!,
        genres: [Genre]!,
        id: Int!,
        imdb_id: String!,
        original_language: String!,
        original_title: String!,
        overview: String,!
        popularity: Float!,
        poster_path: String!,
        production_companies: [Company]!,
        production_countries: [Country]!,
        release_date: String!,
        revenue: Int!,
        runtime: Int!,
        spoken_languages: [Language]!,
        vote_sum: Float!,
        vote_count: Int!,
        vote_average: Float!,
        movie_ratings: [Rating!]
    }

    type MoviesResponse {
        movies: [Movie!]
        totalCount: Int!
    }

    type Query {
        allGenres(upper_limit: Int): [Genre!]
        getUserWatchlist(userId: String!,limit: Int!,page: Int!) : MoviesResponse!
        movieInWatchlist(userId: String!, movieId: String!): Boolean!
        movie(movieId: String!): Movie
        verifyUser(credentials: UserInput!): UserVerificationResponse!
        ratingsByUser(userId: String!,limit: Int!,page: Int!): [Rating]
        movies(
            genres: [String],
            search: String,
            sort_param: String,
            asc_desc: Int,
            limit: Int!,
            page: Int!
        ): MoviesResponse!
    }

    type Mutation {
        removeRating(ratingId: String!): Movie
        insertUser(user : UserInput!): User
        changeRating(ratingInput : RatingInput): Boolean
        addMovieToWatchList(userId: String!, movieId: String!): User
        removeMovieFromWatchList(userId: String!, movieId: String!): User
    }

    input RatingInput {
        userId: String!, 
        movieId: String!,
        rating: Float!
    }

    input UserInput {
        username: String!,
        password: String!
    }

    type UserVerificationResponse {
        user: User
        error: String
    }
`;
