import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const movieSchema = new Schema({
  _id: ObjectId,
  adult: Boolean,
  belongs_to_collection: {
    id: Number,
    name: String,
    poster_path: String,
    backdrop_path: String,
  },
  budget: Number,
  genres: [{ id: Number, name: String }],
  id: {
    type: String,
    unique: true,
    index: true,
  },
  imdb_id: String,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  production_companies: [{ name: String, id: Number }],
  production_countries: [{ iso_3166_1: String, name: String }],
  release_date: String,
  revenue: Number,
  runtime: Number,
  spoken_languages: [{ iso_639_1: String, name: String }],
  vote_sum: Number,
  vote_count: Number,
});

const movie = mongoose.model('Movie', movieSchema);
export { movieSchema, movie };
