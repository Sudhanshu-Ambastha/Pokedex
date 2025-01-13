import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { searchIcon, filterIcon } from '../../constants/icons';
import FilterModal from './FilterModal';
import { getPokemonList, getPokemonSprite, getPokemonStats, getPokemonTypes } from '../../constants/api';

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
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigation = useNavigation();

  const numColumns = Math.floor(screenWidth / 100);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchText, imgType, spriteType, formType, megaType, genderType, regionType]);

  useEffect(() => {
  if (pokemonList.length > 0) {
    setIsDataLoaded(true); 
  }
}, [pokemonList]);

  const fetchPokemonList = () => {
    getPokemonList()
      .then(results => {
        const pokemonWithDetailsPromises = results.map((pokemon) => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          return Promise.all([
            getPokemonSprite(id),
            getPokemonStats(id),
            getPokemonTypes(id),
          ])
            .then(([spriteUrl, stats, types]) => {
              return {
                ...pokemon,
                id: parseInt(id),
                spriteUrl,
                stats,
                types,
              };
            })
            .catch(() => {
              return {
                ...pokemon,
                id: parseInt(id),
                spriteUrl: '', 
                stats: {},
                types: [],
              };
            });
        });
        return Promise.all(pokemonWithDetailsPromises);
      })
      .then(pokemonWithDetails => {
        setPokemonList(pokemonWithDetails);
        setFilteredPokemon(pokemonWithDetails);
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
      const [start, end] = regionIndices[regionType] || [1, 151]; 
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
    navigation.navigate('PokeData', { pokemon, pokemonList }); 
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
      {/* Display Pokémon types */}
      <View className="flex-row">
        {item.types.map(type => (
          <Image 
            key={type.name}
            source={{ uri: type.iconUrl }} 
            className="w-6 h-6 mr-1"
          />
        ))}
      </View>
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
          <Image source={searchIcon} />        
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
