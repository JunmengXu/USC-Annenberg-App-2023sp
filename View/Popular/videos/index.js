import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { Text, Card, } from '@rneui/themed';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { VideoContext } from '../../Context/videoContext';

const Videos = ({videos}) => {

  const {videoData, updateVideoData } = useContext(VideoContext);

  const handleLike = (item) => {
    let updatedLikedVideo;
    const index = videoData.findIndex(videos => videos.link === item.link);

    if (index === -1) {
      // If video is not in likedVideo, add it
      updatedLikedVideo = [...videoData, item];
    } else {
      // If video is already in likedVideo, remove it
      updatedLikedVideo = [...videoData];
      updatedLikedVideo.splice(index, 1);
    }

    // Save updated likedVideo to AsyncStorage
    AsyncStorage.setItem('likedVideo', JSON.stringify(updatedLikedVideo)).then(() => {
      updateVideoData(updatedLikedVideo);
    });
  };

  return (
    <>
        <ScrollView>
            <View>
                {videos.map((v, i) => {
                  const isLiked = videoData.findIndex(videos => videos.videoId === v.videoId) !== -1;
                    return (
                        <Card key={v.videoId}>
                            <Card.Title style={styles.title}>{v.title}</Card.Title>
                            <Card.Divider />
                                <View style={styles.title}>
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
                                            <Text style={styles.date}>{v.date}</Text>
                                        </View>
                                    </ScrollView>
                                    <TouchableOpacity onPress={() => handleLike(v)} style={styles.marker}>
                                        <Ionicons name={isLiked ? 'star' : 'star-outline'} size={30} color={isLiked ? '#9a0000' : '#9a0000'} />
                                    </TouchableOpacity>
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
      marker: {
        position: 'absolute',
        bottom: -8, // adjust the value to change the distance from the bottom
        right: 5, // adjust the value to change the distance from the right
        padding: 3, // adjust the padding as needed
        borderRadius: 5, // adjust the border radius as needed
      },
      date: {
        fontSize: 11,
        marginTop: 5,
        color: "grey",
      },
  });

export default Videos;

  