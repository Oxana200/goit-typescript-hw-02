import Modal from 'react-modal';
import styles from './ImageModal.module.css';
import { useEffect } from 'react';

Modal.setAppElement('#root'); // обов’язково

export default function ImageModal({ data, onClose }) {
  useEffect(() => {
    const handleEsc = e => {
      if (e.code === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={!!data}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
    >
      <div onClick={handleBackdropClick}>
        <img src={data.urls.regular} alt={data.alt_description || 'Image'} />
        <p>Author: {data.user.name}</p>
        <p>Likes: {data.likes}</p>
        {data.description && <p>Description: {data.description}</p>}
      </div>
    </Modal>
  );
}
