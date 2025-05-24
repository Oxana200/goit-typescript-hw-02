import styles from './ImageCard.module.css';
import { UnsplashImage } from '../../types';

interface ImageCardProps {
  image: UnsplashImage;
  onClick: (image: UnsplashImage) => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <div className={styles.card} onClick={() => onClick(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description || 'Image'}
        className={styles.image}
      />
    </div>
  );
}
