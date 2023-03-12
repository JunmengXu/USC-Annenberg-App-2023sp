import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = () => {
    const [likedArticles, setLikedArticles] = useState([]);

  const handleLike = (article) => {
    setLikedArticles([...likedArticles, article]);
    AsyncStorage.setItem('likedArticles', JSON.stringify([...likedArticles, article]));
  };

  useEffect(() => {
    AsyncStorage.getItem('likedArticles').then((articles) => {
      if (articles !== null) {
        setLikedArticles(JSON.parse(articles));
      }
    });
  }, []);

  return (
    <View>
      <Text>News articles</Text>
      {likedArticles.map((article) => (
        <View key={article.id}>
          <Text>{article.title}</Text>
          <Button title="Like" onPress={() => handleLike(article)} />
        </View>
      ))}
      <Text>Liked articles:</Text>
      {likedArticles.map((article) => (
        <Text key={article.id}>{article.title}</Text>
      ))}
    </View>
  );
};
    
const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
},
fonts: {
    marginBottom: 8,
},
user: {
    flexDirection: 'row',
    marginBottom: 6,
},
image: {
    height: 50,
    marginLeft: 5,
    marginRight: 5,
},
name: {
    fontSize: 16,
    marginTop: 5,
},
});
    
export default Favorites;
