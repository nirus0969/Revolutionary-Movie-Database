import { test, expect, beforeAll, afterAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Mutation from '../resolvers/Mutation.js';
import { user } from '../models/User.js';
import { movie } from '../models/Movie.js';
import { rating } from '../models/Rating.js';
import bcrypt from 'bcrypt';
import * as testData from './data/testData.json';

let mongoServer;
let testUser;
let testMovie;

// Create a new in-memory database before all tests run
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  testUser = new user(testData.testUser);
  await testUser.save();

  testMovie = new movie(testData.testMovie1);
  await testMovie.save();
});

// Clear all test data after all tests run
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('insertUser creates a new user', async () => {
  const args = {
    user: {
      username: 'nirulovesbjj',
      password: 'nirulovesbjj',
    },
  };
  const result = await Mutation.insertUser(null, args);
  expect(result.username).toBe(args.user.username);
  expect(bcrypt.compare(args.user.password, result.password)).toBeTruthy();
  expect(result.watchlist).toStrictEqual([]);

  const savedUser = await user.findOne({ username: args.user.username });
  expect(savedUser).not.toBeNull();
  expect(savedUser.username).toBe(args.user.username);
  expect(bcrypt.compare(args.user.password, savedUser.password)).toBeTruthy();
});

test('addMovieToWatchlist can add movies to watchlist', async () => {
  const args = {
    userId: testUser._id.toString(),
    movieId: testMovie._id.toString(),
  };
  const result = await Mutation.addMovieToWatchList(null, args);
  expect(result.username).toBe(testUser.username);
  expect(result.password).toBe(testUser.password);
  expect(result.watchlist).toContain(args.movieId);

  const foundUser = await user.findById(args.userId);
  expect(foundUser.watchlist).toContain(args.movieId);
});

test('removeMovieFromWatchList can remove movies from watchlist', async () => {
  const args = {
    userId: testUser._id.toString(),
    movieId: '654cc5a088fa512d3951aaab',
  };
  const result = await Mutation.removeMovieFromWatchList(null, args);
  expect(result.username).toBe(testUser.username);
  expect(result.password).toBe(testUser.password);
  expect(result.watchlist).not.toContain(args.movieId);

  const foundUser = await user.findById(args.userId);
  expect(foundUser.watchlist).not.toContain(args.movieId);
});

test('changeRating can insert a rating for a movies', async () => {
  const args = {
    ratingInput: {
      userId: testUser._id.toString(),
      movieId: testMovie._id.toString(),
      rating: 4.0,
    },
  };
  const result = await Mutation.changeRating(null, args);
  expect(result).toBe(true);

  const savedRating = await rating.findOne({
    userId: args.ratingInput.userId,
    movieId: args.ratingInput.movieId,
  });
  expect(savedRating.userId.toString()).toBe(args.ratingInput.userId);
  expect(savedRating.movieId.toString()).toBe(args.ratingInput.movieId);
  expect(savedRating.rating).toBe(4.0);

  const foundMovie = await movie.findById(args.ratingInput.movieId);
  expect(foundMovie.vote_count).toBe(testMovie.vote_count + 1);
  expect(foundMovie.vote_sum).toBe(testMovie.vote_sum + 4.0);
});

test('changeRating can change a rating for a movies', async () => {
  const args = {
    ratingInput: {
      userId: testUser._id.toString(),
      movieId: testMovie._id.toString(),
      rating: 3.1,
    },
  };

  const foundMovie_before = await movie.findById(args.ratingInput.movieId);

  const result = await Mutation.changeRating(null, args);
  expect(result).toBe(true);

  const foundMovie_after = await movie.findById(args.ratingInput.movieId);

  const savedRating = await rating.findOne({
    userId: args.ratingInput.userId,
    movieId: args.ratingInput.movieId,
  });
  expect(savedRating.userId.toString()).toBe(args.ratingInput.userId);
  expect(savedRating.movieId.toString()).toBe(args.ratingInput.movieId);
  expect(savedRating.rating).toBe(3.1);

  expect(foundMovie_before.vote_count).toBe(foundMovie_after.vote_count);
  expect(foundMovie_before.vote_sum).toBe(foundMovie_after.vote_sum + 0.9);
});
