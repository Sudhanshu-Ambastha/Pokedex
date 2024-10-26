import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { chevronLeft, homeIcon, chevronRight } from '../../constants/icons';
import styles from './evol.style';
import Error from '../error/Error';

const EvolutionPage = ({ route, navigation }) => {
  const [evolutionData, setEvolutionData] = useState([]);
  const [error, setError] = useState('');
  const [currentChainId, setCurrentChainId] = useState(1); // Start with the first evolution chain
  const spriteType = "normal"; // Set this to any sprite type like "normal", "shiny", etc.

  useEffect(() => {
    fetchEvolutionData(currentChainId);
  }, [currentChainId]);

  const fetchEvolutionData = async (chainId) => {
    try {
      const chainResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${chainId}/`);
      if (!chainResponse.ok) throw new Error('Evolution chain not found');
      const chainData = await chainResponse.json();

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
    } catch (err) {
      setError(err.message);
      setEvolutionData([]);
    }
  };

  const handleNavigate = (direction) => {
    if (direction === 'left') {
      setCurrentChainId((prevId) => Math.max(prevId - 1, 1)); // Ensure ID does not go below 1
    } else if (direction === 'right') {
      setCurrentChainId((prevId) => prevId + 1);
    }
  };

  const renderEvolution = () => {
    if (!evolutionData.length) {
      return (
        <View style={styles.item}>
          <Text style={styles.pokemonName}>No Evolution Data Available</Text>
        </View>
      );
    }

    return evolutionData.map((evolution) => (
      <TouchableOpacity
        key={evolution.id}
        style={styles.item}
        onPress={() => navigation.navigate('PokeData', { pokemonName: evolution.name })}
      >
        <Image
          source={{
            uri: `https://projectpokemon.org/images/${spriteType}-sprite/${evolution.name}.gif`,
          }}
          style={styles.sprite}
        />
        <Text style={styles.pokemonName}>
          {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {error ? (
        <Error message={error} onRetry={() => fetchEvolutionData(currentChainId)} />
      ) : (
        <>
          {renderEvolution()}
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
