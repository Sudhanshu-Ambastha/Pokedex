import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { searchIcon, homeIcon, filterIcon, chevronLeft, chevronRight } from '../../constants/icons';
import bgType from '../../assets/background/index';
import typeIcons from '../../assets/pokemon-types/index';
import { FilterModal, Evolutions, Error } from '../index';
import styles from './pokedata.style';

const PokeData = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pokemonName: initialPokemonName } = route.params;
  const [imgType, setImgType] = useState('GIF');
  const [spriteType, setSpriteType] = useState('normal');
  const [formType, setFormType] = useState('standard');
  const [megaType, setMegaType] = useState('regular');
  const [genderType, setGenderType] = useState('male');
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [pokemonName, setPokemonName] = useState(initialPokemonName || '');
  const [pokemonId, setPokemonId] = useState(null);  // Track Pokémon ID
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (pokemonName) {
      getPokemonByName(pokemonName);
    }
  }, [pokemonName]);

  useEffect(() => {
    if (pokemonId !== null) {
      getPokemonById(pokemonId);
    }
  }, [pokemonId]);

  const toggleFilterSidebar = () => {
    setFilterVisible(!isFilterVisible);
  };

  const getPokemonByName = async (name) => {
    try {
      const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${name.toLowerCase()}`);
      if (!response.ok) throw new Error('Pokémon not found!');
      const data = await response.json();
      setPokemonData(data);
      setPokemonId(data.id); // Set ID based on fetched Pokémon data
      setError('');
    } catch (error) {
      setError(error.message);
      setPokemonData(null);
    }
  };

  const getPokemonById = async (id) => {
    try {
      const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${id}`);
      if (!response.ok) throw new Error('Pokémon not found!');
      const data = await response.json();
      setPokemonData(data);
      setPokemonName(data.name); // Update name based on fetched Pokémon data
      setError('');
    } catch (error) {
      setError(error.message);
      setPokemonData(null);
    }
  };

  // Updated logic to decrement/increment Pokémon ID
  const onLeftClick = () => {
    if (pokemonId > 1) setPokemonId((prevId) => prevId - 1);
  };

  const onRightClick = () => {
    setPokemonId((prevId) => prevId + 1);
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

  const handleEvolutionClick = () => {
    if (pokemonData) {
      navigation.navigate('Evolutions', { pokemonName: pokemonData.name });
    }
  };

  const getTypeBackground = () => {
    if (pokemonData && pokemonData.types && pokemonData.types.length > 0) {
      const primaryType = pokemonData.types[0].type.name.toLowerCase();
      return bgType[primaryType];
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
          value={pokemonName}
        />
        <TouchableOpacity style={styles.searchIconContainer} onPress={() => getPokemonByName(pokemonName)}>
          <Image source={searchIcon} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      {error ? (
        <Error onRetry={retryFetch} />
      ) : (
        pokemonData && (
          <View style={styles.spriteContainer}>
            <Text style={styles.pokemonName}>{pokemonData.name.toUpperCase()}</Text>
            <Text style={styles.pokemonID}>#{pokemonData.id}</Text>
            <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={onLeftClick}>
            <Image source={chevronLeft} style={styles.leftIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onRightClick}>
            <Image source={chevronRight} style={styles.rightIcon} />
          </TouchableOpacity>
        </View>
        
        <ImageBackground source={getTypeBackground()} style={styles.typeBackground}>
          <Image source={{ uri: getSpriteUrl() }} style={styles.sprite} resizeMode="contain" />
        </ImageBackground>

        <View style={styles.typeIconsContainer}>{getTypeIcons()}</View>
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
            <TouchableOpacity style={styles.evolBtn} onPress={() => navigation.navigate('PokemonGrid')}>
              <Image source={homeIcon} style={styles.evolText} />
            </TouchableOpacity> 
            <TouchableOpacity style={styles.evolBtn} onPress={handleEvolutionClick}>
             <Text style={styles.evolText}>Check Evolution</Text>
            </TouchableOpacity>
          </View>
        )
      )}
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
    </View>
  );
};

export default PokeData;
