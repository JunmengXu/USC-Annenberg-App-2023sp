import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    // Load data from AsyncStorage on mount
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem('likedVideo');
        setVideoData(data ? JSON.parse(data) : []);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  const updateVideoData = async (newData) => {
    try {
      await AsyncStorage.setItem('likedVideo', JSON.stringify(newData));
      setVideoData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VideoContext.Provider value={{ videoData, updateVideoData }}>
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoContextProvider };
