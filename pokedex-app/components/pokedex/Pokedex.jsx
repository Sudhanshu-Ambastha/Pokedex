import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import searchIcon from '../../assets/icons/search.png';
import filterIcon from '../../assets/icons/filter.png';
import typeIcons from '../../assets/pokemon-types/index';
import FilterModal from '../filterModal/FilterModal';
import styles from './pokedex.style';

const PokemonSearchApp = () => {
  const [imgType, setImgType] = useState('GIF');
  const [spriteType, setSpriteType] = useState('normal');
  const [formType, setFormType] = useState('standard');
  const [megaType, setMegaType] = useState('regular');
  const [genderType, setGenderType] = useState('male');
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');

  const toggleFilterSidebar = () => {
    setFilterVisible(!isFilterVisible);
  };

  const getPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonName.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error('Pokémon not found!');
      }
      const data = await response.json();
      setPokemonData(data);
      setError('');
    } catch (error) {
      setError(error.message);
      setPokemonData(null);
    }
  };

  const retryFetch = () => {
    setError('');
    setPokemonData(null);
    setPokemonName(''); 
  };

  const getSpriteUrl = () => {
    if (!pokemonData) return null;
    const form = formType === 'alola' ? '-alola' : '';
    const gender = genderType === 'female' ? '-f' : '';
    let spriteUrl;

    // Handle GIF sprite URLs
    if (imgType === 'GIF') {
      if (megaType === 'GMax') {
        spriteUrl = `https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/${pokemonData.name}-gigantamax.gif`;
      } else if (megaType === 'primal') {
        spriteUrl = `https://projectpokemon.org/images/normal-sprite/${pokemonData.name}-primal.gif`;
      } else if (megaType === 'megax') {
        spriteUrl = `https://projectpokemon.org/images/normal-sprite/${pokemonData.name}-megax.gif`;
      } else if (megaType === 'megay') {
        spriteUrl = `https://projectpokemon.org/images/normal-sprite/${pokemonData.name}-megay.gif`;
      } else if (megaType === 'mega') {
        spriteUrl = `https://projectpokemon.org/images/normal-sprite/${pokemonData.name}-mega.gif`;
      } else {
        spriteUrl = `https://projectpokemon.org/images/${spriteType}-sprite/${pokemonData.name}${form}${gender}.gif`;
      }
    } else if (imgType === 'Low') {
      spriteUrl = pokemonData.sprites.front_default;
    }
    return spriteUrl;
  };

  const getTypeIcons = () => {
    if (pokemonData && pokemonData.types) {
      return pokemonData.types.map((typeObj) => {
        const typeName = typeObj.type.name.charAt(0).toUpperCase() + typeObj.type.name.slice(1);
        const TypeIcon = typeIcons[typeName];
        return <Image key={typeName} source={TypeIcon} style={styles.typeIcon} />;
      });
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={toggleFilterSidebar} style={styles.filterButton}>
          <Image source={filterIcon} style={styles.filterIcon} />
        </TouchableOpacity>
        <TextInput
          placeholder="Enter Pokémon Name or ID"
          style={styles.textInput}
          onChangeText={setPokemonName}
        />
        <TouchableOpacity style={styles.searchIconContainer} onPress={getPokemon}>
          <Image source={searchIcon} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
      />
      {pokemonData && (
        <View style={styles.spriteContainer}>
          <Text style={styles.pokemonName}>{pokemonData.name.toUpperCase()}</Text>
          <Text style={styles.pokemonID}>#{pokemonData.id}</Text>
          <Image
            source={{ uri: getSpriteUrl() }}
            style={styles.sprite}
            resizeMode="contain"
          />
          <View style={styles.typeIconsContainer}>
            {getTypeIcons()}
          </View>
          <View style={styles.textData}>
            <Text style={styles.dataLabel}>Weight:</Text>
            <Text style={styles.dataValue}>{pokemonData.weight}</Text>
          </View>
          <View style={styles.textData}>
            <Text style={styles.dataLabel}>Height:</Text>
            <Text style={styles.dataValue}>{pokemonData.height}</Text>
          </View>
          <View style={styles.textData}>
            <Text style={styles.dataLabel}>HP:</Text>
            <Text style={styles.dataValue}>{pokemonData.stats[0].base_stat}</Text>
          </View>
          <View style={styles.textData}>
            <Text style={styles.dataLabel}>Attack:</Text>
            <Text style={styles.dataValue}>{pokemonData.stats[1].base_stat}</Text>
          </View>
          <View style={styles.textData}>
            <Text style={styles.dataLabel}>Defense:</Text>
            <Text style={styles.dataValue}>{pokemonData.stats[2].base_stat}</Text>
          </View>
          <View style={styles.textData}>
            <Text style={styles.dataLabel}>Sp. Attack:</Text>
            <Text style={styles.dataValue}>{pokemonData.stats[3].base_stat}</Text>
          </View>
          <View style={styles.textData}>
            <Text style={styles.dataLabel}>Sp. Defense:</Text>
            <Text style={styles.dataValue}>{pokemonData.stats[4].base_stat}</Text>
          </View>
          <View style={styles.textData}>
            <Text style={styles.dataLabel}>Speed:</Text>
            <Text style={styles.dataValue}>{pokemonData.stats[5].base_stat}</Text>
          </View>
          <TouchableOpacity style={styles.evolBtn} >
          <Text style={styles.evolText}>Check Evolution</Text></TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PokemonSearchApp;
