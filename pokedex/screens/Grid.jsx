import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { searchIcon, filterIcon } from '../constants/icons';
import FilterModal from './FilterModal';
import { getPokemonList, getSpriteUrl } from '../constants/api';
import axios from 'axios';
import '../global.css';

const PokemonGrid = () => {
  const { width: screenWidth } = useWindowDimensions();
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [imgType, setImgType] = useState('GIF');
  const [spriteType, setSpriteType] = useState('normal');
  const [formType, setFormType] = useState('standard');
  const [megaType, setMegaType] = useState('regular');
  const [genderType, setGenderType] = useState('male');
  const [regionType, setRegionType] = useState('all');
  const [isFilterVisible, setFilterVisible] = useState(false);
  const navigation = useNavigation();

  const numColumns = Math.floor(screenWidth / 100);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchText, imgType, spriteType, formType, megaType, genderType, regionType]);

  const fetchPokemonList = () => {
  getPokemonList() // Use the getPokemonList function from api.js
    .then(results => {
      const pokemonWithSpritesPromises = results.map((pokemon) => {
        // Extract the Pokémon ID from the URL
        const id = pokemon.url.split('/').filter(Boolean).pop();
        return getSpriteUrl(id) // Fetch the sprite URL
          .then((spriteUrl) => {
            return {
              ...pokemon,
              id: parseInt(id), // Add the ID to the Pokémon object
              spriteUrl, // Add the sprite URL
            };
          })
          .catch(() => {
            const fallbackUrl = `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/home/${id}.png`;
            return {
              ...pokemon,
              id: parseInt(id),
              spriteUrl: fallbackUrl, // Use a fallback URL if the sprite fetch fails
            };
          });
      });
      return Promise.all(pokemonWithSpritesPromises);
    })
    .then(pokemonWithSprites => {
      setPokemonList(pokemonWithSprites);
      setFilteredPokemon(pokemonWithSprites);
    })
    .catch(error => {
      console.error('Error fetching Pokémon list:', error);
    });
}; 

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const applyFilters = () => {
    let filtered = pokemonList;

    if (searchText) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (regionType && regionType !== 'all') {
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
      const [start, end] = regionIndices[regionType] || [];
      if (start !== undefined && end !== undefined) {
        filtered = filtered.filter((pokemon) => pokemon.id >= start && pokemon.id <= end);
      }
    }

    setFilteredPokemon(filtered);
  };

  const toggleFilterSidebar = () => {
    setFilterVisible(!isFilterVisible);
  };

  const handlePokemonPress = (pokemon) => {
  navigation.navigate('PokeData', { pokemonName: pokemon.name, pokemonId: pokemon.id });
  };

  const renderPokemon = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePokemonPress(item)}
      className="bg-gray-200 p-4 m-1 rounded flex-1 items-center justify-center"
    >
      <Image 
        source={{ uri: item.spriteUrl }} 
        className="w-12 h-12"
        resizeMode="contain" 
      />
      <Text className="text-sm font-bold">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white p-2">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={toggleFilterSidebar} className="mr-2">
          <Image source={filterIcon} className="w-6 h-6" />
        </TouchableOpacity>
        <TextInput
          placeholder="Enter Pokémon Name or ID"
          className="flex-1 border border-gray-300 px-4 py-2 rounded"
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity className="bg-cyan-400 p-2 rounded ml-2">
          <Image source={searchIcon} className="w-6 h-6" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredPokemon}
        renderItem={renderPokemon}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        key={numColumns}
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
        setRegionType={setRegionType}
      />
    </View>
  );
};

export default PokemonGrid;