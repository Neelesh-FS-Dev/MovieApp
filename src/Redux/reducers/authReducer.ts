import {
  AUTHENTICATE_USER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from '../action/actionTypes';

const initialState = {
  userData: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {...state, userData: action.payload};

    case REGISTER_SUCCESS:
      return {...state, loading: false, error: null};

    case REGISTER_FAILURE:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

export default authReducer;
