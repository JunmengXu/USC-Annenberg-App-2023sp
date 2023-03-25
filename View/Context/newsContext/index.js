import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsContext = createContext();

const NewsContextProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Load data from AsyncStorage on mount
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem('likedNews');
        setNewsData(data ? JSON.parse(data) : []);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  const updateNewsData = async (newData) => {
    try {
      await AsyncStorage.setItem('likedNews', JSON.stringify(newData));
      setNewsData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NewsContext.Provider value={{ newsData, updateNewsData }}>
      {children}
    </NewsContext.Provider>
  );
};

export { NewsContext, NewsContextProvider };
