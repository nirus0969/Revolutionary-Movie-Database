import { Button, Card, Chip, Image } from '@nextui-org/react';

import styles from './detailedMovieCard.module.css';
import movieImage from '../../assets/poster_missing.png';

import { getMoviePosterPath } from '../../utils/utils.ts';
import { BigMovieData } from '../../types/gqlResponses.ts';
import RateMovie from '../rating/RateMovie.tsx';
import { useAuthContext } from '../../contexts/useAuthContext.ts';
import { useEffect, useState } from 'react';
import {
  addToWatchlist,
  isMovieInWatchlist,
  removeFromWatchlist,
} from '../../api/services/watchlistService.ts';
import RatingDisplay from '../rating/RatingDisplay.tsx';

interface Props {
  movie: BigMovieData;
  onRatingOpen: () => void;
  isRatingOpen: boolean;
  onRatingOpenChange: (open: boolean) => void;
}

const releaseDate = (movie: BigMovieData) => (
  <div data-testid={`detailed-moviecard-releasedate-${movie.original_title}`}>
    <i className="fas fa-calendar-alt mr-1"></i>
    {movie.release_date.substring(8, 10) +
      '/' +
      movie.release_date.substring(5, 7) +
      '/' +
      movie.release_date.substring(0, 4)}
  </div>
);

const runTime = (movie: BigMovieData) => (
  <div data-testid={`detailed-moviecard-runtime-${movie.original_title}`}>
    <i className="fas fa-clock mr-1.5"></i>
    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
  </div>
);

const DetailedMovieCard = ({
  movie,
  onRatingOpen,
  onRatingOpenChange,
  isRatingOpen,
}: Props) => {
  const { user } = useAuthContext();
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);

  const toggleWatchlist = () => {
    if (!user) return;

    if (isInWatchlist) {
      removeFromWatchlist(user._id, movie._id);
    } else {
      addToWatchlist(user._id, movie._id);
    }

    setIsInWatchlist(!isInWatchlist);
  };

  useEffect(() => {
    if (!user) return;

    const fetchWatchListStatus = async () => {
      try {
        const status = await isMovieInWatchlist(user._id, movie._id);
        setIsInWatchlist(status);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWatchListStatus();
  }, [user, movie]);

  return (
    <Card
      data-testid={`detailed-moviecard-${movie.original_title}`}
      className="flex-shrink p-5 m-0 max-w-6xl"
      shadow="md"
    >
      <div className="flex flex-col items-center sm:flex-row">
        <div className="flex items-center justify-center sm:mr-5">
          <Image
            src={getMoviePosterPath(movie.poster_path)}
            alt="This is a movie"
            fallbackSrc={movieImage}
            isBlurred
            width="100%"
            className={styles.poster}
          />
        </div>
        <div className="space-x-1 space-y-3">
          <div
            data-testid={`detailed-moviecard-title-${movie.original_title}`}
            className="text-4xl text-center mb-2"
          >
            {movie.original_title}
          </div>

          <div className="flex justify-center gap-1">
            {movie.genres.map((genre, key) => (
              <Chip
                data-testid={`detailed-moviecard-chip-${genre.name}-${movie.original_title}`}
                key={key}
                className="bg-accent text-white border-0"
              >
                {genre.name}
              </Chip>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            {releaseDate(movie)}
            {runTime(movie)}
            <div className="flex items-center justify-center gap-5">
              <RatingDisplay
                rating={movie.vote_average / 2}
                voteCount={movie.vote_count}
              />

              <RateMovie
                movie={movie}
                isOpen={isRatingOpen}
                onOpenChange={onRatingOpenChange}
              />
            </div>
          </div>
          <div className="text-center lg:text-start space-x-2">
            <Button
              data-testid="add-remove-watchlist-button"
              variant="flat"
              onPress={toggleWatchlist}
              isDisabled={!user}
              color="primary"
              className="lg:absolute lg:top-5 lg:left-50 text-lg"
            >
              {isInWatchlist ? '- Remove from Watchlist' : '+ Watchlist'}
            </Button>
            <Button
              data-testid={`detailed-moviecard-rate-button-${movie.original_title}`}
              variant="flat"
              onPress={onRatingOpen}
              isDisabled={!user}
              color="primary"
              className="lg:absolute lg:top-5 lg:right-5 text-lg"
            >
              Rate
            </Button>
          </div>

          {movie.overview && (
            <div
              data-testid={`detailed-moviecard-overview-${movie.original_title}`}
              className="py-4 px-10 text-center"
            >
              {movie.overview}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DetailedMovieCard;
