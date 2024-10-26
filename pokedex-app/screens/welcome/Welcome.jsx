import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Error } from '../index'; 
import styles from './welcome.style'; 
import { Pokedex, loading, WTP, loadingText, errorIcon } from '../../constants/icons';

const Welcome = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        navigation.navigate('Error', { message: 'Loading took too long. Please retry.' });
      }
    }, 20000); // 20-second timeout

    return () => clearTimeout(timeoutId); 
  }, [isLoading, navigation]);

  useEffect(() => {
    const handleNavigationAfterLoad = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      setIsLoading(false); 
      navigation.navigate("PokemonGrid");
    };

    if (isLoading) {
      handleNavigationAfterLoad();
    }
  }, [isLoading, navigation]);

  if (isLoading) {
    return (
      <View style={styles.container} >
        <Image source={WTP} style={styles.WTP} />
        <Text style={styles.text}>Discover and learn about Pokemon</Text>
        <Image source={loading} style={styles.loading} />
        <Image source={loadingText} style={styles.loadingText} />
        <Image source={Pokedex} style={styles.Pokedex} />
      </View>
    );
  }

  return <Error message="Loading took too long. Please retry." icon={errorIcon} />;
};

export default Welcome;