import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';
import '../global.css';

// Define a TypeScript type for the component props
interface PokeDataProps {
  name: string;
  sprite: string;
  height: number;
  weight: number;
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const PokeData: React.FC<PokeDataProps> = ({ name, sprite, height, weight, baseStats }) => {
  return (
    <StyledView className="flex-1 p-4 bg-gray-100 rounded-lg">
      {/* Name Section */}
      <StyledText className="text-xl font-bold text-center text-gray-800 capitalize mb-4">
        {name}
      </StyledText>

      {/* Sprite Section */}
      <StyledView className="items-center mb-4">
        <StyledImage source={{ uri: sprite }} className="w-32 h-32" resizeMode="contain" />
      </StyledView>

      {/* Physical Attributes */}
      <StyledView className="flex-row justify-around mb-4">
        <StyledText className="text-gray-700 text-base">Height: {height} dm</StyledText>
        <StyledText className="text-gray-700 text-base">Weight: {weight} hg</StyledText>
      </StyledView>

      {/* Base Stats */}
      <StyledView className="bg-white shadow rounded-lg p-4">
        <StyledText className="text-lg font-semibold text-gray-800 mb-2">Base Stats</StyledText>
        <StyledView className="space-y-2">
          <StyledText className="text-gray-700">HP: {baseStats.hp}</StyledText>
          <StyledText className="text-gray-700">Attack: {baseStats.attack}</StyledText>
          <StyledText className="text-gray-700">Defense: {baseStats.defense}</StyledText>
          <StyledText className="text-gray-700">Special Attack: {baseStats.specialAttack}</StyledText>
          <StyledText className="text-gray-700">Special Defense: {baseStats.specialDefense}</StyledText>
          <StyledText className="text-gray-700">Speed: {baseStats.speed}</StyledText>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default PokeData;
