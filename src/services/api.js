import axios from 'axios';
axios.defaults.baseURL =
  'https://pixabay.com/api/?q=cat&page=1&key=37999116-3b925aa00aefce89ac64d9c93&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async () => {
  const responce = await axios.get('images');
  return responce.data;
};
