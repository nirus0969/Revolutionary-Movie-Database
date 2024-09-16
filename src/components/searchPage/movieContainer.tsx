import SearchPageMovieCard from './searchPageMovieCard.tsx';
import { SmallMovieData } from '../../types/gqlResponses.ts';

interface SearchPageMovieContainerProps {
  movies: SmallMovieData[];
}

const MovieContainer = ({ movies }: SearchPageMovieContainerProps) => (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,376px))] w-full justify-center max-w-6xl gap-3 box-border">
    {Object.values(movies).map((movie) => (
      <SearchPageMovieCard movie={movie} key={movie._id} />
    ))}
  </div>
);

export default MovieContainer;
