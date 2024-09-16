import { useNavigate } from 'react-router-dom';
import { Card, Image } from '@nextui-org/react';
import styles from './mainPageMovieCard.module.css';
import { getMoviePosterPath } from '../../utils/utils.ts';
import missingPoster from '../../assets/poster_missing.png';
import { SmallMovieData } from '../../types/gqlResponses.ts';
import RatingDisplay from '../rating/RatingDisplay.tsx';

interface MainPageMovieCardProps {
  movie: SmallMovieData;
}

const MainPageMovieCard = ({ movie }: MainPageMovieCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <Card
      data-testid={`mainpage-moviecard-${movie.original_title}`}
      className={styles.mainPageMovieCard}
      shadow="sm"
      isPressable
      onPress={handleCardClick}
    >
      <div
        data-testid={`mainpage-moviecard-title-${movie.original_title}`}
        className={styles.mainPageMovieTitle}
      >
        {movie.original_title}
      </div>

      <div className={styles.movieCoverImage}>
        <Image
          shadow="lg"
          src={getMoviePosterPath(movie.poster_path)}
          alt="This is a movie"
          fallbackSrc={missingPoster}
          isBlurred
          isZoomed
        />
      </div>
      <RatingDisplay rating={movie.vote_average / 2} voteCount={movie.vote_count} />
    </Card>
  );
};

export default MainPageMovieCard;
