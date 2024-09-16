import MainPageMovieCard from './mainPageMovieCard.tsx';
import { SmallMovieData } from '../../types/gqlResponses.ts';

interface MainPageCardContainerProps {
  movies: SmallMovieData[];
}

const MainPageCardContainer = ({ movies }: MainPageCardContainerProps) => (
  <div className="container">
    {Object.values(movies).map((movie) => (
      <div key={movie._id} className="m-4">
        <MainPageMovieCard movie={movie} />
      </div>
    ))}
  </div>
);

export default MainPageCardContainer;
