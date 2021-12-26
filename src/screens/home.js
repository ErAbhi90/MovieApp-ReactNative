import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  getPopularMovies,
  getPopularTvShows,
  getUpcomingMovies,
  getFamilyGenreMovies,
  getDocumentaries,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/list';
import Error from '../components/error';
const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [upcomingMovieImages, setMovieImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTvShows, setPopularTvShows] = useState();
  const [familyGenreMovies, setFamilyGenreMovies] = useState();
  const [allDocumentaries, setDocumentaries] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTvShows(),
      getFamilyGenreMovies(),
      getDocumentaries(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvShowsData,
          familyGenreMoviesData,
          allDocumentariesData,
        ]) => {
          const upcomingMoviesImages = [];
          upcomingMoviesData.forEach(movie => {
            upcomingMoviesImages.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });
          setMovieImages(upcomingMoviesImages);
          setPopularMovies(popularMoviesData);
          setPopularTvShows(popularTvShowsData);
          setFamilyGenreMovies(familyGenreMoviesData);
          setDocumentaries(allDocumentariesData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView>
          {upcomingMovieImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={upcomingMovieImages}
                dotStyle={styles.sliderDots}
                sliderBoxHeight={dimensions.height / 2}
                autoplay={true}
                circleLoop={true}
              />
            </View>
          )}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}
          {popularTvShows && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Tv Shows"
                content={popularTvShows}
              />
            </View>
          )}
          {familyGenreMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyGenreMovies}
              />
            </View>
          )}
          {allDocumentaries && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documenatries"
                content={allDocumentaries}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderDots: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default Home;
