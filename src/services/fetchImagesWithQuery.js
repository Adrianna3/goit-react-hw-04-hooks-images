import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImagesWithQuery = async (searchQuery, page) => {
  try {
    const params = new URLSearchParams({
      key: '28305156-2c31ea34b0b957161935cfaa0',
      q: searchQuery,
      lang: 'pl',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page,
    });

    const response = await axios.get(`?${params}`);
    return response.data;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }
};
