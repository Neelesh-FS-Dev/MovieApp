/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchPopularMovies} from '../Services/api';
import {useSelector} from 'react-redux';
import Button from '../Components/Button';
import MovieItem from '../Components/MovieItem';

const HomeScreen = ({navigation}) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userData = useSelector(state => state.auth.userData);
  const [sortOption, setSortOption] = useState('release_date');
  const [movies, setMovies] = useState([]);

  const navigateToDetails = movie => {
    navigation.navigate('Details', {movie});
  };
  useEffect(() => {
    const fetchMovies = async () => {
      const popularMovies = await fetchPopularMovies();
      setMovies(popularMovies);
    };
    fetchMovies();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setSearchLoading(true);

      if (searchQuery) {
        const response = await axios.get(
          'https://api.themoviedb.org/3/search/movie',
          {
            params: {
              api_key: '605d631c24d58410fc11dd1bd191dd07',
              language: 'en-US',
              query: searchQuery,
            },
          },
        );
        setSearchResults(response.data.results);
        console.log(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const renderHeader = () => {
    console.log('isAuthenticated:', isAuthenticated);

    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {isAuthenticated ? `Hello ${userData.username}` : 'Hello'}
        </Text>
      </View>
    );
  };

  const renderSearch = () => {
    return (
      <View style={styles.section}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TextInput
            style={{
              borderRadius: 20,
              borderWidth: 1,
              paddingHorizontal: 80,
              backgroundColor: '#fff',
            }}
            placeholder="Search movies..."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <Button
            variant="secondary"
            title="Search"
            onPress={handleSearch}
            disabled={searchLoading}>
            {searchLoading ? <ActivityIndicator color="#fff" /> : null}
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <Button
            title="Release Date"
            onPress={() => setSortOption('release_date')}
          />
          <Button title="Genre" onPress={() => setSortOption('genre')} />
          <Button title="Language" onPress={() => setSortOption('language')} />
          <Button
            title="Rating Range"
            onPress={() => setSortOption('rating')}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {searchResults.map(movie => (
            <TouchableOpacity
              key={movie.id}
              onPress={() => navigateToDetails(movie)}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={styles.movieImage}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 10,
                    color: '#fff',
                  }}>
                  {movie.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderTrendingMovies = () => {
    return (
      <View style={styles.section}>
        <Text style={{marginTop: 20, color: '#fff'}}>
          Trending Movies Slider
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {movies.map(movie => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onPress={() => navigateToDetails(movie)}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderAllMovies = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Movies</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {movies.map(movie => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onPress={() => navigateToDetails(movie)}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {isAuthenticated ? <Text>Add favorite footer</Text> : null}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#000" />

      {renderHeader()}
      {renderSearch()}
      {renderTrendingMovies()}
      {renderAllMovies()}
      {renderFooter()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 15,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  footer: {
    marginTop: 20,
  },
  movieImage: {
    width: 150,
    height: 200,
    margin: 20,
    resizeMode: 'cover',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },

  movieTitle: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default connect(state => ({
  isAuthenticated: state.auth.isAuthenticated,
}))(HomeScreen);
