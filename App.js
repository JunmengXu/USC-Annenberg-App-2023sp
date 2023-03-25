import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './View/Home';
import AudioScreen from './View/Audio';
import MeScreen from './View/Me';
import PopularScreen from './View/Popular';
import SearchScreen from './View/Search';
import DetailedNews from './View/Home/DetailedNews';
import { NewsContextProvider } from './View/Context/newsContext';
import { AudioContextProvider } from './View/Context/audioContext';
import { VideoContextProvider } from './View/Context/videoContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeNews" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="NewsDetail" component={DetailedNews} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function MeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MeScreen" component={MeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="NewsDetail" component={DetailedNews} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    // Redux context share
    <NewsContextProvider>
      <AudioContextProvider>
        <VideoContextProvider>
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
                  } else if (route.name === 'Video') {
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
                tabBarActiveTintColor: '#9a0000',
                tabBarInactiveTintColor: 'gray',
              })}
            >
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="Radio" component={AudioScreen} />
              <Tab.Screen name="Video" component={PopularScreen} />
              <Tab.Screen name="Search" component={SearchScreen} />
              <Tab.Screen name="Me" component={MeStack} />
            </Tab.Navigator>
          </NavigationContainer>
        </VideoContextProvider>
      </AudioContextProvider>
    </NewsContextProvider>
  );
}
