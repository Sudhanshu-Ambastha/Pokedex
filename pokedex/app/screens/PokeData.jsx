import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getPokemonStats } from '../../constants/api';
import { loadingText, homeIcon, chevronLeft, chevronRight } from '../../constants/icons';

const PokeData = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
  const { pokemon, pokemonList } = route.params; // Fetch pokemonList from route params

  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ensure pokemonList is available
  useEffect(() => {
    if (!pokemonList) {
      setError('Pokemon list is required.');
      setLoading(false);
      return;
    }

    const index = pokemonList.findIndex(p => p.name === pokemon.name);
    if (index >= 0) {
      setCurrentIndex(index);
    } else {
      setError('Pokemon not found in the list.');
      setLoading(false);
    }
  }, [pokemon, pokemonList]);

  // Fetch pokemon stats once the pokemon name is available
  useEffect(() => {
    if (!pokemon?.name) {
      setError('Pokémon name is required.');
      setLoading(false);
      return;
    }

    const fetchPokemonData = async () => {
      try {
        const data = await getPokemonStats(pokemon.name);
        setPokemonData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemon?.name]);

  
  if (loading) {
    return <Image source={loadingText} className="w-[100px] h-[40px] mt-[123px] mx-[9px] z-10" />;
  }
  
  if (error) {
    return <Text>Error: {error}</Text>;
  }
  
  if (!pokemonData) {
    return <Text>No Pokémon data found.</Text>;
  }
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      navigation.navigate('PokeData', { pokemon: pokemonList[currentIndex - 1], pokemonList });
    }
  };
  
  const handleEvolutionClick = () => {
    if (pokemonData) {
      navigation.navigate('Evolutions', { pokemonName: pokemonData.name, pokemonId: pokemonData.id });
    }
  };
  
  const handleNext = () => {
    if (currentIndex < pokemonList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      navigation.navigate('PokeData', { pokemon: pokemonList[currentIndex + 1], pokemonList });
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-100 rounded-lg">
      {/* Name Section */}
      <Text className="text-xl font-bold text-center text-gray-800 capitalize mb-4">
        {pokemonData.name.toUpperCase()}
      </Text>

      {/* Sprite Section */}
      <View className="items-center mb-4">
        <Image
          source={{ uri: pokemonData.spriteUrl }}
          className="w-32 h-32"
          resizeMode="contain"
        />
      </View>

      {/* Physical Attributes */}
      <View className="flex-row justify-around mb-4">
        <Text className="text-gray-700 text-base">Height: {pokemonData.height} dm</Text>
        <Text className="text-gray-700 text-base">Weight: {pokemonData.weight} hg</Text>
      </View>

      {/* Base Stats */}
      <View className="bg-white shadow rounded-lg p-4">
        <Text className="text-lg font-semibold text-gray-800 mb-2">Base Stats</Text>
        <View className="space-y-2">
          <Text className="text-gray-700">HP: {pokemonData.stats.hp}</Text>
          <Text className="text-gray-700">Attack: {pokemonData.stats.attack}</Text>
          <Text className="text-gray-700">Defense: {pokemonData.stats.defense}</Text>
          <Text className="text-gray-700">Special Attack: {pokemonData.stats.specialAttack}</Text>
          <Text className="text-gray-700">Special Defense: {pokemonData.stats.specialDefense}</Text>
          <Text className="text-gray-700">Speed: {pokemonData.stats.speed}</Text>
        </View>
      </View>

      {/* Pagination Section */}
      <View className="flex flex-col items-center space-y-4 mt-4">
        <View className="flex flex-row justify-between items-center w-full px-6">
          <TouchableOpacity 
            onPress={handlePrevious} 
            disabled={currentIndex === 0}
            className="flex justify-center items-center p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
          >
            <Image source={chevronLeft} className="w-4 h-4 text-gray-700" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('PokemonGrid')} 
            className="flex justify-center items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg transition"
          >
            <Image source={homeIcon} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleNext} 
            disabled={currentIndex === pokemonList.length - 1}
            className="flex justify-center items-center p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
          >
            <Image source={chevronRight} className="w-4 h-4 text-gray-700" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={handleEvolutionClick} 
          className="flex justify-center items-center bg-yellow-400 text-black px-4 py-2 text-lg font-bold rounded-lg shadow-md hover:bg-yellow-500 hover:-translate-y-0.5 hover:shadow-lg transition"
        >
          <Text>Check Evolution</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PokeData;
