import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import movieReducer from '../reducers/movieReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
