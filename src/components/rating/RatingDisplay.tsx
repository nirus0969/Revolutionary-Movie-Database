import React from 'react';

interface RatingDisplayProps {
  rating: number;
  voteCount?: number;
  isTabbable?: boolean;
  onStarHover?: (starValue: number) => void;
  onStarClick?: (starValue: number) => void;
  onStarExit?: () => void;
  updateRatingOnHover?: boolean;
}
const RatingDisplay = ({
  rating,
  voteCount,
  isTabbable,
  onStarHover,
  onStarClick,
  onStarExit,
  updateRatingOnHover,
}: RatingDisplayProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  function handleKeyPress(e: React.KeyboardEvent<HTMLElement>, starValue: number) {
    if (!onStarClick) return;

    if (e.key === 'Enter' || e.key === ' ') {
      onStarClick(starValue);
    }
  }

  return (
    <div
      data-testid="ratingmodal-rating-display"
      className="w-32 flex justify-center items-center"
    >
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        let className;
        if (starValue <= fullStars) {
          className = `fas fa-star ${updateRatingOnHover && 'cursor-pointer'}`; // full star
        } else if (starValue === fullStars + 1 && halfStar) {
          className = `fas fa-star-half-alt ${updateRatingOnHover && 'cursor-pointer'}`; // half star
        } else {
          className = `far fa-star ${updateRatingOnHover && 'cursor-pointer'}`; // empty star
        }

        return (
          <i
            key={i}
            className={className}
            onMouseEnter={() => onStarHover && onStarHover(starValue)}
            onMouseOut={onStarExit}
            onClick={() => onStarClick && onStarClick(starValue)}
            onKeyDown={(e) => handleKeyPress(e, starValue)}
            tabIndex={isTabbable ? 0 : -1}
          ></i>
        );
      })}
      {voteCount !== undefined && (
        <span data-testid="rating-display-votecount" className="ml-1">
          ({voteCount})
        </span>
      )}
    </div>
  );
};

export default RatingDisplay;
