import {
  FETCH_MOVIES_SUCCESS,
  ADD_TO_FAVORITES,
  ADD_TO_WATCHLIST,
} from './actionTypes';

export const fetchMoviesSuccess = movies => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});

export const addToFavorites = movie => ({
  type: ADD_TO_FAVORITES,
  payload: movie,
});

export const addToWatchlist = movie => ({
  type: ADD_TO_WATCHLIST,
  payload: movie,
});
