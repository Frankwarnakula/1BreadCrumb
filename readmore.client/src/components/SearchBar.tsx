import React from 'react';

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onSearchChange }) => (
  <div className="search-bar-inline">
    <label htmlFor="bookSearch">Book Search:</label>
    <input
      id="bookSearch"
      type="text"
      value={search}
      onChange={e => onSearchChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
