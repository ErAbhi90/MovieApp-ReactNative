import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../themes/colors';

class PlayButton extends React.PureComponent {
  render() {
    const {onClick} = this.props;
    return (
      <Pressable style={styles.button} onPress={() => onClick()}>
        <Icon name={'caret-forward-outline'} size={30} color={Colors.white} />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: Colors.primary,
  },
});
export default PlayButton;
