import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import Crawler from '../../APIs';


const Popular = () => {
return (
  <>
    <ScrollView>
      <View style={styles.container}>
        <Card>
          <Card.Title>Popular</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            }}
          />
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component
            structure than actual design.
          </Text>
        </Card>
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