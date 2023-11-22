import { LoadMoreBtn } from './LoadMoreBtn.styled';
export const BtnLoadMore = ({ onClick }) => {
  return (
    <LoadMoreBtn type="button" onClick={onClick}>
      Load More
    </LoadMoreBtn>
  );
};

export default BtnLoadMore;
