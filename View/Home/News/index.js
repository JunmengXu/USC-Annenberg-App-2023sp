import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Card, Image } from '@rneui/themed';

const News = () => {

  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://www.uscannenbergmedia.com/arcio/rss/');
      const html = response.data;
      const $ = cheerio.load(html);
      const curNews = [];

      $('item').each(function(i, elem) {
        const title = $(elem).find('title').text();
        const link = $(elem).find('guid').text();
        const date = $(elem).find('pubDate').text();
        const description = $(elem).find('description').text();
        
        curNews.push({
          title: title,
          link: link,
          date: date,
          description: description,
          img: null,
        });
      });
      

      setNews(curNews);
      return curNews;
    };
    
    const fetchImg = async () => {
      const data = await fetchData();
      const newData = [];

      for(let i=0; i<data.length; i++) {
        // console.log(i, data[i].link)
        const curresponse = await axios.get(data[i].link);
        const curhtml = curresponse.data;
        const $ = cheerio.load(curhtml);
        const target = $('.Image__StyledPicture-sc-8yioqf-0 img');
        const imgdom = $(target).attr('src');
        
        newData.push({
          title: data[i].title,
          link: data[i].link,
          date: data[i].date,
          description: data[i].description,
          img: imgdom,
        });
      }

      setNews(newData);

    };
    fetchImg();

  }, []);

  return (
  <>
    <ScrollView>
        <View>
              {news.map((n, i) => {
                return (
                  <Card>
                  <Card.Title>{n.title}</Card.Title>
                  <Card.Divider />
                    <View key={n.link} style={styles.user}>
                      <Image
                        source={{ uri: n.img }}
                        containerStyle={styles.item}
                        PlaceholderContent={<ActivityIndicator />}
                      />
                      <Text style={styles.description}>{n.description}</Text>
                      <Text style={styles.date}>{n.date}</Text>
                    </View>
                  </Card>
                );
              })}
        </View>
    </ScrollView>
  </>
  );
};

export default News;

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
});

