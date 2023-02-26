import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import News from './News'

const Home = () => {
return (
  <>
    <ScrollView>
      <View style={styles.container}>
        <News />
      </View>
    </ScrollView>
  </>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
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

export default Home;