import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import connectToMongoDB from './config/db.js';
import { typeDefs } from './schema/schema.js';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import Movie from './resolvers/Movie.js';
import Rating from './resolvers/Rating.js';
import User from './resolvers/User.js';

await connectToMongoDB();

const resolvers = {
  Query,
  Mutation,
  Movie,
  Rating,
  User,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
