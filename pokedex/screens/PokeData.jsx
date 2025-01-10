import React from 'react';
import { View, Text, Image } from 'react-native';

const PokeData = ({ name, sprite, height, weight, baseStats }) => {
  return (
    <View className="flex-1 p-4 bg-gray-100 rounded-lg">
      {/* Name Section */}
      <Text className="text-xl font-bold text-center text-gray-800 capitalize mb-4">
        {name}
      </Text>

      {/* Sprite Section */}
      <View className="items-center mb-4">
        <Image source={{ uri: sprite }} className="w-32 h-32" resizeMode="contain" />
      </View>

      {/* Physical Attributes */}
      <View className="flex-row justify-around mb-4">
        <Text className="text-gray-700 text-base">Height: {height} dm</Text>
        <Text className="text-gray-700 text-base">Weight: {weight} hg</Text>
      </View>

      {/* Base Stats */}
      <View className="bg-white shadow rounded-lg p-4">
        <Text className="text-lg font-semibold text-gray-800 mb-2">Base Stats</Text>
        <View className="space-y-2">
          <Text className="text-gray-700">HP: {baseStats.hp}</Text>
          <Text className="text-gray-700">Attack: {baseStats.attack}</Text>
          <Text className="text-gray-700">Defense: {baseStats.defense}</Text>
          <Text className="text-gray-700">Special Attack: {baseStats.specialAttack}</Text>
          <Text className="text-gray-700">Special Defense: {baseStats.specialDefense}</Text>
          <Text className="text-gray-700">Speed: {baseStats.speed}</Text>
        </View>
      </View>
    </View>
  );
};

export default PokeData;
