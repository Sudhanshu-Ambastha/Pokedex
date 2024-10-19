import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import filterIcon from '../../assets/icons/filter.png';
import searchIcon from '../../assets/icons/search.png';
import styles from './grid.style'; // Import the separate style file

const calculateColumns = () => {
  const screenWidth = Dimensions.get('window').width;
  return Math.floor(screenWidth / 100); // Adjust item width here
};

const PokemonGrid = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [numColumns, setNumColumns] = useState(calculateColumns());

  useEffect(() => {
    fetchPokemonList();
    const updateLayout = () => setNumColumns(calculateColumns());
    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  }, []);

  const fetchPokemonList = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); // Example: First 151 Pokémon
      const data = await response.json();
      const results = data.results.map((pokemon, index) => ({
        ...pokemon,
        id: index + 1, // Assigning ID based on index
        spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
      }));
      setPokemonList(results);
      setFilteredPokemon(results);
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPokemon(filtered);
  };

  const renderPokemon = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.spriteUrl }} style={styles.sprite} />
      <Text style={styles.pokemonName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Image source={filterIcon} style={styles.filterIcon} />
        </TouchableOpacity>
        <TextInput
          placeholder="Enter Pokémon Name or ID"
          style={styles.textInput}
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.searchIconContainer}>
          <Image source={searchIcon} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredPokemon}
        renderItem={renderPokemon}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        key={numColumns} // Re-render on column count change
      />
    </View>
  );
};

export default PokemonGrid;
