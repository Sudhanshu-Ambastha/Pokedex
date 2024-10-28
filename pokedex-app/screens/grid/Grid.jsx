import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { searchIcon, filterIcon } from '../../constants/icons.js';
import styles from './grid.style';
import FilterModal from '../filterModal/FilterModal';
import { getPokemonList, getSpriteUrl } from '../../constants/api.js';

const PokemonGrid = () => {
  const { width: screenWidth } = useWindowDimensions();
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [imgType, setImgType] = useState('GIF');
  const [spriteType, setSpriteType] = useState('normal'); // Initialize spriteType
  const [formType, setFormType] = useState('standard'); // Initialize formType
  const [megaType, setMegaType] = useState('regular'); // Initialize megaType
  const [genderType, setGenderType] = useState('male'); // Initialize genderType
  const [regionType, setRegionType] = useState('all'); // Initialize regionType
  const [isFilterVisible, setFilterVisible] = useState(false);
  const navigation = useNavigation();

  // Calculate columns based on screen width
  const numColumns = Math.floor(screenWidth / 100);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchText, imgType, spriteType, formType, megaType, genderType, regionType]);

  const fetchPokemonList = async () => {
    try {
      const results = await getPokemonList();
      const pokemonWithSprites = await Promise.all(
        results.map(async (pokemon) => {
          let spriteUrl;
          try {
            spriteUrl = await getSpriteUrl(
              pokemon,
              imgType,
              spriteType,
              formType
            );
            if (!spriteUrl) throw new Error("Primary sprite URL failed");
          } catch {
            spriteUrl = `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
          }
          return {
            ...pokemon,
            spriteUrl,
          };
        })
      );
      setPokemonList(pokemonWithSprites);
      setFilteredPokemon(pokemonWithSprites);
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const applyFilters = () => {
  let filtered = pokemonList;

  // Filter by search text
  if (searchText) {
    filtered = filtered.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Filter by region
  if (regionType && regionType !== "all") {
    const regionIndices = {
      kanto: [1, 151],
      johto: [152, 251],
      hoenn: [252, 386],
      sinnoh: [387, 493],
      unova: [494, 649],
      kalos: [650, 721],
      alola: [722, 898],
      galar: [899, 1000],
      paldea: [1001, 1075],
    };
    const [start, end] = regionIndices[regionType];

    // Make sure start and end are defined
    if (start !== undefined && end !== undefined) {
      filtered = filtered.filter((pokemon) => pokemon.id >= start && pokemon.id <= end);
    }
  }

  // Update filtered Pokémon list
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
        key={numColumns} // re-renders when column count changes
      />
      <FilterModal
        isVisible={isFilterVisible}
        toggleFilter={toggleFilterSidebar}
        imgType={imgType}
        setImgType={setImgType}
        spriteType={spriteType}
        setSpriteType={setSpriteType}
        formType={formType}
        setFormType={setFormType}
        megaType={megaType}
        setMegaType={setMegaType}
        genderType={genderType}
        setGenderType={setGenderType}
        regionType={regionType}
        setRegionType={setRegionType} // Corrected here
      />
    </View>
  );
};

export default PokemonGrid;
