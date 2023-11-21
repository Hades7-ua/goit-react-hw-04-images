import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?q=dog&page=1&key=37999116-3b925aa00aefce89ac64d9c93&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async (keyword = '', page = 1, perPage = 12) => {
  try {
    const response = await axios.get('', {
      params: {
        query: keyword,
        page: page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

// export const addNewName = async newName => {
//   const response = await axios.get('images', newName);
//   return response.data;
// };
