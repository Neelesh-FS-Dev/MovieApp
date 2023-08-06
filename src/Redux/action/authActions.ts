import {
  AUTHENTICATE_USER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from './actionTypes'; // Import your action type constant
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authenticateUser = userData => {
  return dispatch => {
    dispatch({type: AUTHENTICATE_USER, payload: userData});
  };
};

export const registerUser = userData => async dispatch => {
  try {
    const {username, email, password, phoneNumber} = userData;
    const encryptedUserData = JSON.stringify(userData);

    await new Promise(resolve => setTimeout(resolve, 1000));

    await Keychain.setInternetCredentials('user', username, encryptedUserData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));

    dispatch({type: REGISTER_SUCCESS});
  } catch (error) {
    dispatch({type: REGISTER_FAILURE, payload: error.message});
  }
};
