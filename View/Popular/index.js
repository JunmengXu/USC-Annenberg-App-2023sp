import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import Crawler from '../../APIs';
import Videos from './videos'


const Popular = () => {
return (
  <>
    <ScrollView>
      <View style={styles.container}>
        <Videos />
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

export default Popular;