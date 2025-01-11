import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WTP, loading, loadingText, Pokedex, errorIcon } from '../../constants/icons';
import  Error  from './Error';
import '../../global.css';


const Welcome = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (isLoading) {
  //       setIsLoading(false);
  //       navigation.navigate('Error', { message: 'Loading took too long. Please retry.' });
  //     }
  //   }, 20000); // 20-second timeout

  //   return () => clearTimeout(timeoutId);
  // }, [isLoading, navigation]);

  // useEffect(() => {
  //   const handleNavigationAfterLoad = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     setIsLoading(false);
  //     navigation.navigate('PokemonGrid');
  //   };

  //   if (isLoading) {
  //     handleNavigationAfterLoad();
  //   }
  // }, [isLoading, navigation]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Image source={WTP} className="w-[350px] h-[50px]" />
        <Text className="font-regular text-lg text-secondary text-center mt-4">
          Discover and learn about Pokemon
        </Text>
        <Image source={loading} className="w-[130px] h-[130px] mt-[210px] mb-[10px] mx-[10px] z-10" />
        <Image source={loadingText} className="w-[100px] h-[40px] mt-[123px] mx-[9px] z-10" />
        <Image source={Pokedex} className="w-[364px] h-[550px] mt-[-478px] mb-[10px] mx-[6px] z-0" />
      </View>
    );
  }

  return <Error message="Loading took too long. Please retry." icon={errorIcon} />;
};

export default Welcome;