import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

import {authenticateUser} from '../Redux/action/authActions';
import Button from '../Components/Button';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username && password) {
      try {
        const storedCredentials = await Keychain.getInternetCredentials('user');
        if (storedCredentials) {
          const decryptedUserData = JSON.parse(storedCredentials.password);
          const {username: storedUsername, password: storedPassword} =
            decryptedUserData;

          if (username === storedUsername && password === storedPassword) {
            dispatch(authenticateUser({username}));

            navigation.navigate('App');
          } else {
            console.log('Invalid credentials');
          }
        } else {
          console.log('No stored credentials found');
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log('Please enter valid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/movies-app.png')}
        style={{height: 100, width: 100, bottom: 80}}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} variant="primary" />
      <Text
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}>
        Don't have an account? Register here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9288F8',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '100%',
    paddingVertical: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 18,
    paddingHorizontal: 20,
  },
  registerLink: {
    marginTop: 15,
    color: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  validationError: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
