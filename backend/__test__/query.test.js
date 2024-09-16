import { test, expect, beforeAll, afterAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Query from '../resolvers/Query.js';
import { user } from '../models/User.js';
import { movie } from '../models/Movie.js';
import * as testData from './data/testData.json';

let mongoServer;
let testUser;
let testMovie_1;
let testMovie_2;

// Create a new in-memory database before all tests run
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  testUser = new user(testData.testUser);
  await testUser.save();

  testMovie_1 = new movie(testData.testMovie1);
  await testMovie_1.save();

  testMovie_2 = new movie(testData.testMovie2);
  await testMovie_2.save();
});

// Clear all test data after all tests run
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('allGenres returns the right genres', async () => {
  const args = {
    upper_limit: 10,
  };
  const actualGenres = ['Action', 'Adventure', 'Crime', 'Science Fiction'];
  const result = await Query.allGenres(null, args);
  for (const genre of result) {
    expect(actualGenres).toContain(genre.name);
  }
});

test('getUserWatchlist returns the correct movies', async () => {
  const args = {
    userId: testUser._id.toString(),
    limit: 1,
    page: 0,
  };
  const result = await Query.getUserWatchlist(null, args);
  expect(result.totalCount).toBe(1);
  expect(result.movies[0]._id.toString()).toBe(testMovie_1._id.toString());
  expect(result.movies[0].original_title).toBe(testMovie_1.original_title);
  expect(result.movies[0].imdb_id).toBe(testMovie_1.imdb_id);
});

test('movie returns the correct movie', async () => {
  const args = {
    movieId: testMovie_2._id.toString(),
  };
  const result = await Query.movie(null, args);
  expect(result._id.toString()).toBe(testMovie_2._id.toString());
  expect(result.original_title).toBe(testMovie_2.original_title);
  expect(result.imdb_id).toBe(testMovie_2.imdb_id);
  expect(result.vote_count).toBe(testMovie_2.vote_count);
  expect(result.vote_sum).toBe(testMovie_2.vote_sum);
  expect(result.overview).toBe(testMovie_2.overview);
});

test('verifyUser can return correct values when given invalid input', async () => {
  const args = {
    credentials: {
      username: testUser.username,
      password: testUser.password + '1',
    },
  };
  const result = await Query.verifyUser(null, args);
  expect(result.error).toBe('Invalid username or password');
});

test('movies can filter on genre', async () => {
  const args = {
    genres: ['Action'],
    limit: 10,
    page: 0,
  };
  const result = await Query.movies(null, args);
  expect(result.totalCount).toBe(1);
  expect(result.movies[0]._id.toString()).toBe(testMovie_2._id.toString());
});

test('movies can sort on vote_count', async () => {
  const args = {
    sort_param: 'vote_count',
    limit: 10,
    page: 0,
  };
  const result = await Query.movies(null, args);
  expect(result.totalCount).toBe(2);
  expect(result.movies[0]._id.toString()).toBe(testMovie_2._id.toString());
  expect(result.movies[1]._id.toString()).toBe(testMovie_1._id.toString());
});

test('movies can search for a specific movie', async () => {
  const args = {
    search: 'The Batman',
    limit: 10,
    page: 0,
  };
  const result = await Query.movies(null, args);
  expect(result.totalCount).toBe(1);
  expect(result.movies[0]._id.toString()).toBe(testMovie_1._id.toString());
});

test('movies can paginate correctly', async () => {
  const args_1 = {
    limit: 1,
    page: 0,
  };
  const result_1 = await Query.movies(null, args_1);
  expect(result_1.totalCount).toBe(2);

  const args_2 = {
    limit: 1,
    page: 1,
  };
  const result_2 = await Query.movies(null, args_2);
  expect(result_2.totalCount).toBe(2);

  expect(result_1.movies[0]._id.toString()).not.toBe(result_2.movies[0]._id.toString());
});
