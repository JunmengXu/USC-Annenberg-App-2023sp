import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import Medias from './Medias';
import Favorites from './Favorites';

const Me = () => {
return (
  <>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Find Us Here:</Text>
        <Medias/>
        <Favorites/>
      </View>
    </ScrollView>
  </>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
},
text: {
  // fontFamily: 'Arial',
  // fontSize: 16,
  // fontWeight: '400',
  // color: '#333',
  // lineHeight: 24,
  // letterSpacing: 0.5,
  // marginLeft: 10,
  fontFamily: 'GreatVibes-Regular',
  color: 'grey',
  fontSize: 18,
  fontWeight: 'bold',
  fontStyle: 'italic',
  textAlign: 'center',
  textTransform: 'uppercase',
  padding: 8,
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
});

export default Me;