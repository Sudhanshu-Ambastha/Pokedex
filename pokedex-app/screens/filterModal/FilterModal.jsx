import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './filtermodal.style';

const FilterModal = ({
  isVisible,
  toggleFilter,
  imgType,
  setImgType,
  spriteType,
  setSpriteType,
  formType,
  setFormType,
  megaType,
  setMegaType,
  genderType,
  setGenderType,
  regionType,
  setRegionType
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleFilter}
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
          <Picker.Item label="PNG" value="PNG" />
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
        
        <Text style={styles.pickerLabel}>Region</Text>
        <Picker
          selectedValue={regionType}
          onValueChange={(itemValue) => setRegionType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Kanto" value="kanto" />
          <Picker.Item label="Johto" value="johto" />
          <Picker.Item label="Hoenn" value="hoenn" />
          <Picker.Item label="Sinnoh" value="sinnoh" />
          <Picker.Item label="Unova" value="unova" />
          <Picker.Item label="Kalos" value="kalos" />
          <Picker.Item label="Alola" value="alola" />
          <Picker.Item label="Galar" value="galar" />
          <Picker.Item label="Paldea" value="paldea" />
        </Picker>
        
        <TouchableOpacity style={styles.closeButton} onPress={toggleFilter}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FilterModal;
