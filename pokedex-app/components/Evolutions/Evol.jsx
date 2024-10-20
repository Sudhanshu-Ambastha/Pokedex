import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { chevronLeft, homeIcon, chevronRight } from '../../constants/icons';
import styles from './evol.style';
import Error from '../error/Error'; // Import your Error component

const EvolutionPage = ({ route, navigation }) => {
  const pokemonName = route?.params?.pokemonName || 'bulbasaur'; // Default to bulbasaur if params are missing
  const [evolutionData, setEvolutionData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvolutionData();
  }, []);

  const fetchEvolutionData = async () => {
    try {
      const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
      if (!speciesResponse.ok) throw new Error('Species not found');
      const speciesData = await speciesResponse.json();
      const evolutionChainUrl = speciesData.evolution_chain.url;
      
      const chainResponse = await fetch(evolutionChainUrl);
      if (!chainResponse.ok) throw new Error('Evolution chain not found');
      const chainData = await chainResponse.json();

      const evolutions = [];
      let current = chainData.chain;

      while (current) {
        const id = current.species.url.split('/').filter(Boolean).pop();
        evolutions.push({ name: current.species.name, id });
        current = current.evolves_to[0];
      }

      setEvolutionData(evolutions);
      setError('');
    } catch (err) {
      setError(err.message);
      setEvolutionData([]);
    }
  };

  const renderEvolution = ({ item }) => (
    <View style={styles.item}>
      <Image 
        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png` }} 
        style={styles.sprite} 
      />
      <Text style={styles.pokemonName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {error ? (
        // Instead of showing the error as text, navigate to the Error component
        <Error message={error} />
      ) : (
        <FlatList
          data={evolutionData}
          renderItem={renderEvolution}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <View style={styles.buttonContainer}>
        {evolutionData.length > 1 && (
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SecondEvolution', { pokemonName: evolutionData[1].name })}>
            <Image source={chevronLeft} style={styles.chevronIcon} />
          </TouchableOpacity>

        )}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pokedex')}>
          <Image source={homeIcon} style={styles.buttonText}/>
        </TouchableOpacity>
        {evolutionData.length > 1 && (
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SecondEvolution', { pokemonName: evolutionData[1].name })}>
            <Image source={chevronRight} style={styles.chevronIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EvolutionPage;
