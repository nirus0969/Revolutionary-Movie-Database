import React, { useEffect, useState } from 'react';
import { SmallMovieData } from '../types/gqlResponses';
import { useAuthContext } from '../contexts/useAuthContext';
import MovieContainer from '../components/searchPage/movieContainer.tsx';
import { getUserWatchlist } from '../api/services/watchlistService.ts';
import { Pagination } from '@nextui-org/react';

const UserWatchListPage: React.FC = () => {
  const [watchList, setWatchList] = useState<SmallMovieData[]>([]);

  const { user } = useAuthContext();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const PAGE_SIZE = 24;

  useEffect(() => {
    if (!user) return;

    const fetchWatchList = async () => {
      try {
        const movies = await getUserWatchlist(user._id, PAGE_SIZE, currentPage);
        setWatchList(movies.movies);
        setTotalPages(Math.ceil(movies.totalCount / PAGE_SIZE));
      } catch (error) {
        console.log(error);
      }
    };

    fetchWatchList();
  }, [user, currentPage, totalPages]);

  if (!user) {
    return (
      <>
        <h1 className="text-center">401</h1>
        You must be logged in to view your watchlist
      </>
    );
  }

  if (totalPages === 0) {
    return <div className="h-screen">No movies found.</div>;
  }

  return (
    <div className="w-full place-items-center flex flex-col gap-5 max-w-6xl">
      <h1>Your Watchlist</h1>
      <MovieContainer movies={watchList} />
      <Pagination
        total={totalPages}
        showControls
        variant={'light'}
        page={currentPage + 1}
        onChange={(page) => setCurrentPage(page - 1)}
      />
    </div>
  );
};

export default UserWatchListPage;
