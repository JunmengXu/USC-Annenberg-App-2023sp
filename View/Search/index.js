import React, { useState, useRef, useEffect } from 'react';
import { Animated, View, TextInput, Text, StyleSheet, TouchableOpacity, Dimensions, } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import he from "he";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Search = () => {
  const navigation = useNavigation();

  /**
   * Search Bar
   */
  const [searchText, setSearchText] = useState('');

  // function to handle search button press
  const handleSearch = () => {
    // combine user input with search URL
    const searchUrl = `https://www.uscannenbergmedia.com/search/?query=${searchText}`;
    navigation.navigate('Result', { link: searchUrl })
    // navigate to search URL in WebView
    // setWebViewUrl(searchUrl);
  };


  /**
   * Title animation
   */
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


  /**
  * Barrage animation
  */
  const onWebViewMessage = (event) => {
    const { data } = event.nativeEvent;

    const marqueeRegex = /<div class=\"marquee\" (.+?)>(.+?)<\/div>/;
    let match;

    if ((match =  marqueeRegex.exec(data)) !== null) {
      // console.log(match[0]);
    } else {
      console.log('No match found.');
    }

    const htmlString = match[0];

    const hrefRegex = /<a.*?href="(.*?)".*?>(.*?)<\/a>/g;

    const newBarrage = [];
    let hrefMatch;
    while ((hrefMatch = hrefRegex.exec(htmlString)) !== null) {
      const href = hrefMatch[1];
      const textOri = hrefMatch[2];
      const text = he.decode(textOri);
      newBarrage.push({ href, text });
      // console.log(href, text);
    }

    setBarrage(newBarrage);
    setShowBarrage(true);
  };


  const [barrage, setBarrage] = useState([
    // { text: 'Hello', href: 'https://www.uscannenbergmedia.com/' },
    // { text: 'World', href: 'https://www.uscannenbergmedia.com/' },
    // { text: 'React Native', href: 'https://www.uscannenbergmedia.com/' },
    // { text: 'USC', href: 'https://www.uscannenbergmedia.com/' },
    // { text: 'Annenberg', href: 'https://www.uscannenbergmedia.com/' },
    // { text: 'Media', href: 'https://www.uscannenbergmedia.com/' },
  ]);

  const [showBarrage, setShowBarrage] = useState(false);

  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    const newAnimations = barrage.map((text, index) => {
      const xPosition = new Animated.Value(Math.floor(Math.random() * 200) + screenWidth); // random x position
      const yPosition = new Animated.Value(Math.floor(Math.random() * 50) + index * 40); // random y position
      const duration = Math.floor(Math.random() * 15000) + 13000; // random duration
      const animation = Animated.timing(xPosition, {
        toValue: -600,
        duration: duration,
        useNativeDriver: true,
      });
      const loopingAnimation = Animated.loop(animation);
      loopingAnimation.start();
      return { xPosition, yPosition, duration, animation: loopingAnimation };
    });
    setAnimations(newAnimations);

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
    startAnimation();
  }, [barrage]);

  
  /**
   * render the page
   */
  return (
    <View style={styles.container}>
      {/* {!webViewUrl && 
      <TouchableOpacity onPress={startAnimation}>
        <View style={styles.box}>
          <Animated.Text style={[styles.text, fadeInStyle, fadeOutStyle, textStyle]}>
            Annenberg Media
          </Animated.Text>
        </View>
      </TouchableOpacity>}
       */}
      
      {/* Search input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search Annenberg Media..."
          placeholderTextColor="#999"
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      
      {/* Get barrage by webview */}
      {!showBarrage && <WebView
      style={styles.webViewT}
      source={{ uri: 'https://www.uscannenbergmedia.com/' }}
      injectedJavaScript={`
        const divContent = document.getElementById('fusion-app').innerHTML;
        window.ReactNativeWebView.postMessage(divContent);
      `}
      onMessage={onWebViewMessage}
    />}

      {/* Show barrage */}
      {barrage.map(({text, href}, index) => (
        <TouchableOpacity
        style={[
          animations[index] && {
            transform: [
              { translateX: animations[index].xPosition },
              { translateY: animations[index].yPosition },
            ],
          }]}
        key={text+href}
        onPress={() => navigation.navigate('Result', { link: href })}
      >
        <Animated.Text>
          {text}
        </Animated.Text>
      </TouchableOpacity>
      ))}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 10,
  },
  barrageItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#9a0000',
    color: '#fff',
    marginHorizontal: 5,
  },
  webViewT:{
    opacity: 0, 
    height: 0 
  },
});

export default Search;