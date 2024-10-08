import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import searchIcon from '../../../assets/icons/search.png';
import filterIcon from '../../../assets/icons/filter.png';
import typeIcons from '../../../assets/pokemon-types/index'; 
import Error from '../Error/Error';
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

  // Function to retry fetching the Pokémon
  const retryFetch = () => {
    setError('');
    setPokemonData(null);
    setPokemonName(''); // Optionally reset the input field
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

      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleFilterSidebar}
      >
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Filter Options</Text>

          <Text style={styles.pickerLabel}>Image Type</Text>
          <Picker
            selectedValue={imgType}
            onValueChange={(itemValue) => setImgType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="GIF" value="GIF" />
            {/* <Picker.Item label="3D" value="3D" /> */}
            <Picker.Item label="Low" value="Low" />
          </Picker>

          <Text style={styles.pickerLabel}>Sprite Type</Text>
          <Picker
            selectedValue={spriteType}
            onValueChange={(itemValue) => setSpriteType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Shiny" value="shiny" />
          </Picker>

          <Text style={styles.pickerLabel}>Form Type</Text>
          <Picker
            selectedValue={formType}
            onValueChange={(itemValue) => setFormType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Standard" value="standard" />
            <Picker.Item label="Alola" value="alola" />
          </Picker>

          <Text style={styles.pickerLabel}>Mega Type</Text>
          <Picker
            selectedValue={megaType}
            onValueChange={(itemValue) => setMegaType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Regular" value="regular" />
            <Picker.Item label="Mega" value="mega" />
            <Picker.Item label="Mega X" value="megax" />
            <Picker.Item label="Mega Y" value="megay" />
            <Picker.Item label="Primal" value="primal" />
            <Picker.Item label="G-Max" value="gmax" />
          </Picker>

          <Text style={styles.pickerLabel}>Gender Type</Text>
          <Picker
            selectedValue={genderType}
            onValueChange={(itemValue) => setGenderType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>

          <TouchableOpacity style={styles.closeButton} onPress={toggleFilterSidebar}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {pokemonData && (
        <View style={styles.spriteContainer}>
          <Text style={styles.pokemonName}>{pokemonData.name.toUpperCase()}</Text>
          <Text style={styles.pokemonID}>#{pokemonData.id}</Text>

          {/* Display Pokémon Sprite with Filters */}
          <Image
            source={{ uri: getSpriteUrl() }}
            style={styles.sprite}
            resizeMode="contain"
          />

          <View style={styles.typeIconsContainer}>
            {getTypeIcons()}
          </View>

          <Text>Weight: {pokemonData.weight}</Text>
          <Text>Height: {pokemonData.height}</Text>
          <Text>HP: {pokemonData.stats[0].base_stat}</Text>
          <Text>Attack: {pokemonData.stats[1].base_stat}</Text>
          <Text>Defense: {pokemonData.stats[2].base_stat}</Text>
          <Text>Sp. Attack: {pokemonData.stats[3].base_stat}</Text>
          <Text>Sp. Defense: {pokemonData.stats[4].base_stat}</Text>
          <Text>Speed: {pokemonData.stats[5].base_stat}</Text>
        </View>
      )}
    </View>
  );
};


export default PokemonSearchApp;