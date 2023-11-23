import React, { Component } from 'react';
import { AppStyled } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from 'services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/Searchbar';
import { BtnLoadMore } from './ButtonLoadMore/LoadMoreBtn';
import Spinner from './Loader/Spinner';
import Modal from './Modal/Modal';
export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: false,
    query: '',
    page: 1,
    showModal: false,
    largeImageURL: '',
    tagImage: '',
  };

  componentDidMount() {
    this.fetchImages();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      await this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const newImages = await fetchImages(query, page);

      if (newImages && newImages.hits && newImages.hits.length > 0) {
        this.setState(prevState => ({
          images:
            page === 1
              ? newImages.hits
              : [...prevState.images, ...newImages.hits],
        }));
      } else {
        toast.error('Sorry, no photo at your request(');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Error fetching images. Please try again later.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchImageName = async newName => {
    this.setState({ query: newName, page: 1, images: [] });
  };

  handleLoadMore = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = image => {
    const { largeImageURL, tags } = image;
    this.setState({
      showModal: true,
      largeImageURL,
      tagImage: tags,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
      tagImage: '',
    });
  };

  render() {
    const { query, images, isLoading, showModal, largeImageURL, tagImage } =
      this.state;

    return (
      <AppStyled>
        {isLoading && <Spinner />}
        <SearchBar onSubmit={this.handleSearchImageName} />
        {query && (
          <ImageGallery images={images} onClickModal={this.openModal} />
        )}
        {query && (
          <BtnLoadMore onClick={this.handleLoadMore}>Load More</BtnLoadMore>
        )}
        {showModal && (
          <Modal onCloseModal={this.closeModal}>
            <img src={largeImageURL} alt={tagImage} />
          </Modal>
        )}
        <Toaster position="top-center" reverseOrder={false} />
      </AppStyled>
    );
  }
}

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
