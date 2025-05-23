import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.wrapper}>
      <ClipLoader color="#007bff" size={50} />
    </div>
  );
}
