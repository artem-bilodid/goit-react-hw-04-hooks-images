import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, src, alt, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img id={id} src={src} alt={alt} onClick={onClick} className="ImageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
