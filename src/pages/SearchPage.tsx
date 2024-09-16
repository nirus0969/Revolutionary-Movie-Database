import React, { useCallback, useEffect, useState } from 'react';
import MovieContainer from '../components/searchPage/movieContainer.tsx';
import { useLocation } from 'react-router-dom';
import { getMoviesWithFilter } from '../api/services/movieService.ts';
import { PaginatedMovieFilter } from '../types/gqlRequestBody.ts';
import { Movies } from '../types/gqlResponses.ts';
import { Pagination, Spacer } from '@nextui-org/react';

const SearchPage: React.FC = () => {
  const location = useLocation();

  const [movies, setMovies] = useState<Movies>({ movies: [], totalCount: 0 });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const PAGE_SIZE = 24;

  const fetchAndLoadMovies = useCallback(async () => {
    return await getMoviesWithFilter({
      limit: PAGE_SIZE,
      page: currentPage,
      ...location.state?.options,
    } as PaginatedMovieFilter);
  }, [currentPage, location.state?.options]);

  useEffect(() => {
    fetchAndLoadMovies().then((newMovies) => {
      setCurrentPage(0);
      setTotalPages(Math.ceil(newMovies.totalCount / PAGE_SIZE));
      setMovies(newMovies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  useEffect(() => {
    fetchAndLoadMovies().then((newMovies) => {
      setMovies(newMovies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (totalPages === 0) {
    return <div className="h-screen">No movies found.</div>;
  }

  return (
    <>
      <MovieContainer movies={movies.movies} />
      <Spacer y={6} />
      <Pagination
        data-testid="searchpage-pagination-component"
        total={totalPages}
        showControls
        variant={'light'}
        page={currentPage + 1}
        onChange={(page) => setCurrentPage(page - 1)}
      />
    </>
  );
};

export default SearchPage;
