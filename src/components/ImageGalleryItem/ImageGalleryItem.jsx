import styled from 'styled-components';
export const ImageGalleryItem = ({ items }) => {
  console.log('items:', items);
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <img src={item.webformatURL} alt={item.tags} />
        </li>
      ))}
    </ul>
  );
};
