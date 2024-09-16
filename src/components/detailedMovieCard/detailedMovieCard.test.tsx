import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import DetailedMovieCard from './detailedMovieCard';
import { BigMovieData } from '../../types/gqlResponses';
import { useAuthContext } from '../../contexts/useAuthContext';
import * as watchlistService from '../../api/services/watchlistService';
import { User } from '../../types/gqlResponses';

vi.mock('../../api/services/watchlistService');
vi.mock('../../contexts/useAuthContext');

const mockMovieData: BigMovieData = {
  _id: '123',
  original_title: 'test',
  poster_path: 'test',
  release_date: 'test',
  runtime: 123,
  vote_average: 123,
  vote_count: 123,
  overview: 'test',
  genres: [],
};

const mockUser: User = {
  _id: '123',
  username: 'testUser',
};

describe('<DetailedMovieCard />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(useAuthContext).mockReturnValue({
      user: mockUser,
      updateUser: function (): void {
        throw new Error('Function not implemented.');
      },
    });
    vi.mocked(watchlistService.isMovieInWatchlist).mockResolvedValue(true);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('toggles watchlist status on button click', async () => {
    const { getByTestId } = render(
      <DetailedMovieCard
        movie={mockMovieData}
        onRatingOpen={() => {}}
        isRatingOpen={false}
        onRatingOpenChange={() => {}}
      />
    );
    const watchlistButton = getByTestId('add-remove-watchlist-button');

    await act(async () => {
      fireEvent.click(watchlistButton);
      await Promise.resolve();
    });

    expect(watchlistService.addToWatchlist).toHaveBeenCalled();

    await act(async () => {
      fireEvent.click(watchlistButton);
      await Promise.resolve();
    });

    expect(watchlistService.removeFromWatchlist).toHaveBeenCalled();
  });

  it('displays correct watchlist button text', async () => {
    const { getByTestId } = render(
      <DetailedMovieCard
        movie={mockMovieData}
        onRatingOpen={() => {}}
        isRatingOpen={false}
        onRatingOpenChange={() => {}}
      />
    );
    const watchlistButton = getByTestId('add-remove-watchlist-button');

    await act(async () => {
      fireEvent.click(watchlistButton);
      await Promise.resolve();
    });

    expect(watchlistButton.textContent).toBe('- Remove from Watchlist');

    await act(async () => {
      fireEvent.click(watchlistButton);
      await Promise.resolve();
    });

    expect(watchlistButton.textContent).toBe('+ Watchlist');
  });
});
