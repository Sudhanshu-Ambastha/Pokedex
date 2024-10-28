const BASE_URL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const SPRITE_URL = 'https://projectpokemon.org/images';

/**
 * Fetch Pokémon data by name.
 * @param {string} name - Pokémon name.
 */
export const getPokemonByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/${name.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokémon not found!');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Fetch Pokémon data by ID.
 * @param {number} id - Pokémon ID.
 */
export const getPokemonById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Pokémon not found!');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Fetch a list of Pokémon with limited details.
 * @param {number} limit - Number of Pokémon to fetch.
 */
export const getPokemonList = async (limit = 900) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!response.ok) throw new Error('Unable to fetch Pokémon list!');
    const data = await response.json();
    return data.results.map((pokemon, index) => ({
      ...pokemon,
      id: index + 1,
    }));
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Generate the Pokémon sprite URL based on selected types and forms.
 * @param {object} pokemonData - Data for the selected Pokémon.
 * @param {string} imgType - Image type (e.g., 'GIF', 'Low').
 * @param {string} spriteType - Sprite type (e.g., 'normal', 'shiny').
 * @param {string} formType - Pokémon form (e.g., 'alola', 'standard').
 * @param {string} megaType - Mega type (e.g., 'regular', 'GMax').
 * @param {string} genderType - Gender type (e.g., 'male', 'female').
 * @returns {string|null} - URL for the Pokémon sprite image.
 */
export const getSpriteUrl = (pokemonData, imgType, spriteType, formType, megaType, genderType) => {
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

  // Fallback to front_default if the sprite URL is unavailable
  return spriteUrl || pokemonData.sprites.front_default;
};

/**
 * Fetch evolution chain data by chain ID.
 * @param {number} chainId - Evolution chain ID.
 * @returns {Promise<object>} - Evolution chain data.
 */
export const getEvolutionChain = async (chainId) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${chainId}/`);
    if (!response.ok) throw new Error('Evolution chain not found');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};