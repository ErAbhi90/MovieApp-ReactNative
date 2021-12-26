import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNav from './components/main_nav';

const App = () => {
  return (
    <NavigationContainer>
      <MainNav />
    </NavigationContainer>
  );
};

export default App;
