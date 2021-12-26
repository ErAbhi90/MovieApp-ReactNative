import React from 'react';
import Home from '../screens/home';
import Details from '../screens/details';
import Navbar from '../components/navbar';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../screens/search';

const Stack = createStackNavigator();

class MainNav extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerMode: 'screen',
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <Navbar navigation={navigation} main={true} />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <Navbar navigation={navigation} main={false} />
            ),
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <Navbar navigation={navigation} main={false} />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNav;
