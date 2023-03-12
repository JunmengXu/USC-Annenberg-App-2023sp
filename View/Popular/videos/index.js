import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Image } from '@rneui/themed';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import cheerio from 'cheerio';


const Videos = ({videos}) => {

  return (
    <>
        <ScrollView>
            <View>
                {videos.map((v, i) => {
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

  