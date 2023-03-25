import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, } from 'react-native';
import { Text, } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsContext } from '../../Context/newsContext';

const Favorites = () => {
  const { myData, updateMyData } = useContext(NewsContext);

  const handleLike = (item) => {
    let updatedLikedNews;
    const index = myData.findIndex(news => news.link === item.link);

    if (index === -1) {
      // If news is not in likedNews, add it
      updatedLikedNews = [...myData, item];
    } else {
      // If news is already in likedNews, remove it
      updatedLikedNews = [...myData];
      updatedLikedNews.splice(index, 1);
    }

    // Save updated likedNews to AsyncStorage
    AsyncStorage.setItem('likedNews', JSON.stringify(updatedLikedNews)).then(() => {
      updateMyData(updatedLikedNews);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.likedThingText}>Liked News:</Text>
      {myData.length > 0 ? (
        <View>
          {myData.map(item => {
            return (
              <View key={item.link} style={styles.likedNewsItem}>
                <View style={styles.newsText}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.author}>{item.author}</Text>
                </View>
                <TouchableOpacity onPress={() => handleLike(item)} style={styles.likedButton}>
                  <Text style={styles.likedText}>Unlike</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ) : (
        <Text style={styles.noLikedNewsText}>No liked news yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  likedThingText:{
    fontFamily: 'Lobster-Regular',
    color: '#9a0000',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    // textAlign: 'center',
    textTransform: 'uppercase',
  },
  newsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  likedNewsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: 'gray',
  },
  likeButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#DBDBDB',
  },
  likedButton: {
    backgroundColor: '#FF4D4D',
    borderRadius: 5,
    padding: 10,
  },
  likeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  likedButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  likedText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  noLikedNewsText: {
    alignSelf: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default Favorites;
