import React, { Component } from 'react';
import Button from '../button';
import ImageGallery from '../image-gallery';
import Loader from '../loader';
import SearchBar from '../search-bar';
import { getImages } from '../../util/api-client';

const INITIAL_STATE = {
  page: 1,
  totalHits: 0,
  query: '',
  images: [],
  error: '',
  isLoading: false,
};

class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleSearchFormSubmit = async query => {
    if (this.state.query === query) return;

    const firstPage = 1;

    if (!query) {
      this.setState({ ...INITIAL_STATE });
      return;
    }

    this.setState({ isLoading: true });
    const { hits, totalHits } = await getImages(firstPage, query);
    this.setState({ ...INITIAL_STATE, query, totalHits, images: [...hits] });
  };

  handleLoadMoreButtonClick = async () => {
    if (this.state.isLoading) return;
    const { page, query } = this.state;
    const nextPage = page + 1;

    this.setState({ isLoading: true });

    const { hits, totalHits } = await getImages(nextPage, query);

    this.setState(prevState => {
      return {
        isLoading: false,
        totalHits,
        page: nextPage,
        images: prevState.images.concat(hits),
      };
    });
  };

  render() {
    const { images, totalHits, isLoading } = this.state;
    const shouldShowLoadButton = images.length < totalHits;
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {shouldShowLoadButton && <Button onClick={this.handleLoadMoreButtonClick} />}
      </div>
    );
  }
}

export default App;
