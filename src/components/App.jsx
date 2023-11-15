import { Component } from 'react';
import { fetchImages } from 'services/api';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
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
  render() {
    const { images, isLoading } = this.state;

    return (
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <form>{/* ваша форма */}</form>
            <ImageGalleryItem items={images} />
            <button>Load More</button>
          </>
        )}
      </div>
    );
  }
}
