import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { chevronLeft, homeIcon, chevronRight } from '../constants/icons';
import Error from './Error';
import { getEvolutionChain, getSpriteUrl } from '../../constants/api';
import '../global.css';

type Evolution = {
  name: string;
  id: string;
};

type ImageUrl = {
  id: string;
  url: string;
};

type EvolutionPageProps = {
  route: any;
  navigation: any;
};

const EvolutionPage: React.FC<EvolutionPageProps> = ({ route, navigation }) => {
  const [evolutionData, setEvolutionData] = useState<Evolution[]>([]);
  const [error, setError] = useState<string>('');
  const [currentChainId, setCurrentChainId] = useState<number>(1);
  const [imageUrls, setImageUrls] = useState<ImageUrl[]>([]);
  const spriteType = "normal";

  useEffect(() => {
    fetchEvolutionData(currentChainId);
  }, [currentChainId]);

  const fetchEvolutionData = async (chainId: number) => {
    try {
      const chainData = await getEvolutionChain(chainId);

      const evolutions: Evolution[] = [];
      const getAllEvolutions = (chain: any) => {
        evolutions.push({
          name: chain.species.name,
          id: chain.species.url.split('/').filter(Boolean).pop(),
        });
        chain.evolves_to.forEach(getAllEvolutions);
      };

      getAllEvolutions(chainData.chain);
      setEvolutionData(evolutions);
      setError('');

      const initialUrls = evolutions.map((evolution) => ({
        id: evolution.id,
        url: getSpriteUrl({ name: evolution.name }, 'GIF', spriteType, '', '', ''),
      }));

      setImageUrls(initialUrls);
    } catch (err: any) {
      setError(err.message);
      setEvolutionData([]);
    }
  };

  const handleNavigate = (direction: 'left' | 'right') => {
    setCurrentChainId((prevId) => (direction === 'left' ? Math.max(prevId - 1, 1) : prevId + 1));
  };

  const handleImageError = (evolutionId: string) => {
    setImageUrls((prevUrls) =>
      prevUrls.map((item) =>
        item.id === evolutionId
          ? { ...item, url: getSpriteUrl(evolutionId, 'normal', '', '', 'male') }
          : item
      )
    );
  };

  const renderEvolution = () => {
    if (!evolutionData.length) {
      return (
        <View className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
          <Text className="text-lg font-bold text-gray-500">No Evolution Data Available</Text>
        </View>
      );
    }

    return evolutionData.map((evolution) => {
      const imageUrl = imageUrls.find((item) => item.id === evolution.id)?.url;

      return (
        <TouchableOpacity
          key={evolution.id}
          className="bg-gray-100 p-6 rounded-lg flex items-center justify-center mb-4"
          onPress={() => navigation.navigate('PokeData', { pokemonName: evolution.name })}
        >
          <Image
            source={{ uri: imageUrl }}
            className="w-24 h-24 mb-2"
            resizeMode="contain"
            onError={() => handleImageError(evolution.id)}
          />
          <Text className="text-xl font-semibold text-gray-800">
            {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View className="flex-1 bg-white p-4">
      {error ? (
        <Error message={error} onRetry={() => fetchEvolutionData(currentChainId)} />
      ) : (
        <>
          <ScrollView contentContainerClassName="flex flex-col items-center">
            {renderEvolution()}
          </ScrollView>
          <View className="flex flex-row items-center justify-between mt-4">
            <TouchableOpacity className="bg-blue-500 p-3 rounded-full" onPress={() => handleNavigate('left')}>
              <Image source={chevronLeft} className="w-6 h-6 tint-white" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-500 p-3 rounded-full" onPress={() => navigation.goBack()}>
              <Image source={homeIcon} className="w-6 h-6 tint-white" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-500 p-3 rounded-full" onPress={() => handleNavigate('right')}>
              <Image source={chevronRight} className="w-6 h-6 tint-white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default EvolutionPage;
