import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const MovieItem = ({movie, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={styles.movieImage}
          source={{uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}}
        />
        <Text style={{textAlign: 'center', marginTop: 10, color: '#fff'}}>
          {movie.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieImage: {
    width: 150,
    height: 200,
    margin: 20,
    resizeMode: 'cover',
  },
});

export default MovieItem;
