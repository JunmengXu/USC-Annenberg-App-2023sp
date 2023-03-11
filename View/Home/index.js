import React from 'react';
import { View, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import News from './News'

const Home = ({ navigation }) => {
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

export default Home;