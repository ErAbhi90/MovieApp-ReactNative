import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/card';
import Error from '../components/error';
import {searchMovieOrTvShows} from '../services/services';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = query => {
    Promise.all([
      searchMovieOrTvShows(query, 'movie'),
      searchMovieOrTvShows(query, 'tv'),
    ])
      .then(([movies, tvShows]) => {
        const data = [...movies, ...tvShows];
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
  };
  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={'Search Movie or TV Show'}
              onChangeText={onChangeText}
              value={text}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}>
            <Icon name={'search-outline'} size={30} color={'#000'} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}
          {searchResults && searchResults.length === 0 && (
            <View style={styles.empty}>
              <Text> No results matching your criteria.</Text>
              <Text> Try different keywords.</Text>
            </View>
          )}

          {!searchResults && (
            <View style={styles.empty}>
              <Text> Type something to start searching</Text>
            </View>
          )}

          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 0.5,
    height: 50,
    padding: 8,
  },
  container: {
    padding: 10,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  searchItems: {padding: 5},
  empty: {paddingTop: 10, paddingLeft: 10},
});

export default Search;
