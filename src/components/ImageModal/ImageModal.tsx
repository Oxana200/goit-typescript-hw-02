import Modal from 'react-modal';
import styles from './ImageModal.module.css';
import { useEffect } from 'react';

Modal.setAppElement('#root');

interface ImageModalProps {
  data: {
    urls: {
      regular: string;
    };
    alt_description: string | null;
    user?: {
      name: string;
    };
    likes?: number;
    description?: string | null;
  } | null;
  onClose: () => void;
}

export default function ImageModal({ data, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!data) return null;

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
        <p>Author: {data.user?.name || 'Unknown'}</p>
        <p>Likes: {data.likes ?? 0}</p>
        {data.description && <p>Description: {data.description}</p>}
      </div>
    </Modal>
  );
}

