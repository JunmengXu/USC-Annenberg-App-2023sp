import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './View/Home';
import AudioScreen from './View/Audio';
import MeScreen from './View/Me';
import PopularScreen from './View/Popular';
import SearchScreen from './View/Search';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Radio') {
              iconName = focused 
                ? 'ios-headset' 
                : 'ios-headset-outline';
            } else if (route.name === 'Popular') {
              iconName = focused 
                ? 'ios-aperture' 
                : 'ios-aperture-outline';
            } else if (route.name === 'Search') {
              iconName = focused 
                ? 'ios-search-circle' 
                : 'ios-search-circle-outline';
            } else if (route.name === 'Me') {
              iconName = focused
                ? 'ios-person-circle' 
                : 'ios-person-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Radio" component={AudioScreen} />
        <Tab.Screen name="Popular" component={PopularScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Me" component={MeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
