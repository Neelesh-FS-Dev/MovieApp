/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {
  removeFromFavorites,
  removeFromWatchlist,
} from '../Redux/action/movieActions';
import {useNavigation} from '@react-navigation/native';
import Button from '../Components/Button';

const FavoritesScreen = ({favorites, watchlist, dispatch}) => {
  const navigation = useNavigation(); // Get the navigation object

  const handleRemoveFromFavorites = movie => {
    dispatch(removeFromFavorites(movie));
  };

  const handleRemoveFromWatchlist = movie => {
    dispatch(removeFromWatchlist(movie));
  };

  const renderMovieItem = (item, isFavorite) => (
    <View style={styles.movieContainer}>
      <Image
        style={styles.movieImage}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        }}
      />
      <View style={{flexWrap: 'wrap'}}>
        {/* <Text style={styles.movieTitle}>{item.title}</Text> */}
      </View>
      <TouchableOpacity
        onPress={() =>
          isFavorite
            ? handleRemoveFromFavorites(item)
            : handleRemoveFromWatchlist(item)
        }>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
      {favorites.length === 0 ? (
        <Button
          variant="secondary"
          title="Go to Home"
          onPress={() => navigation.goBack()}
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderMovieItem(item, true)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      )}

      <Text style={styles.title}>Watchlist</Text>
      {watchlist.length === 0 ? (
        <Button
          variant="secondary"
          title="Go to Home"
          onPress={() => navigation.goBack()}
        />
      ) : (
        <FlatList
          data={watchlist}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderMovieItem(item, false)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    marginTop: 40,
  },
  movieContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  movieImage: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
  },
  movieTitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  removeButton: {
    color: 'red',
    marginTop: 5,
  },
});

const mapStateToProps = state => ({
  favorites: state.movie.favorites,
  watchlist: state.movie.watchlist,
});

export default connect(mapStateToProps)(FavoritesScreen);
