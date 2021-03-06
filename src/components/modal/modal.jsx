import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ src, tags, onClose }) => {
  const handleESCButtonClose = useCallback(
    event => {
      if (event.code !== 'Escape') return;
      onClose();
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleESCButtonClose);
    return () => window.removeEventListener('keydown', handleESCButtonClose);
  }, [handleESCButtonClose]);

  const handleClose = event => {
    if (event.target !== event.currentTarget) return;
    onClose();
  };

  return createPortal(
    <div className="Overlay" onClick={handleClose}>
      <div className="Modal">
        <img src={src} alt={tags} />
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
