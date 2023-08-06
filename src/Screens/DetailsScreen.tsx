import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import Button from '../Components/Button';
import {useDispatch} from 'react-redux';
import {addToWatchlist, addToFavorites} from '../Redux/action/movieActions';

const DetailsScreen = ({route}) => {
  const {movie} = route.params; // Assuming you pass the movie object as a route parameter
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(movie)); // Action to add to favorites
  };

  const handleAddToWatchlist = () => {
    dispatch(addToWatchlist(movie)); // Action to add to watchlist
  };
  return (
    <ScrollView>
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)" />
      <View style={styles.container}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}}
          style={styles.movieImage}
        />
        <Text style={styles.movieName}>{movie.title}</Text>
        <Text style={styles.movieRatings}>Ratings: {movie.vote_average}</Text>
        <Text style={styles.movieDescription}>{movie.overview}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Add to Favorites"
            onPress={handleAddToFavorites}
            variant="primary"
          />
          <Button
            title="Add to Watchlist"
            onPress={handleAddToWatchlist}
            variant="secondary"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    bottom: 30,
  },
  movieImage: {
    width: 430,
    height: 590,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  movieName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieRatings: {
    fontSize: 18,
    marginBottom: 10,
  },
  movieDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
export default DetailsScreen;
