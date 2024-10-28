import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { searchIcon, filterIcon } from '../../constants/icons.js';
import styles from './grid.style';
import FilterModal from '../filterModal/FilterModal';
import { getPokemonList, getSpriteUrl } from '../../constants/api.js';

const calculateColumns = () => {
  const screenWidth = Dimensions.get('window').width;
  return Math.floor(screenWidth / 100); // Adjust item width here
};

const PokemonGrid = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [numColumns, setNumColumns] = useState(calculateColumns());
  const [imgType, setImgType] = useState('GIF');
  const [isFilterVisible, setFilterVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPokemonList();
    const updateLayout = () => setNumColumns(calculateColumns());
    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  }, []);

  const fetchPokemonList = async () => {
    try {
      const results = await getPokemonList();
      const pokemonWithSprites = results.map((pokemon) => ({
        ...pokemon,
        spriteUrl: getSpriteUrl(
          pokemon,
          imgType,   // Image type ('GIF' or 'Low')
          'normal',  // Sprite type
          'standard' // Form type, can adjust based on your filter settings
        ),
      }));
      setPokemonList(pokemonWithSprites);
      setFilteredPokemon(pokemonWithSprites);
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

  const toggleFilterSidebar = () => {
    setFilterVisible(!isFilterVisible);
  };

  const handlePokemonPress = (pokemon) => {
    navigation.navigate('PokeData', { pokemonName: pokemon.name });
  };

  const renderPokemon = ({ item }) => (
    <TouchableOpacity onPress={() => handlePokemonPress(item)} style={styles.item}>
      <Image 
        source={{ uri: item.spriteUrl }} 
        style={styles.sprite} 
        resizeMode="contain" 
      />
      <Text style={styles.pokemonName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={toggleFilterSidebar} style={styles.filterButton}>
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
        key={numColumns}
      />
      <FilterModal
        isVisible={isFilterVisible}
        toggleFilter={toggleFilterSidebar}
        imgType={imgType}
        setImgType={setImgType}
      />
    </View>
  );
};

export default PokemonGrid;
