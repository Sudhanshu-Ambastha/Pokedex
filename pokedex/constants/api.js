import axios from 'axios';

const BASE_URL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/';
const BACKUP_SPRITE_URL = 'https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/home/';
const GENERATION_8_URL = 'https://github.com/dokkanart/swsh-gifs/blob/master/Generation%208/';
const EVOL_URL = 'https://pokeapi.co/api/v2/pokemon-species';

/** Fetch the list of all Pokémon. */
export const getPokemonList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=1000`); // Adjust limit as needed
    return response.data.results;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch Pokémon list');
  }
};

/** Fetch Pokémon data by name. */
export const getPokemonByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/${name.toLowerCase()}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Pokémon not found!');
  }
};

/** Fetch Pokémon data by ID. */
export const getPokemonById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Pokémon not found!');
  }
};

/** Generate the Pokémon sprite URL based on selected types and forms, with backups. */
export const getSpriteUrl = (
  pokemonData,
  imgType,
  formType = null,
  megaType = null,
  genderType = null
) => {
  if (!pokemonData) return null;

  const form = formType === 'alola' ? '-alola' : '';
  const gender = genderType === 'female' ? '-f' : '';

  switch (imgType) {
    case 'GIF':
      switch (megaType) {
        case 'GMax':
          return `${GENERATION_8_URL}${pokemonData.id}-gigantamax.gif`;
        case 'primal':
          return `${SPRITE_URL}${pokemonData.id}-primal.gif`;
        case 'megax':
          return `${SPRITE_URL}${pokemonData.id}-megax.gif`;
        case 'megay':
          return `${SPRITE_URL}${pokemonData.id}-megay.gif`;
        case 'mega':
          return `${SPRITE_URL}${pokemonData.id}-mega.gif`;
        default:
          return `${SPRITE_URL}${pokemonData.id}${form}${gender}.gif`;
      }
    case 'PNG':
      return `${BACKUP_SPRITE_URL}${pokemonData.id}.png`;
    case 'Low':
      return pokemonData.sprites.front_default;
    default:
      return pokemonData.sprites.front_default;
  }
};

/** Fetch Pokémon species data. */
export const getPokemonSpecies = async (name) => {
  try {
    const response = await axios.get(`${EVOL_URL}/${name.toLowerCase()}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Pokémon species not found!');
  }
};

/** Fetch evolution chain data by URL. */
export const getEvolutionChain = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Evolution chain not found!');
  }
};

/** Parse the evolution chain to get the full list of evolutions. */
const parseEvolutionChain = (chain) => {
  const evolutions = [];

  const traverseChain = (node) => {
    evolutions.push({
      name: node.species.name,
      url: node.species.url,
    });
    if (node.evolves_to.length > 0) {
      node.evolves_to.forEach(traverseChain);
    }
  };

  traverseChain(chain);
  return evolutions;
};

/** Fetch the complete evolution chain for a given Pokémon by name. */
export const getPokemonEvolutionChain = async (name) => {
  try {
    const species = await getPokemonSpecies(name);
    const evolutionChainUrl = species.evolution_chain.url;
    const evolutionChainData = await getEvolutionChain(evolutionChainUrl);
    return parseEvolutionChain(evolutionChainData.chain);
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
