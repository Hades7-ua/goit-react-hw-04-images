import React, { useState, useEffect } from 'react';
import { AppStyled } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from 'services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/Searchbar';
import { BtnLoadMore } from './ButtonLoadMore/LoadMoreBtn';
import Spinner from './Loader/Spinner';
import Modal from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tagImage, setTagImage] = useState('');
  const [showButton, setShowButton] = useState(false);
  const perPage = 12;

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImagesData = async () => {
      setIsLoading(true);
      try {
        const newImages = await fetchImages(query, page);
        const { hits, totalHits } = newImages;

        if (!totalHits) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return setError('No matches found');
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setShowButton(page < Math.ceil(totalHits / perPage));
      } catch (error) {
        toast.error('Error fetching images. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagesData();
  }, [query, page]);

  const handleSearchImageName = newName => {
    setQuery(newName);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    const { largeImageURL, tags } = image;
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTagImage(tags);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
    setTagImage('');
  };

  return (
    <AppStyled>
      {isLoading && <Spinner />}
      <SearchBar onSubmit={handleSearchImageName} />
      {query && <ImageGallery images={images} onClickModal={openModal} />}
      {showButton && (
        <BtnLoadMore onClick={handleLoadMore}>Load More</BtnLoadMore>
      )}
      {page !== 0 && showModal && (
        <Modal onCloseModal={closeModal}>
          <img src={largeImageURL} alt={tagImage} />
        </Modal>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </AppStyled>
  );
};

export default App;
