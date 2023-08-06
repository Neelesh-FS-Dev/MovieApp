/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../Components/Button';

const ProfileScreen = ({navigation}) => {
  const userData = useSelector(state => state.auth.userData);

  const handleLogout = async () => {
    // Show an alert to confirm logout
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Logout', onPress: async () => await logoutUser()},
      ],
      {cancelable: true},
    );
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };
  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={{fontSize: 24, fontWeight: '600'}}>
          Username: {userData.username}
        </Text>

        {/* Display more user details if available */}
        <Text style={styles.subtitle}>My Favorite Movies</Text>
        {/* Display favorite movies here */}
        <Text style={styles.subtitle}>My Watchlist</Text>
        {/* Display watchlist movies here */}
      </View>
      <Button title="Logout" onPress={handleLogout} variant="secondary" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light gray background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark gray text color
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ProfileScreen;
