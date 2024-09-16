import { Card, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { getMoviePosterPath } from '../../utils/utils.ts';
import missingPoster from '../../assets/poster_missing.png';
import { SmallMovieData } from '../../types/gqlResponses.ts';
import RatingDisplay from '../rating/RatingDisplay.tsx';

export interface MovieProps {
  movie: SmallMovieData;
}

const SearchPageMovieCard = ({ movie }: MovieProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <Card
      data-testid={`searchpage-moviecard-${movie.original_title}`}
      className="w-full"
      shadow="sm"
      isPressable
      onPress={handleCardClick}
    >
      <div className="flex w-full">
        <Image
          src={getMoviePosterPath(movie.poster_path)}
          alt="This is a movie"
          fallbackSrc={missingPoster}
          className="w-26 h-36 min-w-[104px] object-cover"
        />
        <div className="flex flex-col justify-between w-full ml-2.5">
          <div className="flex flex-col items-center justify-center flex-grow">
            <p
              data-testid={`searchpage-moviecard-title-${movie.original_title}`}
              className="text-[30px] font-normal text-center mb-2 overflow-hidden max-h-28 overflow-ellipsis"
            >
              {movie.original_title}
            </p>
          </div>
          <div className="flex flex-col items-center flex-shrink">
            <RatingDisplay rating={movie.vote_average / 2} voteCount={movie.vote_count} />
          </div>
        </div>
        <span></span> {/* This is a spacer */}
      </div>
    </Card>
  );
};

export default SearchPageMovieCard;
