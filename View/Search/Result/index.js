import React, { useEffect, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import WebView from 'react-native-webview';


const Result = ({ route }) => {
  const { link } = route.params;

  return (
    <>
      
        <View style={styles.container}>
            <WebView 
                source={{ uri: link }}
                style={styles.webView} 
                allowsInlineMediaPlayback={true}
                allowsFullscreenVideo={false}
                mediaPlaybackRequiresUserAction={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  webView: {
    width: '100%',
    height: 360,
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

export default Result;
