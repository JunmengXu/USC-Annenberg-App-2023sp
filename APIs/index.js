import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { Text } from 'react-native';

const Crawler = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://www.uscannenbergmedia.com/listen/from-where-we-are/');
      const html = response.data;
      const $ = cheerio.load(html);
      setTitle($('body').text());
    };
    fetchData();
  }, []);

  return (
    <Text>{title}</Text>
  );
};

export default Crawler;
