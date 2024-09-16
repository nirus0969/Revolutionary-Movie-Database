import MainPageCardContainer from '../components/mainPage/mainPageMovieContainer.tsx';
import { getMoviesWithFilter } from '../api/services/movieService.ts';
import { useEffect, useState } from 'react';
import { SmallMovieData } from '../types/gqlResponses.ts';

const FrontPage = () => {
  const [frontPageMovies, setFrontPageMovies] = useState<SmallMovieData[]>([]);

  useEffect(() => {
    const fetchFrontPage = async () => {
      const fetchedMovies = await getMoviesWithFilter({
        limit: 3,
        page: 0,
      });

      setFrontPageMovies(fetchedMovies.movies);
    };

    fetchFrontPage();
  }, []);

  return <MainPageCardContainer movies={frontPageMovies} />;
};

export default FrontPage;
