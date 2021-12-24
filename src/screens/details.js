import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  View,
  Modal,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {getMoviesById} from '../services/services';
import dateFormat from 'dateformat';
import PlayButton from '../components/play_button';
import Video from '../components/video';

const placeholderImage = require('../../assets/images/no_img_available.jpg');

const height = Dimensions.get('screen').height;

const Details = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetails, setMovieDetails] = useState();

  /* const [movieVideo, setMovieVideo] = useState(); */
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMoviesById(movieId).then(movieData => {
      setMovieDetails(movieData);
      setLoaded(true);
    });
    /*  const movieTrailers = [];
    getMovieVideo(movieId).then(video => {
      video
        .filter(videoUrl => videoUrl.type === 'Trailer')
        .map(videos => {
          movieTrailers.push('https://www.youtube.com/watch?v=' + videos.key);
        });
      setMovieVideo(movieTrailers[0]);
    }); */
  }, [movieId]);

  const showVideo = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              style={styles.image}
              source={
                movieDetails.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetails.poster_path,
                    }
                  : placeholderImage
              }
              resizeMode="stretch"
            />

            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton onClick={showVideo} />
              </View>

              <Text style={styles.title}>{movieDetails.title}</Text>

              <Text style={styles.releaseDate}>
                {'Release Date: ' +
                  dateFormat(movieDetails.release_date, 'mmmm dd, yyyy')}
              </Text>

              {movieDetails.genres && (
                <View style={styles.genresContainer}>
                  {movieDetails.genres.map(genre => {
                    return (
                      <Text key={genre.id} style={styles.genres}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}

              <StarRating
                disabled={true}
                maxStars={5}
                starSize={30}
                rating={movieDetails.vote_average / 2}
                fullStarColor={'gold'}
              />

              <Text style={styles.overview}>{movieDetails.overview}</Text>
            </View>
          </ScrollView>

          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.modal}>
              <Video onClose={() => showVideo()} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height / 2.2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  genres: {
    marginRight: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  starStyle: {
    height: 30,
    marginBottom: 5,
  },
  releaseDate: {
    fontWeight: 'bold',
    color: 'red',
  },
  overview: {
    padding: 20,
    textAlign: 'justify',
    fontSize: 16,
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 25,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;
