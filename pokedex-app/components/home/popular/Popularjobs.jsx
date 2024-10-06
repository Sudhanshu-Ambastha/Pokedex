import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import searchIcon from '../../../assets/icons/search.png';
import filterIcon from '../../../assets/icons/filter.png';
// Import all type icons from your index.js
import typeIcons from '../../../assets/index';

const Popularjobs = () => {
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

  // Helper function to get the icons for each type
  const getTypeIcons = () => {
    if (pokemonData && pokemonData.types) {
      return pokemonData.types.map((typeObj) => {
        const typeName = typeObj.type.name.charAt(0).toUpperCase() + typeObj.type.name.slice(1);
        const TypeIcon = typeIcons[typeName]; // Access the type icon dynamically
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

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Sidebar Modal */}
      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleFilterSidebar}
      >
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Filter Options</Text>

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

      {/* Display Pokémon Details */}
      {pokemonData && (
        <View style={styles.spriteContainer}>
          <Text style={styles.pokemonName}>{pokemonData.name.toUpperCase()}</Text>
          <Text style={styles.pokemonID}>#{pokemonData.id}</Text>

          {/* Display Pokémon Sprite */}
          <Image
            source={{ uri: pokemonData.sprites.front_default }}
            style={styles.sprite}
          />

          {/* Display Pokémon Types with Icons */}
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

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  searchIconContainer: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginRight: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  filterButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  filterIcon: {
    width: 30,
    height: 30,
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '80%',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  spriteContainer: {
    flexGrow: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sprite: {
    width: 180,
    height: 180,
  },
  typeIconsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  typeIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pokemonID: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default Popularjobs;
