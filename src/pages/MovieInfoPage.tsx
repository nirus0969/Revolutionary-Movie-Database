import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailedMovieCard from '../components/detailedMovieCard/detailedMovieCard.tsx';
import { getMovieById } from '../api/services/movieService.ts';
import { BigMovieData } from '../types/gqlResponses.ts';
import { useDisclosure } from '@nextui-org/react';

const MovieInfoPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = React.useState<BigMovieData | null>(null);

  const {
    isOpen: isRatingOpen,
    onOpen: onRatingOpen,
    onOpenChange: onRatingOpenChange,
  } = useDisclosure();

  useEffect(() => {
    const fetchMovie = async () => {
      if (movieId) {
        const movieData = await getMovieById(movieId);
        setMovie(movieData);
      }
    };

    fetchMovie();
  }, [movieId, setMovie, onRatingOpenChange]);

  if (!movie) return <p>Loading...</p>;

  return (
    <DetailedMovieCard
      movie={movie}
      isRatingOpen={isRatingOpen}
      onRatingOpen={onRatingOpen}
      onRatingOpenChange={onRatingOpenChange}
    />
  );
};

export default MovieInfoPage;
