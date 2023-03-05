import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import WebView from 'react-native-webview';

const SpotifyRadio = () => {
  const embedUrl = "https://open.spotify.com/embed/episode/0JhiPH8neYIscxS8bV9FSc?utm_source=generator";

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component
            structure than actual design.
      </Text>
      <WebView 
        source={{ uri: embedUrl }}
        style={styles.webView} 
        allowsInlineMediaPlayback={true}
        allowsFullscreenVideo={false}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
