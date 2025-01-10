import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import '../global.css';

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
  setRegionType,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleFilter}
    >
      <View className="flex-1 bg-white p-5">
        <Text className="text-2xl font-bold mb-5">Filter Options</Text>

        <Text className="mt-2 font-bold">Image Type</Text>
        <Picker
          selectedValue={imgType}
          onValueChange={(itemValue) => setImgType(itemValue)}
          className="h-12 w-full mb-5"
        >
          <Picker.Item label="GIF" value="GIF" />
          <Picker.Item label="PNG" value="PNG" />
          <Picker.Item label="Low" value="Low" />
        </Picker>

        <Text className="mt-2 font-bold">Sprite Type</Text>
        <Picker
          selectedValue={spriteType}
          onValueChange={(itemValue) => setSpriteType(itemValue)}
          className="h-12 w-full mb-5"
        >
          <Picker.Item label="Normal" value="normal" />
          <Picker.Item label="Shiny" value="shiny" />
        </Picker>

        <Text className="mt-2 font-bold">Form Type</Text>
        <Picker
          selectedValue={formType}
          onValueChange={(itemValue) => setFormType(itemValue)}
          className="h-12 w-full mb-5"
        >
          <Picker.Item label="Standard" value="standard" />
          <Picker.Item label="Alola" value="alola" />
        </Picker>

        <Text className="mt-2 font-bold">Mega Type</Text>
        <Picker
          selectedValue={megaType}
          onValueChange={(itemValue) => setMegaType(itemValue)}
          className="h-12 w-full mb-5"
        >
          <Picker.Item label="Regular" value="regular" />
          <Picker.Item label="Mega" value="mega" />
          <Picker.Item label="Mega X" value="megax" />
          <Picker.Item label="Mega Y" value="megay" />
          <Picker.Item label="Primal" value="primal" />
          <Picker.Item label="G-Max" value="gmax" />
        </Picker>

        <Text className="mt-2 font-bold">Gender Type</Text>
        <Picker
          selectedValue={genderType}
          onValueChange={(itemValue) => setGenderType(itemValue)}
          className="h-12 w-full mb-5"
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>

        <Text className="mt-2 font-bold">Region</Text>
        <Picker
          selectedValue={regionType}
          onValueChange={(itemValue) => setRegionType(itemValue)}
          className="h-12 w-full mb-5"
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

        <TouchableOpacity
          className="p-3 bg-orange-500 rounded items-center mt-5"
          onPress={toggleFilter}
        >
          <Text className="text-white font-bold">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FilterModal;
