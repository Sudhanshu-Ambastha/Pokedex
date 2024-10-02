import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import searchIcon from '../../../assets/icons/search.png';
import filterIcon from '../../../assets/icons/filter.png';

const Popularjobs = () => {
  // State variables to store picker values
  const [spriteType, setSpriteType] = useState('normal');
  const [formType, setFormType] = useState('standard');
  const [megaType, setMegaType] = useState('regular');
  const [genderType, setGenderType] = useState('male');
  const [isFilterVisible, setFilterVisible] = useState(false);  // For controlling the sidebar visibility

  // Function to toggle the sidebar
  const toggleFilterSidebar = () => {
    setFilterVisible(!isFilterVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
      {/* Filter Icon */}
      <TouchableOpacity onPress={toggleFilterSidebar} style={styles.filterButton}>
        <Image source={filterIcon} style={styles.filterIcon} />
      </TouchableOpacity>

        {/* Input Text Container */}
        <TextInput
          placeholder="Enter Pokémon Name or ID"
          style={styles.textInput}
        />

        {/* Search Icon */}
        <TouchableOpacity style={styles.searchIconContainer} onPress={() => { /* Add search functionality */ }}>
          <Image source={searchIcon} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>


      {/* Sidebar Modal */}
      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleFilterSidebar}
      >
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Filter Options</Text>

          {/* Sprite Type Picker */}
          <Text style={styles.pickerLabel}>Sprite Type</Text>
          <Picker
            selectedValue={spriteType}
            onValueChange={(itemValue) => setSpriteType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Shiny" value="shiny" />
          </Picker>

          {/* Form Type Picker */}
          <Text style={styles.pickerLabel}>Form Type</Text>
          <Picker
            selectedValue={formType}
            onValueChange={(itemValue) => setFormType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Standard" value="standard" />
            <Picker.Item label="Alola" value="alola" />
          </Picker>

          {/* Mega Type Picker */}
          <Text style={styles.pickerLabel}>Mega Type</Text>
          <Picker
            // selectedValue={megaType}
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

          {/* Gender Type Picker */}
          <Text style={styles.pickerLabel}>Gender Type</Text>
          <Picker
            selectedValue={genderType}
            onValueChange={(itemValue) => setGenderType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={toggleFilterSidebar}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Display Pokémon Details */}
      <Text>Pokémon Name: </Text>
      <Text>Pokémon ID: </Text>
      <Image source={{ uri: 'https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_0001_000_mf_n_00000000_f_n.png' }} width={300} height={300}/>
      <Text>HP: </Text>
        <Text>Attack: </Text>
        <Text>Defense: </Text>
        <Text>Sp. Attack: </Text>
        <Text>Sp. Defense: </Text>
        <Text>Speed: </Text>
    </View>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,  // Takes the remaining width after the search icon
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  searchIconContainer: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginRight: 10,  // Space between icon and input
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
    left: 0, // Sidebar slides in from the left
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
});

export default Popularjobs;
