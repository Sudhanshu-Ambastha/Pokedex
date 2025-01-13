import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Echo, Romeo, shinyRomeo, Oscar, Exclamation, Zero } from '../../constants/icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const Error = ({ onRetry }) => {
  const navigation = useNavigation();

  const handleRetry = () => {
    const routes = navigation.getState().routes;
    if (routes.length > 1) {
      navigation.goBack();
    } else {
      navigation.navigate('PokemonGrid');
    }
  };

  // Load the custom PokeFont
  const [fontsLoaded] = useFonts({
    'PokeFont': require('../../assets/fonts/PokemonSolid.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <View className="flex-1 bg-gray-100 justify-center items-center">
      <View className="flex justify-center items-center mt-20 pb-40 bg-gray-100">
        <Text className="text-3xl font-bold text-gray-400 font-poke">
          E    r     r     o    r       !
        </Text>

        <View className="flex-row justify-center items-center my-5">
          <Image source={Echo} className="w-12 h-12 mx-1" resizeMode="contain" />
          <Image source={Romeo} className="w-12 h-12 mx-1" resizeMode="contain" />
          <Image source={shinyRomeo} className="w-12 h-12 mx-1" resizeMode="contain" />
          <Image source={Oscar} className="w-12 h-12 mx-1" resizeMode="contain" />
          <Image source={shinyRomeo} className="w-12 h-12 mx-1" resizeMode="contain" />
          <Image source={Exclamation} className="w-12 h-12 mx-1" resizeMode="contain" />
        </View>

        <View className="flex-row justify-center items-center">
          <Text className="text-4xl font-bold text-gray-700 font-poke">4</Text>
          <Image source={Zero} className="w-10 h-10 mx-2" resizeMode="contain" />
          <Text className="text-4xl font-bold text-gray-700 font-poke">4</Text>
          <Text className="text-xl font-bold text-red-500 mt-2 font-poke"> Not found</Text>
        </View>

        <TouchableOpacity className="mt-5 px-4 py-2 bg-red-500 rounded-md" onPress={handleRetry}>
          <Text className="text-white text-lg font-poke">Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Error;
