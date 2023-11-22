import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({ image }) => {
  return (
    <GalleryItem>
      <GalleryImage src={image.webformatURL} alt={image.tags} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;
