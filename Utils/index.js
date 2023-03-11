import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const ImageButton = ({ onPress, source }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} />
    </TouchableOpacity>
  );
};

export default ImageButton;