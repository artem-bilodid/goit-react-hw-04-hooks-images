const BASE_URL = 'https://pixabay.com/api';
const KEY = '23157120-208317e5fddd4920b074585fd';
const PAGE_SIZE = 12;

const getImagesResponse = async (page, query) => {
  try {
    const url = `${BASE_URL}/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PAGE_SIZE}`;
    const response = await fetch(url);
    if (!response.ok) {
      return Promise.reject(new Error(response.statusText));
    }

    const parsedData = await response.json();
    return parsedData;
  } catch (error) {
    console.log('error', error);
  }
};

export { getImagesResponse as getImages };
