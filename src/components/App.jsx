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
  // const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tagImage, setTagImage] = useState('');
  const [showButton, setShowButton] = useState(false);
  const perPage = 12;

  useEffect(() => {
    const fetchInitialImages = async () => {
      setIsLoading(true);
      try {
        const initialImages = await fetchImages();
        setImages(initialImages.hits);
      } catch (error) {
        console.error('Error fetching initial images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialImages();
  }, []);

  // async componentDidUpdate(prevProps, prevState) {
  //   const { query, page } = this.state;

  //   if (query !== prevState.query || page !== prevState.page) {
  //     await this.fetchImages();

  useEffect(() => {
    const fetchImagesData = async () => {
      setIsLoading(true);
      try {
        const newImages = await fetchImages(query, page, perPage);
        const { totalHits } = newImages;

        if (newImages && newImages.hits && newImages.hits.length > 0) {
          setImages(prevImages => [...prevImages, ...newImages.hits]);
          setShowButton(page < Math.ceil(totalHits / perPage));
        } else {
          toast.error('Sorry, no photo at your request(');
        }
      } catch (error) {
        toast.error('Error fetching images. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (query && page !== 0) {
      fetchImagesData();
    }
  }, [query, page]);

  // fetchImages = async () => {
  //   const { query, page, per_page } = this.state;
  //   this.setState({ isLoading: true });
  //   try {
  //     const newImages = await fetchImages(query, page);
  //     const { totalHits } = newImages;

  //     if (newImages && newImages.hits && newImages.hits.length > 0) {
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...newImages.hits],
  //         showButton: page < Math.ceil(totalHits / per_page),
  //       }));
  //     } else {
  //       toast.error('Sorry, no photo at your request(');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching images:', error);
  //     toast.error('Error fetching images. Please try again later.');
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // };

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

// fetchInitialImages = async () => {
//   this.setState({ isLoading: true });
//   try {
//     const initialImages = await fetchImages();
//     this.setState({ images: initialImages.hits });
//   } catch (error) {
//     console.error('Error fetching initial images:', error);
//   } finally {
//     this.setState({ isLoading: false });
//   }
// };
