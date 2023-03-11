import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import Crawler from '../../APIs';
import Videos from './videos'


const Popular = () => {
return (
  <>
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://www.uscannenbergmedia.com/pf/resources/uscamlogo.png?d=51' }}
        style={styles.image}
      />
      <ScrollView>
        <View style={styles.container}>
          <Videos />
        </View>
      </ScrollView>
    </View>
  </>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
},
fonts: {
  marginBottom: 8,
},
user: {
  flexDirection: 'row',
  marginBottom: 6,
},
image: {
  height: 50,
  marginLeft: 5,
  marginRight: 5,
},
name: {
  fontSize: 16,
  marginTop: 5,
},
});

export default Popular;