import React, { Component } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { fetchImages } from 'services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    query: '',
    page: 1,
  };

  async componentDidMount() {
    await this.fetchInitialImages();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      await this.fetchImages();
    }
  }

  fetchInitialImages = async () => {
    this.setState({ isLoading: true });
    try {
      const initialImages = await fetchImages();
      this.setState({ images: initialImages.hits });
    } catch (error) {
      console.error('Error fetching initial images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const newImages = await fetchImages(query, page);
      this.setState(prevState => ({
        images: newImages.hits,
      }));
    } catch (error) {
      toast.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchImageName = async newName => {
    try {
      this.setState({ query: newName, page: 1 }, () => {
        this.fetchImages();
      });
    } catch (error) {
      toast.error('ERROR!!! Write name for search!');
    }
  };

  render() {
    const { images, isLoading } = this.state;

    return (
      <div>
        {isLoading ? (
          <p>
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </p>
        ) : (
          <>
            <SearchBar onSubmit={this.handleSearchImageName} />
            <ImageGallery images={images} />

            <button>Load More</button>
          </>
        )}
      </div>
    );
  }
}
