import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Echo, Romeo, shinyRomeo, Oscar, Exclamation, Zero } from '../../constants/icons';
import { useNavigation } from '@react-navigation/native';
import styles from './error.style';

const Error = ({ onRetry }) => {
  const navigation = useNavigation();

  const handleRetry = () => {
    const routes = navigation.getState().routes;
    // Check if there's a previous route
    if (routes.length > 1) {
      navigation.goBack(); // Go back to the previous route
    } else {
      navigation.navigate('PokemonGrid'); // If no previous route, navigate to PokemonGrid
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.errorContainer}>
        <View><Text style={styles.error}>E    r     r     o    r       !</Text></View>
        <View style={styles.imageRow}>
          <Image source={Echo} style={styles.unownImage} resizeMode="contain" />
          <Image source={Romeo} style={styles.unownImage} resizeMode="contain" />
          <Image source={shinyRomeo} style={styles.unownImage} resizeMode="contain" />
          <Image source={Oscar} style={styles.unownImage} resizeMode="contain" />
          <Image source={shinyRomeo} style={styles.unownImage} resizeMode="contain" />
          <Image source={Exclamation} style={styles.unownImage} resizeMode="contain" />
        </View>

        <View style={styles.textRow}>
          <Text style={styles.errorText}>4</Text>
          <Image source={Zero} style={styles.electrodeImage} resizeMode="contain" />
          <Text style={styles.errorText}>4</Text>
          <Text style={styles.notFoundText}> Not found</Text>
        </View>

        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Error;
