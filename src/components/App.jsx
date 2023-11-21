import { Component } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from 'services/api';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { SearchBar } from './SearchBar/Searchbar';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    query: '',
    page: 1,
  };
  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const initialImages = await fetchImages();
      // console.log(initialImages);
      this.setState({ images: initialImages.hits });
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.handleSearchImageName();
    }
  }

  handleSearchImageName = async newName => {
    try {
      this.setState({ isLoading: true });
      console.log('Searching for:', newName);
      const addName = await fetchImages(newName);
      this.setState({ images: addName.hits, query: newName, page: 1 });
      console.log('Images found:', addName.hits);
    } catch (error) {
      toast.error('ERROR!!! Write name for search!');
    } finally {
      this.setState({ isLoading: false });
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
            <ImageGalleryItem items={images} />
            <button>Load More</button>
          </>
        )}
      </div>
    );
  }
}
