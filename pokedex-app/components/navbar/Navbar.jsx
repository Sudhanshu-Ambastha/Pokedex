import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import filterIcon from '../../assets/icons/filter.png'; 
import search from '../../assets/icons/search.png'; 
// import styles from './navbar.style'; // Uncomment this line to import styles

const Navbar = () => {
  return (
    <View>
    <Image source={filterIcon}/>
      <TextInput placeholder="Name Or Id"/>
    <Image source={search}/>  
    </View>
  )
}

export default Navbar;