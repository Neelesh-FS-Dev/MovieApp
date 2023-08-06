import {
  ADD_TO_FAVORITES,
  ADD_TO_WATCHLIST,
  FETCH_MOVIES_SUCCESS,
} from '../action/actionTypes';

const initialState = {
  movies: [],
  favorites: [],
  watchlist: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_SUCCESS:
      return {...state, movies: action.payload};
    case ADD_TO_FAVORITES:
      return {...state, favorites: [...state.favorites, action.payload]};
    case ADD_TO_WATCHLIST:
      return {...state, watchlist: [...state.watchlist, action.payload]};
    default:
      return state;
  }
};

export default movieReducer;
