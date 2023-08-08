/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../Components/Button';

const ProfileScreen = ({navigation}) => {
  const userData = useSelector(state => state.auth.userData);
  console.log(userData);
  const handleLogout = async () => {
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
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{userData.username}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Mobile Number:</Text>
          <Text style={styles.value}>{userData.phoneNumber}</Text>
        </View>
      </View>
      <Button title="Logout" onPress={handleLogout} variant="secondary" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  profileContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  infoContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  value: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
});

export default ProfileScreen;
