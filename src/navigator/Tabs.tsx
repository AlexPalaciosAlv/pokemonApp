import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Tab1} from './Tab1';
import Icon from 'react-native-vector-icons/Ionicons';

import {Tab2Screen} from './Tab2';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#5856D6',
        tabBarLabelStyle: {marginBottom: 10},
        tabBarStyle: {
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderWidth: 0,
          elevation: 0,
          height: 80,
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Tab1}
        options={{
          tabBarLabel: 'listado',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={20} name="list-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={Tab2Screen}
        options={{
          tabBarLabel: 'listado',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={20} name="search-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
