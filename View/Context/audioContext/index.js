import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AudioContext = createContext();

const AudioContextProvider = ({ children }) => {
  const [audioData, setAudioData] = useState([]);

  useEffect(() => {
    // Load data from AsyncStorage on mount
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem('likedAudio');
        setAudioData(data ? JSON.parse(data) : []);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  const updateAudioData = async (newData) => {
    try {
      await AsyncStorage.setItem('likedAudio', JSON.stringify(newData));
      setAudioData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AudioContext.Provider value={{ audioData, updateAudioData }}>
      {children}
    </AudioContext.Provider>
  );
};

export { AudioContext, AudioContextProvider };
