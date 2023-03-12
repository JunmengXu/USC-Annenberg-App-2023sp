import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from '@rneui/themed';
import WebView from 'react-native-webview';

const SpotifyRadio = ({radios}) => {
  
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
            {radios.map((r, i) => {
              return (
                <Card key={r.link}>
                <Card.Title>{r.title}</Card.Title>
                <Card.Divider />
                  <View style={styles.user}>
                    <WebView 
                      source={{ uri: r.radio }}
                      style={styles.webView} 
                      allowsInlineMediaPlayback={true}
                      allowsFullscreenVideo={false}
                      mediaPlaybackRequiresUserAction={false}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                      />
                    <Text style={styles.description}>{r.description}</Text>
                    <Text style={styles.date}>By{r.author}</Text>
                    <Text style={styles.date}>- {r.date}</Text>
                  </View>
                </Card>
              );
            })}
        </View>
      </ScrollView>
    </>
  );
};

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
  webView: {
    width: '100%',
    height: 360,
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

export default SpotifyRadio;
