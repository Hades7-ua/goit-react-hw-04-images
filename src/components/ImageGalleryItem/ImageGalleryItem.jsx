import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({ image, onClickModal }) => {
  return (
    <GalleryItem>
      <GalleryImage
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onClickModal(image)}
      />
    </GalleryItem>
  );
};

export default ImageGalleryItem;
