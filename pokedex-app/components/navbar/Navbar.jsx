import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import filterIcon from '../../assets/icons/filter.png'; 
import styles from './navbar.style'; // Uncomment this line to import styles

const Navbar = () => {
  return (
    <View>
    <Image source={filterIcon}/>
      <TextInput placeholder="Name Or Id"/>
    </View>
  )
}

export default Navbar;