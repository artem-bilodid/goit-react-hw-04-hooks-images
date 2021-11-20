import { useState } from 'react';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    onSubmit(trimmedQuery);
  };

  const handleChange = event => {
    const { value } = event.target;
    setQuery(value);
  };

  return (
    <header className="Searchbar" onSubmit={handleSubmit}>
      <form className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;
