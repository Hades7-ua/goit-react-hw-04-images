import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?q=cat&page=1&key=37999116-3b925aa00aefce89ac64d9c93&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async (query = '', page = 1) => {
  try {
    const response = await axios.get('', {
      params: {
        q: query,
        page,
        per_page: 12,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
