import React from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

const FavoritesScreen = ({favorites, watchlist}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
      {favorites.length === 0 ? (
        <Text>No favorite movies yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={movie => movie.id.toString()}
          renderItem={({item}) => (
            <View style={styles.movieContainer}>
              <Image
                style={styles.movieImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
              />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      )}

      <Text style={styles.title}>Watchlist</Text>
      {watchlist.length === 0 ? (
        <Text>No movies in watchlist yet.</Text>
      ) : (
        <FlatList
          data={watchlist}
          keyExtractor={movie => movie.id.toString()}
          renderItem={({item}) => (
            <View style={styles.movieContainer}>
              <Image
                style={styles.movieImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
              />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
          )}
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
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  movieContainer: {
    // marginBottom: 20,
    alignItems: 'center',
    // marginTop: 50,
  },
  movieImage: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
  },
  movieTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D8D9DA',

    textAlign: 'center',
  },
  movieOverview: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  favorites: state.movie.favorites,
  watchlist: state.movie.watchlist, // Make sure this matches your reducer structure
});

export default connect(mapStateToProps)(FavoritesScreen);
