import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';


const Search = () => {
  const [searchText, setSearchText] = useState('');

  // function to handle search button press
  const handleSearch = () => {
    // combine user input with search URL
    const searchUrl = `https://www.uscannenbergmedia.com/search/?query=${searchText}`;

    // navigate to search URL in WebView
    setWebViewUrl(searchUrl);
  };

  // state to hold WebView URL
  const [webViewUrl, setWebViewUrl] = useState(null);

  const fadeInValue = useRef(new Animated.Value(0)).current;
  const fadeOutValue = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.timing(fadeInValue, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(fadeOutValue, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => {
        fadeInValue.setValue(0);
        fadeOutValue.setValue(1);
        startAnimation();
      });
    });
  };

  const fadeInStyle = {
    opacity: fadeInValue,
  };

  const fadeOutStyle = {
    opacity: fadeOutValue,
  };

  const textStyle = {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#9a0000',
  };




  
  return (
    <View style={styles.container}>
      {!webViewUrl && 
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search news"
          placeholderTextColor="#999"
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>}
      {webViewUrl && <WebView source={{ uri: webViewUrl }} style={styles.webView}/>}
      
      <TouchableOpacity onPress={startAnimation}>
      <View style={styles.box}>
        <Animated.Text style={[styles.text, fadeInStyle, fadeOutStyle, textStyle]}>
          Annenberg Media
        </Animated.Text>
      </View>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    width: '100%',
    height: 700,
    top: 0,
    left: 0,
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#9a0000',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  box: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
});

export default Search;