import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Error } from './index'; 
import { Pokedex, loading, WTP, loadingText, errorIcon } from '../constants/icons';
import '../global.css';

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
      <View className="w-full flex-1 justify-center items-center bg-gray-100">
        <Image source={WTP} className="h-12 w-80" />
        <Text className="text-lg font-regular text-secondary text-center mt-4">
          Discover and learn about Pokemon
        </Text>
        <Image source={loading} className="w-32 h-32 mt-8 mb-4" />
        <Image source={loadingText} className="w-24 h-10" />
        <Image source={Pokedex} className="w-[364px] h-[550px] -mt-20" />
      </View>
    );
  }

  return <Error message="Loading took too long. Please retry." icon={errorIcon} />;
};

export default Welcome;