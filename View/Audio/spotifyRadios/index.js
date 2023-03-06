import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from '@rneui/themed';
import WebView from 'react-native-webview';

const SpotifyRadio = () => {
  const embedUrl = "https://open.spotify.com/embed/episode/0JhiPH8neYIscxS8bV9FSc?utm_source=generator";
  const [radios, setRadios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://www.uscannenbergmedia.com/arn/');
      const html = response.data;
      const $ = cheerio.load(html);
      const curRadios = [];

      $('.list-item').each(function(i, elem) {
        const title = $(elem).find('.results-list--headline-container a').text();
        const halflink = $(elem).find('.results-list--headline-container > a').attr('href');
        const description = $(elem).find('.results-list--description-author-container > a > p').text();
        const author = $(elem).find('.results-list--description-author-container > div > section > span.ts-byline__names').text();
        const date = $(elem).find('.results-list--description-author-container > div > time').text();
        const link = 'https://www.uscannenbergmedia.com' + halflink;
        
        curRadios.push({
          title: title,
          link: link,
          description: description,
          author: author,
          date: date,
          radio: null,
        });
        
      });

      setRadios(curRadios);
      return curRadios;
    };
    
    const fetchRadios = async () => {
      const data = await fetchData();
      const newData = [];

      for(let i=0; i<data.length; i++) {
        // console.log(i, data[i].link)
        const curresponse = await axios.get(data[i].link);
        const curhtml = curresponse.data;
        const $ = cheerio.load(curhtml);
        const target = $('iframe').attr('src');
        
        
        newData.push({
          title: data[i].title,
          link: data[i].link,
          description: data[i].description,
          author: data[i].author,
          date: data[i].date,
          radio: target,
        });
      }

      setRadios(newData);

    };
    fetchRadios();

  }, []);

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
