import axios from 'axios';

const BASE_URL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const EVOL_URL = 'https://pokeapi.co/api/v2/pokemon-species';
const POKEMON3D_API = 'https://pokemon-3d-api.onrender.com/v1/pokemon';

export const getPokemonList = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.results || [];
  } catch (error) {
    console.error('❌ Error fetching Pokémon list:', error.message);
    throw new Error(error.message);
  }
};

export const fetchAllPokemon3DData = async () => {
  try {
    const response = await axios.get(POKEMON3D_API);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching all 3D Pokémon data:', error);
    throw error;
  }
};

export const getPokemonByNameOrId = async (nameOrId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${nameOrId.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching Pokémon data for ${nameOrId}:`, error.message);
    throw new Error(error.message);
  }
};

async function checkImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
}

export const fetchPokemonModels = async (pokemonNameOrId, form = 'regular') => {
  console.log(`🔄 Fetching model for ${pokemonNameOrId}, form: ${form}`);

  try {
    const response = await axios.get(POKEMON3D_API);
    console.log("3d api response", response);
    const allPokemon = response.data;

    const pokemon = allPokemon.find((p) => p.id.toString() === pokemonNameOrId.toString());

    if (!pokemon || !pokemon.forms) {
      console.warn(`⚠️ No Pokémon found with ID or name: ${pokemonNameOrId}`);
      return null;
    }

    const foundForm = pokemon.forms.find((f) => f.formName === form);
    const modelUrl = foundForm?.model || null;
    console.log("modelUrl", modelUrl);
    return modelUrl;
  } catch (error) {
    console.error(`❌ Error fetching Pokémon models for ${pokemonNameOrId}:`, error);
    return null;
  }
};

export const getPokemonSprite = async (nameOrId, form = 'regular') => {
  try {
    const modelUrl = await fetchPokemonModels(nameOrId, form);
    if (modelUrl) {
      const isValid = await checkImage(modelUrl);
      console.log("modelUrl checkImage result", isValid);
      if (isValid) return modelUrl;
    }

    const pokemonData = await getPokemonByNameOrId(nameOrId);
    const spriteUrl = pokemonData.sprites.front_default;
    const isValid = await checkImage(spriteUrl);
    console.log("spriteUrl checkImage result", isValid);
    return isValid ? spriteUrl : null;
  } catch (error) {
    console.error('❌ Error fetching sprite/model:', error.message);
    return null;
  }
};

export const getPokemonStats = async (nameOrId) => {
  try {
    const pokemonData = await getPokemonByNameOrId(nameOrId);
    return {
      name: pokemonData.name,
      id: pokemonData.id,
      weight: pokemonData.weight,
      height: pokemonData.height,
      spriteUrl: pokemonData.sprites.front_default,
      types: pokemonData.types.map((typeInfo) => typeInfo.type.name),
      stats: {
        hp: pokemonData.stats[0].base_stat,
        attack: pokemonData.stats[1].base_stat,
        defense: pokemonData.stats[2].base_stat,
        specialAttack: pokemonData.stats[3].base_stat,
        specialDefense: pokemonData.stats[4].base_stat,
        speed: pokemonData.stats[5].base_stat,
      },
    };
  } catch (error) {
    console.error(`❌ Error fetching Pokémon stats for ${nameOrId}:`, error.message);
    throw new Error(error.message);
  }
};

export const getPokemonTypes = async (nameOrId) => {
  try {
    const pokemonData = await getPokemonByNameOrId(nameOrId);
    return pokemonData.types.map((typeInfo) => ({
      name: typeInfo.type.name,
      iconUrl: `https://github.com/Sudhanshu-Ambastha/Pokedex/tree/main/PokemonTypes/${typeInfo.type.name.toUpperCase()}.png`,
    }));
  } catch (error) {
    console.error(`❌ Error fetching Pokémon types for ${nameOrId}:`, error.message);
    throw new Error(error.message);
  }
};

export const getPokemonSpecies = async (name) => {
  try {
    const response = await axios.get(`${EVOL_URL}/${name.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching Pokémon species data for ${name}:`, error.message);
    throw new Error(error.message);
  }
};

export const getEvolutionChain = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching evolution chain from ${url}:`, error.message);
    throw new Error(error.message);
  }
};

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

export const getPokemonEvolutionChain = async (name) => {
  try {
    const species = await getPokemonSpecies(name);
    const evolutionChainData = await getEvolutionChain(species.evolution_chain.url);
    return parseEvolutionChain(evolutionChainData.chain);
  } catch (error) {
    console.error(`❌ Error fetching evolution chain for ${name}:`, error.message);
    throw new Error(error.message);
  }
};
