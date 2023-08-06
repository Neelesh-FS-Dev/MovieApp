import {View, Text} from 'react-native';
import React from 'react';
import AppNavigator from './src/Navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/Redux/store/store';
import Navigation from './src/Navigation';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
