import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../themes/colors';

const propTypes = {
  main: PropTypes.bool,
};
const defaultProps = {
  main: false,
};

class Navbar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
            <Image
              style={styles.logo}
              source={require('../assets/images/movie_logo.png')}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Icon name={'search-outline'} size={30} color={Colors.black} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name={'chevron-back'} size={40} color={Colors.black} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
  },
  mainNav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  test: {color: '#0efffd'},
});

Navbar.defaultProps = defaultProps;
Navbar.propTypes = propTypes;

export default Navbar;
