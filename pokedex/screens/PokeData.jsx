import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native'; 
import { getPokemonStats } from '../constants/api'; 
import { searchIcon, homeIcon, filterIcon, chevronLeft, chevronRight } from '../constants/icons';

const PokeData = () => {
  const route = useRoute();
  const { pokemonName } = route.params; 

  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonName) {
      setError('Pokémon name is required.');
      setLoading(false);
      return;
    }

    const fetchPokemonData = async () => {
      try {
        const data = await getPokemonStats(pokemonName);
        setPokemonData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!pokemonData) {
    return <Text>No Pokémon data found.</Text>;
  }

  const handleEvolutionClick = () => {
    if (pokemonData) {
      navigation.navigate('Evolutions', { pokemonName: pokemonData.name, pokemonId: pokemonData.id });
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

      <TouchableOpacity onPress={() => navigation.navigate('PokemonGrid')}>
              <Image source={homeIcon} />
            </TouchableOpacity> 
            <TouchableOpacity onPress={handleEvolutionClick}>
             <Text>Check Evolution</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PokeData;