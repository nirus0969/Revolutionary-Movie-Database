import FilterChips from './FilterChip.tsx';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { fetchGenres } from '../../api/services/movieService.ts';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce.ts';
import SortOptions from './SortOptions.tsx';
import { SortOrder, SortType } from '../../types/modalType.ts';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();

  const [allGenres, setAllGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedGenres = useDebounce(selectedGenres, 500);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [sortType, setSortType] = useState<SortType>(SortType.Popularity);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Desc);

  const handleSearch = useCallback(() => {
    if (allGenres.length === 0) {
      return;
    }

    const genresToQuery =
      selectedGenres.size > 0 ? Array.from(selectedGenres) : allGenres;
    navigate('/search', {
      state: {
        options: {
          genres: genresToQuery,
          search: debouncedSearchTerm,
          ascDesc: sortOrder,
          sortParam: sortType,
        },
      },
    });
  }, [allGenres, debouncedSearchTerm, navigate, selectedGenres, sortOrder, sortType]);

  useEffect(() => {
    const fetchAndSetGenres = async () => {
      const fetchedGenres = await fetchGenres(30);
      const genreNames = fetchedGenres.map((genre) => genre.name);
      setAllGenres(genreNames);
      return genreNames;
    };

    fetchAndSetGenres();
  }, []);

  useEffect(() => {
    if (location.pathname === '/project2/search' || location.pathname === '/project2') {
      handleSearch();
    }
  }, [
    debouncedGenres,
    debouncedSearchTerm,
    allGenres,
    handleSearch,
    sortType,
    sortOrder,
  ]);

  if (location.pathname === '/project2/watchlist') {
    return null;
  }

  return (
    <div className="flex flex-col m-0 max-w-6xl">
      <div className="flex flex-col md:flex-row items-center gap-2 drop-shadow">
        <Input
          className="min-w-4 flex-grow p-0"
          data-testid="searchbar-input"
          label="Movie name"
          labelPlacement="outside"
          value={searchTerm}
          onValueChange={setSearchTerm}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          endContent={
            <Button
              data-testid="searchbar-button"
              className="bg-transparent border-0 hover:bg-navbar hover:text-white h-8 w-10 min-w-4 p-0"
              onClick={handleSearch}
            >
              <i className="fas fa-search"></i>
            </Button>
          }
        />
        <SortOptions
          setSortOrder={setSortOrder}
          setSortType={setSortType}
          sortOrder={sortOrder}
          sortType={sortType}
        />
      </div>
      <div className="mt-4 space-x-2">
        <FilterChips
          keys={allGenres}
          selectedKeys={selectedGenres}
          onSelectedKeysChange={setSelectedGenres}
        />
      </div>
    </div>
  );
};

export default SearchBar;
