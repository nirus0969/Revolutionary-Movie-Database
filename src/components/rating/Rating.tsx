import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import RatingDisplay from './RatingDisplay';
import { updateRating } from '../../api/services/ratingService.ts';
import { useAuthContext } from '../../contexts/useAuthContext.ts';

interface RatingProps {
  movieId: string;
  rating: number;
  setErrorMessage?: (message: string) => void;
  updateRatingOnHover?: boolean;
  voteCount: number;
}

const Rating = ({
  movieId,
  rating,
  setErrorMessage,
  updateRatingOnHover,
  voteCount,
}: RatingProps) => {
  const { user } = useAuthContext();
  const localStorageKey = `${user?._id}_rating_${movieId}`;

  const initialRating =
    updateRatingOnHover && localStorage.getItem(localStorageKey)
      ? parseFloat(localStorage.getItem(localStorageKey)!) / 2
      : rating / 2;

  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(initialRating);

  const handleStarHover = (starValue: number) => {
    if (!updateRatingOnHover) return;
    setHoverRating(starValue);
  };

  const handleStarExit = () => {
    if (!updateRatingOnHover) return;
    setHoverRating(null);
  };

  const handleStarClick = async (starValue: number) => {
    if (!updateRatingOnHover) return;
    if (!user) {
      setErrorMessage && setErrorMessage('You must be logged in to rate movies');
      return;
    }

    const success = await updateRating({
      rating: starValue * 2,
      userId: user._id,
      movieId,
    });
    if (!success) {
      setErrorMessage && setErrorMessage('Something went wrong, please try again later');
    }
    setHoverRating(null);
    setCurrentRating(starValue);
    localStorage.setItem(localStorageKey, (starValue * 2).toString());
  };

  const displayRating = hoverRating != null ? hoverRating : currentRating;

  return (
    <RatingDisplay
      rating={displayRating}
      voteCount={voteCount}
      isTabbable={true}
      onStarHover={handleStarHover}
      onStarClick={handleStarClick}
      onStarExit={handleStarExit}
      updateRatingOnHover={updateRatingOnHover}
    />
  );
};

export default Rating;
