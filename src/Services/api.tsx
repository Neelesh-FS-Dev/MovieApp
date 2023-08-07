import axios from 'axios';

const API_KEY = '605d631c24d58410fc11dd1bd191dd07';

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/popular',
      {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page: 1,
        },
      },
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return [];
  }
};
