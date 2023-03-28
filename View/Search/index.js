import React, { useState, useRef, useEffect } from 'react';
import { Animated, View, TextInput, Text, StyleSheet, TouchableOpacity, Dimensions, } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import cheerio from 'cheerio';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Search = () => {

  /**
   * Search Bar
   */
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
const [trendings, setTrendings] = useState([]);

const fetchTrendings = async () => {
  // const response = await axios.get('https://www.uscannenbergmedia.com/');
  // const html = response.data;
  // const $ = cheerio.load(html);
  // const curTrendings = [];

  // console.log($('#fusion-app > header > div:nth-child(8) > div.marquee-container').text()); 
  // $('#fusion-app > header > div:nth-child(8) > div.marquee-container > div:nth-child(1) > span').each(function(i, elem) {
  //   const title = $(elem).find('a').text();
  //   const link = $(elem).find('a').attr('href');
  //   console.log($(elem).text()); 
    
  //   curTrendings.push({
  //     title: title,
  //     link: link,
  //   });

  //   console.log(title);
  // });
  // console.log("title");
  // setTrendings(trendings);
  const url = 'https://www.uscannenbergmedia.com/';
  axios.get(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const marqueeContainer = $('#fusion-app > header > div:nth-child(8) > div.marquee-container');
    console.log(marqueeContainer.html());
  }).catch(error => {
    console.log(error);
  });
};

  useEffect(() => {
    // This function will only be executed once when the component mounts
    fetchTrendings();
  }, []);



  const data = ['Hello', 'World', 'React Native', 'Barrage', 'USC', 'Annenberg', 'Media'];
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    const newAnimations = data.map((text, index) => {
      const xPosition = new Animated.Value(Math.floor(Math.random() * 100) + screenWidth); // random x position
      const yPosition = new Animated.Value(Math.floor(Math.random() * 100) + index * 50); // random y position
      const duration = Math.floor(Math.random() * 20000) + 10000; // random duration
      const animation = Animated.timing(xPosition, {
        toValue: -100,
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
  }, []);

  
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
      {!webViewUrl && 
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
      </View>}
      {webViewUrl && <WebView source={{ uri: webViewUrl }} style={styles.webView}/>}
      
      
      {/* {data.map((text, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.text,
            animations[index] && {
              transform: [
                { translateX: animations[index].xPosition },
                { translateY: animations[index].yPosition },
              ],
            },
          ]}
        >
          {text}
        </Animated.Text>
      ))} */}

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
});

export default Search;