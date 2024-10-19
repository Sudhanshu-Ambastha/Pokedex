import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const FilterComponent = ({
  imgType,
  spriteType,
  formType,
  megaType,
  genderType,
  setImgType,
  setSpriteType,
  setFormType,
  setMegaType,
  setGenderType,
  pokemonData,
}) => {

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

  return (
    <View>
      {/* Example buttons for changing filter values */}
      <Text>Change Image Type</Text>
      <Button title="GIF" onPress={() => setImgType('GIF')} />
      <Button title="Low" onPress={() => setImgType('Low')} />
      {/* Additional filter controls can be added here */}

      {pokemonData && (
        <View>
          <Text>Pokémon Sprite:</Text>
          <Image source={{ uri: getSpriteUrl() }} style={styles.pokemonImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonImage: {
    width: 100,
    height: 100,
  },
});

export default FilterComponent;
