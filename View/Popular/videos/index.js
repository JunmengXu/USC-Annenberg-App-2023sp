import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Image } from '@rneui/themed';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import cheerio from 'cheerio';


const Videos = () => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://www.youtube.com/feeds/videos.xml?channel_id=UCRhQCjsEqWvA6Iq_WKD1CoA');
      const html = response.data;
      const $ = cheerio.load(html);
      const curVideos = [];
      
      $('entry').each(function(i, elem) {
        const videoId = $(elem).find('yt\\:videoId').text();
        const title = $(elem).find('title').text();
        const date = $(elem).find('published').text();
        const description = $(elem).find('media\\:description').text();
        const fullVideoId = 'https://www.youtube.com/embed/'+videoId;

        curVideos.push({
          videoId: fullVideoId,
          title: title,
          date: date,
          description: description,
        });
      });
      

      setVideos(curVideos);
    };

    fetchData();

  }, []);



  return (
    <>
        <ScrollView>
            <View>
                {videos.map((v, i) => {
                    return (
                        <Card>
                            <Card.Title style={styles.title}>{v.title}</Card.Title>
                            <Card.Divider />
                                <View key={v.videoId} style={styles.title}>
                                    <WebView
                                        source={{ uri: v.videoId }}
                                        allowsInlineMediaPlayback={true}
                                        allowsFullscreenVideo={false}
                                        mediaPlaybackRequiresUserAction={false}
                                        javaScriptEnabled={true}
                                        domStorageEnabled={true}
                                        style={styles.webView}
                                    />
                                    <ScrollView style={styles.desView}>
                                        <View style={styles.cardContent}>
                                            <Text style={styles.description}>{v.description}</Text>
                                        </View>
                                    </ScrollView>
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
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
        marginBottom: 16,
        overflow: 'hidden',
      },
      webViewContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
      },
      webView: {
        width: '100%',
        height: 360,
        top: 0,
        left: 0,
        zIndex: 1,
      },
      cardContent: {
        padding: 16,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      description: {
        fontSize: 14,
      },
      desView: {
        height: 200,
      },
  });

export default Videos;

  