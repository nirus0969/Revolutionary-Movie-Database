import { Button, Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { SortOrder, SortType } from '../../types/modalType';
import { useTheme } from '../../hooks/useTheme.ts';

type SortOptionsProps = {
  setSortOrder: (value: SortOrder) => void;
  setSortType: (value: SortType) => void;
  sortOrder: SortOrder;
  sortType: SortType;
};

const SortOptions: React.FC<SortOptionsProps> = ({
  setSortOrder,
  setSortType,
  sortType,
  sortOrder,
}) => {
  const theme = useTheme();
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as SortType);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc);
  };

  return (
    <div className="flex gap-2 w-full md:w-[100%] md:max-w-xs">
      <Select
        data-testid="sortoption-sortparam-button"
        placeholder="Select an option"
        label="Sort by"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore sorry for using undocumented prop, but this ensures that we get the correct height for the select
        labelPlacement="workaround"
        selectedKeys={[sortType]}
        onChange={handleSelectionChange}
        className="flex-shrink drop-shadow-md"
      >
        <SelectItem
          data-testid={`sortoption-sortparam-${SortType.Popularity}`}
          key={SortType.Popularity}
          value={SortType.Popularity}
        >
          Popularity
        </SelectItem>
        <SelectItem
          data-testid={`sortoption-sortparam-${SortType.ReleaseDate}`}
          key={SortType.ReleaseDate}
          value={SortType.ReleaseDate}
        >
          Release Date
        </SelectItem>
        <SelectItem
          data-testid={`sortoption-sortparam-${SortType.Title}`}
          key={SortType.Title}
          value={SortType.Title}
        >
          Title
        </SelectItem>
        <SelectItem
          data-testid={`sortoption-sortparam-${SortType.Runtime}`}
          key={SortType.Runtime}
          value={SortType.Title}
        >
          Runtime
        </SelectItem>
        <SelectItem
          data-testid={`sortoption-sortparam-${SortType.VoteCount}`}
          key={SortType.VoteCount}
          value={SortType.VoteCount}
        >
          Number of Ratings
        </SelectItem>
        <SelectItem
          data-testid={`sortoption-sortparam-${SortType.VoteAverage}`}
          key={SortType.VoteAverage}
          value={SortType.VoteAverage}
        >
          Average rating
        </SelectItem>
      </Select>
      <Button
        isIconOnly
        onClick={toggleSortOrder}
        className={theme.isDarkMode ? '' : 'bg-white'}
      >
        <img
          data-testid="sortoption-asc-desc-button"
          style={{
            transform: sortOrder === SortOrder.Asc ? 'scaleY(-1)' : '',
            filter: theme.isDarkMode ? 'invert(1)' : '',
          }}
          src={'/sort_icon.png'}
          alt="Sort Order"
        />
      </Button>
    </div>
  );
};

export default SortOptions;
