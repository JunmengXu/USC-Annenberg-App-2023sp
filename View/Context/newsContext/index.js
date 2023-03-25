import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsContext = createContext();

const NewsContextProvider = ({ children }) => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    // Load data from AsyncStorage on mount
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem('likedNews');
        setMyData(data ? JSON.parse(data) : []);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  const updateMyData = async (newData) => {
    try {
      await AsyncStorage.setItem('likedNews', JSON.stringify(newData));
      setMyData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NewsContext.Provider value={{ myData, updateMyData }}>
      {children}
    </NewsContext.Provider>
  );
};

export { NewsContext, NewsContextProvider };
