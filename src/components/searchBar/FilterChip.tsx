import { Chip } from '@nextui-org/react';

interface FilterProps {
  keys: string[];
  selectedKeys: Set<string>;
  onSelectedKeysChange: (keys: Set<string>) => void;
}

const FilterChips = ({ keys, selectedKeys, onSelectedKeysChange }: FilterProps) => {
  const onTagClick = (tag: string) => {
    const newSelectedKeys = new Set(selectedKeys);
    if (newSelectedKeys.has(tag)) {
      newSelectedKeys.delete(tag);
    } else {
      newSelectedKeys.add(tag);
    }
    onSelectedKeysChange(newSelectedKeys);
  };

  function handleKeyPress(item: string, e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      onTagClick(item);
      e.preventDefault();
    }
  }

  return (
    <div
      role="listbox"
      aria-label="Genre filter options"
      className="w-full justify-center flex-wrap flex gap-1 "
    >
      {keys.map((item) => (
        <Chip
          className="cursor-pointer"
          role="option"
          aria-selected={selectedKeys.has(item)}
          data-testid={`filteritem-${item}`}
          key={item}
          color={selectedKeys.has(item) ? 'primary' : 'default'}
          onClick={() => onTagClick(item)}
          tabIndex={0}
          onKeyDown={(e) => handleKeyPress(item, e)}
        >
          {item}
        </Chip>
      ))}
    </div>
  );
};

export default FilterChips;
