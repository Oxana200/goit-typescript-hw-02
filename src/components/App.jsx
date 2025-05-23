import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';
import toast from 'react-hot-toast';
import styles from './App.module.css';

const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = import.meta.env.VITE_UNSPLASH_KEY;

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!query) return;

    async function fetchImages() {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(API_URL, {
          params: {
            query,
            page,
            per_page: 12,
            client_id: API_KEY,
          },
        });

        setImages(prev => (page === 1 ? response.data.results : [...prev, ...response.data.results]));
      } catch (err) {
        console.error(err);
        setError(true);
        toast.error('Oops! Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  const handleSearch = value => {
    if (value === '') {
      toast('Please enter a search term');
      return;
    }

    setQuery(value);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = data => {
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage />}

      {images.length > 0 && <ImageGallery images={images} onImageClick={openModal} />}

      {loading && <Loader />}

      {images.length > 0 && !loading && <LoadMoreBtn onClick={loadMore} />}

      {modalData && <ImageModal data={modalData} onClose={closeModal} />}
    </div>
  );
}
