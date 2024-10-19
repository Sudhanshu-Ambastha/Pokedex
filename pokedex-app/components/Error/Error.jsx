import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Echo, Romeo, shinyRomeo, Oscar, Exclamation, Zero } from '../../constants/icons';
import styles from './error.style';

const Error = ({ onRetry }) => {
  return (
    <View style={styles.container}>
    <View style={styles.errorContainer}>
      <View><Text style={styles.error}>E      r     r     o     r     !</Text></View>
      <View style={styles.imageRow}>
        <Image source={Echo} style={styles.unownImage}  resizeMode="contain"/>
        <Image source={Romeo} style={styles.unownImage}  resizeMode="contain"/>
        <Image source={shinyRomeo} style={styles.unownImage}  resizeMode="contain"/>
        <Image source={Oscar} style={styles.unownImage}  resizeMode="contain"/>
        <Image source={shinyRomeo} style={styles.unownImage}  resizeMode="contain"/>
        <Image source={Exclamation} style={styles.unownImage}  resizeMode="contain"/>
      </View>

      <View style={styles.textRow}>
        <Text style={styles.errorText}>4</Text> 
        <Image source={Zero} style={styles.electrodeImage} resizeMode="contain"/>
        <Text style={styles.errorText}>4</Text>
        <Text style={styles.notFoundText}> Not found</Text>
      </View>

      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default Error;

