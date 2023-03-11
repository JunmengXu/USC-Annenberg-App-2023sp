import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { useNavigation } from '@react-navigation/native';
import { Button, View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { Text, Card, Image } from '@rneui/themed';

const News = ({ news }) => {

  const navigation = useNavigation();
  
  return (
  <>
    <ScrollView>
        <View>
          {news.map((n, i) => {
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
                    {n.date !== undefined &&
                      <Text style={styles.date}>{n.date}</Text>
                    }
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
    </ScrollView>
  </>
  );
};

export default News;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    title: {
        color:"black",
        fontSize:20,
        padding: 10,
    },
    fonts: {
        marginBottom: 8,
    },
    user: {
        flexDirection: 'column',
        marginBottom: 6,
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        marginTop: 5,
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
    item: {
      aspectRatio: 1,
      width: '100%',
      flex: 1,
    },
    undefinedItem: {
      height: 40,
      resizeMode: 'contain',
    },
});

