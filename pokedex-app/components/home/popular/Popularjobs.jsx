import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import searchIcon from '../../../assets/icons/search.png';
import filterIcon from '../../../assets/icons/filter.png';
import typeIcons from '../../../assets/index'; // Import your type icons

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

const getSpriteUrl = () => {
  if (!pokemonData) return null;

  const form = formType === 'alola' ? '-alola' : '';
  const gender = genderType === 'female' ? '-f' : '';
  let spriteUrl;

  // Handle GIF sprite URLs
  if (imgType === 'GIF') {
    // Different cases for mega forms and special cases
    if (megaType === 'GMax') {
      spriteUrl = `https://projectpokemon.org/images/sprites-models/swsh-${spriteType}-sprites/${pokemonData.name.toLowerCase()}-gigantamax.gif`;
    } else if (megaType === 'primal') {
      spriteUrl = `https://projectpokemon.org/images/normal-sprite/${pokemonData.name}-primal.gif`;
    } else if (megaType === 'megax') {
      spriteUrl = `https://projectpokemon.org/images/normal-sprite/${pokemonData.name}-megax.gif`;
    } else if (megaType === 'megay') {
      spriteUrl = `https://projectpokemon.org/images/normal-sprite/${pokemonData.name}-megay.gif`;
    } else if (megaType === 'mega') {
      spriteUrl = `https://projectpokemon.org/images/normal-sprite/${pokemonData.name}-mega.gif`;
    } else {
      // Regular GIF for standard Pokémon
      spriteUrl = `https://projectpokemon.org/images/${spriteType}-sprite/${pokemonData.name}${form}${gender}.gif`;
    }
    
    console.log("Generated GIF URL:", spriteUrl); // Add this line
  }  else if (imgType === 'Low') {
    spriteUrl = pokemonData.sprites.front_default; // Use the low-resolution sprite
  }

  return spriteUrl;
};

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
            onError={() => console.log("Failed to load sprite image")}
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
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  filterButton: {
    marginRight: 10,
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  sidebar: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerLabel: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#FF5733',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  spriteContainer: {
    alignItems: 'center',
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  pokemonID: {
    fontSize: 18,
    color: '#777',
  },
  sprite: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  typeIconsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  typeIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
});

export default PokemonSearchApp;