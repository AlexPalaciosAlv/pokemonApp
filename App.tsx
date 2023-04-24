import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
//import {Navigator} from './src/navigator/navigator';
import {Tabs} from './src/navigator/Tabs';

export const App = () => {
  return (
    <>
      <NavigationContainer>
        {/* <Navigator /> */}
        <Tabs />
      </NavigationContainer>
    </>
  );
};
