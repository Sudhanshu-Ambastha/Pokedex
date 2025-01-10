import axios from 'axios';

const BASE_URL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const EVOL_URL = 'https://pokeapi.co/api/v2/pokemon-species';
const SPRITE_URL = 'https://raw.githubusercontent.com/Sudhanshu-Ambastha/Pokemon-3D-Models/main/PokeData.json';

/** Fetch the list of all Pokémon. */
export const getPokemonList = () => {
  return axios.get(`${BASE_URL}?limit=1000`) // Adjust limit as needed
    .then(response => response.data.results)
    .catch(error => {
      throw new Error(error.response?.data?.message || 'Failed to fetch Pokémon list');
    });
};

/** Fetch Pokémon data by name. */
export const getPokemonByName = (name) => {
  return axios.get(`${BASE_URL}/${name.toLowerCase()}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.response?.data?.message || 'Pokémon not found!');
    });
};

/** Fetch Pokémon data by ID. */
export const getPokemonById = (id) => {
  return axios.get(`${BASE_URL}/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.response?.data?.message || 'Pokémon not found!');
    });
};

/** Fetch sprite data from Poke3DAPI */
export const getSpriteUrl = (pokemonId) => {
  return axios.get(SPRITE_URL)
    .then(response => {
      const pokemonData = response.data.find(pokemon => pokemon.id === pokemonId);
      if (pokemonData) {
        return pokemonData.spriteUrl;
      } else {
        throw new Error('Sprite not found!');
      }
    })
    .catch(error => {
      throw new Error(error.message || 'Failed to fetch sprite data');
    });
};

/** Fetch Pokémon species data. */
export const getPokemonSpecies = (name) => {
  return axios.get(`${EVOL_URL}/${name.toLowerCase()}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.response?.data?.message || 'Pokémon species not found!');
    });
};

/** Fetch evolution chain data by URL. */
export const getEvolutionChain = (url) => {
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.response?.data?.message || 'Evolution chain not found!');
    });
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
export const getPokemonEvolutionChain = (name) => {
  return getPokemonSpecies(name)
    .then(species => {
      const evolutionChainUrl = species.evolution_chain.url;
      return getEvolutionChain(evolutionChainUrl);
    })
    .then(evolutionChainData => parseEvolutionChain(evolutionChainData.chain))
    .catch(error => {
      throw new Error(error.response?.data?.message || error.message);
    });
};
