import ImageGalleryItem from '../image-gallery-item';
import Modal from '../modal';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemId, setItemId] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(isModalOpen => !isModalOpen);
  };

  const handleItemClick = event => {
    const { id } = event.currentTarget;
    setItemId(id);
    toggleModal();
  };

  const modalImage = images?.find(image => image.id === Number(itemId));
  const imageSrc = modalImage?.largeImageURL;
  const imageTags = modalImage?.tags;

  const galleryItems = images.map(({ id, webformatURL, tags }) => (
    <ImageGalleryItem key={id} id={id} src={webformatURL} alt={tags} onClick={handleItemClick} />
  ));

  return (
    <>
      <ul className="ImageGallery">{galleryItems}</ul>
      {isModalOpen && <Modal onClose={toggleModal} src={imageSrc} alt={imageTags} />}
    </>
  );
};

ImageGallery.propTypes = { images: PropTypes.array.isRequired };

export default ImageGallery;
