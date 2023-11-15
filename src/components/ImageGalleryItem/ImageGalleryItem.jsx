export const ImageGalleryItem = ({ items }) => {
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
