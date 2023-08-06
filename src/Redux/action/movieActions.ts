// movieActions.js

import {
  FETCH_MOVIES_SUCCESS,
  ADD_TO_FAVORITES,
  ADD_TO_WATCHLIST,
} from './actionTypes';
// import api from '../../services/api'; // Assuming you have an API service file

export const fetchMoviesSuccess = movies => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});

export const addToFavorites = movieId => ({
  type: ADD_TO_FAVORITES,
  payload: movieId,
});

export const addToWatchlist = movieId => ({
  type: ADD_TO_WATCHLIST,
  payload: movieId,
});

// export const fetchMovies = () => {
//   return async dispatch => {
//     try {
//       const response = await api.get('/movies'); // Example API endpoint
//       const movies = response.data;
//       dispatch(fetchMoviesSuccess(movies));
//     } catch (error) {
//       console.error('Error fetching movies:', error);
//     }
//   };
// };
