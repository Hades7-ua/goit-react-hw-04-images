import React, { Component } from 'react';

import toast from 'react-hot-toast';
import { fetchImages } from 'services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/Searchbar';
import { BtnLoadMore } from './ButtonLoadMore/LoadMoreBtn';
import Spinner from './Loader/Spinner';
export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: false,
    query: '',
    page: 1,
    showModal: false,
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

  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const newImages = await fetchImages(query, page);
      this.setState(prevState => ({
        images:
          page === 1
            ? newImages.hits
            : [...prevState.images, ...newImages.hits],
      }));
    } catch (error) {
      toast.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchImageName = async newName => {
    this.setState({ query: newName, page: 1 });
  };

  handleLoadMore = async () => {
    // const { query, page } = this.state;
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading } = this.state;

    return (
      <div>
        {isLoading && <Spinner />}
        <>
          <SearchBar onSubmit={this.handleSearchImageName} />
          <ImageGallery images={images} />
          <BtnLoadMore onClick={this.handleLoadMore}>Load More</BtnLoadMore>
        </>
      </div>
    );
  }
}

export default App;
