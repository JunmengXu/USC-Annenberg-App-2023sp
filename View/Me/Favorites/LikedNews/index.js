import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Card, Image } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NewsContext } from '../../../Context/newsContext';
import { useNavigation } from '@react-navigation/native';

const LikedNews = () => {
    const { newsData, updateNewsData } = useContext(NewsContext);
  
    // used for redirecting detail news
    const navigation = useNavigation();
  
    const handleNewsLike = (item) => {
      let updatedLikedNews;
      const index = newsData.findIndex(news => news.link === item.link);
  
      console.log(item.img)
  
      if (index === -1) {
        // If news is not in likedNews, add it
        updatedLikedNews = [...newsData, item];
      } else {
        // If news is already in likedNews, remove it
        updatedLikedNews = [...newsData];
        updatedLikedNews.splice(index, 1);
      }
  
      // Save updated likedNews to AsyncStorage
      AsyncStorage.setItem('likedNews', JSON.stringify(updatedLikedNews)).then(() => {
        updateNewsData(updatedLikedNews);
      });
    };
  
    return (
        <ScrollView>
            <View style={styles.container}>
                {/* <Text style={styles.likedThingText}>Liked News</Text> */}
                {newsData.length > 0 ? (
                <View>
                    {newsData.map(n => {
                    return (
                        <TouchableOpacity
                        key={n.link}
                        onPress={() => navigation.navigate('NewsDetail', { link: n.link })}
                        >
                        <Card>
                        <Card.Title>{n.title}</Card.Title>
                        <Card.Divider />
                            <View style={styles.user}>
                            {n.img !== undefined && <Image
                                source={{ uri: n.img }}
                                containerStyle={styles.item}
                                PlaceholderContent={<ActivityIndicator />}
                            />}
                            {n.img === undefined && <Image
                                source={{ uri: 'https://www.uscannenbergmedia.com/pf/resources/uscamlogo.png?d=51' }}
                                containerStyle={styles.undefinedItem}
                                PlaceholderContent={<ActivityIndicator />}
                            />}
                            <Text style={styles.description}>{n.description}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {n.date !== undefined &&
                                <Text style={styles.date}>{n.date}</Text>
                                }
                                <TouchableOpacity onPress={() => handleNewsLike(n)} style={styles.marker}>
                                <Ionicons name={'star'} size={30} color={'#9a0000'} />
                                </TouchableOpacity>
                            </View>
                            </View>
                        </Card>
                        </TouchableOpacity>
                    );
                    })}
                </View>
                ) : (
                <Text style={styles.noLikedNewsText}>No liked news yet.</Text>
                )}
            </View>
        </ScrollView>
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
      fontFamily: 'Chalkboard SE',
      color: '#9a0000',
      fontSize: 24,
      fontWeight: 'bold',
      fontStyle: 'normal',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    noLikedNewsText: {
      alignSelf: 'center',
      marginTop: 20,
      fontWeight: 'bold',
    },
    marker: {
      position: 'absolute',
      bottom: -8, // adjust the value to change the distance from the bottom
      right: 5, // adjust the value to change the distance from the right
      padding: 3, // adjust the padding as needed
      borderRadius: 5, // adjust the border radius as needed
    },
    item: {
      aspectRatio: 1,
      width: '100%',
      flex: 1,
    },
    undefinedItem: {
      height: 40,
      resizeMode: 'contain',
    },
    description: {
      fontSize: 16,
      marginTop: 5,
    },
    date: {
      fontSize: 11,
      marginTop: 5,
      color: "grey",
    },
  });
  
  export default LikedNews;
  