import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { chevronLeft, homeIcon, chevronRight } from '../../constants/icons';
import styles from './evol.style';
import Error from '../error/Error';
import { getEvolutionChain } from '../../constants/api'; 

const EvolutionPage = ({ route, navigation }) => {
  const [evolutionData, setEvolutionData] = useState([]);
  const [error, setError] = useState('');
  const [currentChainId, setCurrentChainId] = useState(1); 
  const [imageUrls, setImageUrls] = useState([]); 
  const spriteType = "normal"; 
  useEffect(() => {
    fetchEvolutionData(currentChainId);
  }, [currentChainId]);

  const fetchEvolutionData = async (chainId) => {
    try {
      const chainData = await getEvolutionChain(chainId); 

      const evolutions = [];
      const getAllEvolutions = (chain) => {
        evolutions.push({
          name: chain.species.name,
          id: chain.species.url.split('/').filter(Boolean).pop(),
        });
        chain.evolves_to.forEach(getAllEvolutions);
      };

      getAllEvolutions(chainData.chain);
      setEvolutionData(evolutions);
      setError('');

      // Initialize image URLs array with primary URLs
      const initialUrls = evolutions.map((evolution) => ({
        id: evolution.id,
        url: `https://projectpokemon.org/images/${spriteType}-sprite/${evolution.name}.gif`,
      }));
      setImageUrls(initialUrls);
    } catch (err) {
      setError(err.message);
      setEvolutionData([]);
    }
  };

  const handleNavigate = (direction) => {
    if (direction === 'left') {
      setCurrentChainId((prevId) => Math.max(prevId - 1, 1));
    } else if (direction === 'right') {
      setCurrentChainId((prevId) => prevId + 1);
    }
  };

  const handleImageError = (evolutionId) => {
    setImageUrls((prevUrls) =>
      prevUrls.map((item) =>
        item.id === evolutionId
          ? { ...item, url: `https://pokeapi-proxy.freecodecamp.rocks/api/v2/pokemon/${evolutionId}/sprites/front_default` }
          : item
      )
    );
  };

  const renderEvolution = () => {
    if (!evolutionData.length) {
      return (
        <View style={styles.item}>
          <Text style={styles.pokemonName}>No Evolution Data Available</Text>
        </View>
      );
    }

    return evolutionData.map((evolution) => {
      const imageUrl = imageUrls.find((item) => item.id === evolution.id)?.url;

      return (
        <TouchableOpacity
          key={evolution.id}
          style={styles.item}
          onPress={() => navigation.navigate('PokeData', { pokemonName: evolution.name })}
        >
          <Image
            source={{
              uri: imageUrl,
            }}
            style={styles.sprite}
            resizeMode="contain"
            onError={() => handleImageError(evolution.id)}
          />
          <Text style={styles.pokemonName}>
            {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      {error ? (
        <Error message={error} onRetry={() => fetchEvolutionData(currentChainId)} />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {renderEvolution()}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => handleNavigate('left')}>
              <Image source={chevronLeft} style={styles.chevronIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Image source={homeIcon} style={styles.buttonText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleNavigate('right')}>
              <Image source={chevronRight} style={styles.chevronIcon} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default EvolutionPage;
