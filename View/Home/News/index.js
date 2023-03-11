import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, Card, Image } from '@rneui/themed';

const News = () => {

  const navigation = useNavigation();
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

        // const datetime = new Date(Date.parse(date));
        
        // const year = datetime.getFullYear();
        // const month = ('0' + (datetime.getMonth() + 1)).slice(-2); // add leading zero and ensure 2 digits
        // const day = ('0' + datetime.getDate()).slice(-2); // add leading zero and ensure 2 digits
        // const hours = ('0' + datetime.getHours()).slice(-2); // add leading zero and ensure 2 digits
        // const minutes = ('0' + datetime.getMinutes()).slice(-2); // add leading zero and ensure 2 digits

        // const formattedDatetimeString = `${year}-${month}-${day} ${hours}:${minutes}`;
        // console.log(formattedDatetimeString);
        
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
        const imgdom = $('.Image__StyledPicture-sc-8yioqf-0 img').attr('src');
        const datetime = $('#main > div > div:nth-child(2) > div > time').text();
        
        newData.push({
          title: data[i].title,
          link: data[i].link,
          date: datetime,
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
                  <TouchableOpacity
                    onPress={() => navigation.navigate('NewsDetail', { link: n.link })}
                  >
                    <Card key={n.link}>
                    <Card.Title>{n.title}</Card.Title>
                    <Card.Divider />
                      <View style={styles.user}>
                        <Image
                          source={{ uri: n.img }}
                          containerStyle={styles.item}
                          PlaceholderContent={<ActivityIndicator />}
                        />
                        <Text style={styles.description}>{n.description}</Text>
                        <Text style={styles.date}>{n.date}</Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
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

