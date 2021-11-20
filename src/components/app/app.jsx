import { useEffect, useState } from 'react';
import Button from '../button';
import ImageGallery from '../image-gallery';
import Loader from '../loader';
import SearchBar from '../search-bar';
import { getImages } from '../../util/api-client';

const App = () => {
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const setInitialState = () => {
    setPage(1);
    setTotalHits(0);
    setQuery('');
    setImages([]);
    setIsLoading(false);
  };

  const fetchImages = async (page, query) => {
    if (!query) return;

    setIsLoading(true);
    try {
      const { hits, totalHits } = await getImages(page, query);
      setImages(prevImages => prevImages.concat(hits));
      setTotalHits(totalHits);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(page, query).then(() => {
      if (page !== 1) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    });
  }, [query, page]);

  const handleSearchFormSubmit = async newQuery => {
    if (query === newQuery) return;
    setInitialState();
    setQuery(newQuery);
  };

  const handleLoadMoreButtonClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const shouldShowLoadButton = images.length < totalHits;
  return (
    <div className="App">
      <SearchBar onSubmit={handleSearchFormSubmit} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {shouldShowLoadButton && <Button onClick={handleLoadMoreButtonClick} />}
    </div>
  );
};

export default App;
