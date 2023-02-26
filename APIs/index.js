import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

const Crawler = () => {

  const [title, setTitle] = useState('');
  const [news:{list:[]}, setNews] = useState({list:[]});
  const users = [
  {
    name: 'brynn',
    avatar: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg',
  },
  {
    name: 'thot leader',
    avatar:
      'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
  }];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://www.uscannenbergmedia.com/arcio/rss/');
      const html = response.data;
      const $ = cheerio.load(html);
      const page = cheerio.load(html);
      const curNews = [];

      $('item').each(function(i, elem) {
        const title = $(elem).find('title').text();
        const link = $(elem).find('link').text();
        const date = $(elem).find('pubDate').text();
        const description = $(elem).find('description').text();

        curNews.push({
          title: title,
          link: link,
          date: date,
          description: description,
        });
      });

        console.log(curNews);
      const newsTitle = setTitle($('title').text());

      setNews({news: curNews});
    };
    fetchData();
  }, []);

  return (
  <>
    <ScrollView>
        <View>
            <Text>{title}</Text>
            <Card>
              <Card.Title>CARD WITH DIVIDER</Card.Title>
              <Card.Divider />
              {news.map((n, i) => {
                return (
                  <View key={i} style={styles.user}>
                    <Text style={styles.name}>{n.title}</Text>
                  </View>
                );
              })}
            </Card>
        </View>
    </ScrollView>
  </>
  );
};

export default Crawler;

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
        flexDirection: 'row',
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
});

