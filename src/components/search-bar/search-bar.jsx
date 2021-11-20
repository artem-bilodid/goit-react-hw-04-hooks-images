import { Component } from 'react';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;
    const trimmedQuery = query.trim();

    onSubmit(trimmedQuery);
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ query: value });
  };
  // { onSubmit }fF
  render() {
    return (
      <header className="Searchbar" onSubmit={this.handleSubmit}>
        <form className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
