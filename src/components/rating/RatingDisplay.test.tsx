import { describe, expect } from 'vitest';
import { render } from '@testing-library/react';
import RatingDisplay from './RatingDisplay.tsx';

describe('<RatingDisplay />', () => {
  it('renders correctly with stars based on rating', () => {
    const ratingDisplay = render(<RatingDisplay rating={3.5} />).getByTestId(
      'ratingmodal-rating-display'
    );
    expect(ratingDisplay.querySelectorAll('.fas.fa-star').length).toBe(3);
    expect(ratingDisplay.querySelectorAll('.fas.fa-star-half-alt').length).toBe(1);
    expect(ratingDisplay.querySelectorAll('.far.fa-star').length).toBe(1);
  });

  test('displays the correct vote count', () => {
    const voteCount = 123;
    const { getByTestId } = render(<RatingDisplay rating={4} voteCount={voteCount} />);
    expect(getByTestId('rating-display-votecount').textContent).toMatch(
      voteCount.toString()
    );
  });
});
