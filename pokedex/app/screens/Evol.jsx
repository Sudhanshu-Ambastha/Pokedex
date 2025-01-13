import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { chevronLeft, homeIcon, chevronRight } from '../../constants/icons';
import Error from './Error';
import { getPokemonEvolutionChain, getPokemonSprite } from '../../constants/api';
import { useFonts } from 'expo-font'; // Import the hook

const EvolutionPage = ({ route, navigation }) => {
  const { pokemonName } = route.params || {};
  const [evolutionData, setEvolutionData] = useState([]);
  const [error, setError] = useState('');
  const [sprites, setSprites] = useState([]);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);

  // Load the custom PokeFont
  const [fontsLoaded] = useFonts({
    'PokeFont': require('../../assets/fonts/PokemonSolid.ttf'),
  });

  // Listen to device width changes
  useEffect(() => {
    const handleResize = () => setDeviceWidth(Dimensions.get('window').width);
    Dimensions.addEventListener('change', handleResize);
    return () => Dimensions.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    fetchEvolutionData();
  }, [pokemonName]);

  const fetchEvolutionData = async () => {
    try {
      const evolutions = await getPokemonEvolutionChain(pokemonName);
      setEvolutionData(evolutions);
      setError('');

      // Fetch sprites for each evolution
      const spritePromises = evolutions.map((evolution) =>
        getPokemonSprite(evolution.name)
      );
      const spriteUrls = await Promise.all(spritePromises);
      setSprites(spriteUrls);
    } catch (err) {
      setError(err.message);
      setEvolutionData([]);
    }
  };

  const handlePrevious = () => {
    setCurrentPokemonIndex((prevIndex) =>
      prevIndex === 0 ? pokemonList.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentPokemonIndex((prevIndex) =>
      prevIndex === pokemonList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderEvolutionCards = () => {
    if (!evolutionData.length) {
      return (
        <View className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
          <Text className="text-lg font-poke text-gray-500">No Evolution Data Available</Text>
        </View>
      );
    }

    return evolutionData.map((evolution, index) => {
      const spriteUrl = sprites[index]; // Corresponding sprite URL

      return (
        <TouchableOpacity
          key={evolution.name}
          className="bg-gray-100 p-6 rounded-lg flex items-center justify-center"
          style={{
            marginHorizontal: 8, // Add horizontal spacing between cards
            marginVertical: 12,  // Add vertical spacing between rows
          }}
          onPress={() => navigation.navigate('PokeData', { pokemonName: evolution.name })}
        >
          <Image
            source={{ uri: spriteUrl }}
            className="w-24 h-24 mb-2"
            resizeMode="contain"
            onError={() => console.error(`Error loading sprite for ${evolution.name}`)}
          />
          <Text className="text-xl font-poke text-gray-800"> {/* Use PokeFont here */}
            {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="font-poke text-lg">Loading fonts...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      {error ? (
        <Error message={error} onRetry={fetchEvolutionData} />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{
              flexDirection: deviceWidth > 768 ? 'row' : 'column', 
              flexWrap: 'wrap', 
              justifyContent: 'center',
            }}
          >
            {renderEvolutionCards()}
          </ScrollView>

          <View className="flex flex-row justify-between items-center w-full px-6">
            <TouchableOpacity className="flex justify-center items-center p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300">
              <Image source={chevronLeft} className="w-4 h-4 text-gray-700" />
            </TouchableOpacity>

            <TouchableOpacity className="flex justify-center items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg transition"
             onPress={() => navigation.navigate('PokemonGrid')} >
              <Image source={homeIcon} />
            </TouchableOpacity>

            <TouchableOpacity className="flex justify-center items-center p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300">
              <Image source={chevronRight} className="w-4 h-4 text-gray-700" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default EvolutionPage;
