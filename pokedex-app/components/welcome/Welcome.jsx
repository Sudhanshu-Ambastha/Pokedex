import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { Pokedex, loading, WTP, loadingText} from '../../constants/icons';

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();

  return (
    <View>
       <View style={styles.container}>
        <Image source={WTP} style={styles.WTP}/>
        <Text style={styles.text}>Discover and learn about Pokemon</Text>
        <Image source={loading} style={styles.loading}/>
        <Image source={loadingText} style={styles.loadingText}/>
        <Image source={Pokedex} style={styles.Pokedex}/>  
      </View>
    </View>
  );
};

export default Welcome;