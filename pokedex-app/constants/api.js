const BASE_URL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/'; 
const BACKUP_SPRITE_URL = 'https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/home/';
const GENERATION_8_URL = 'https://github.com/dokkanart/swsh-gifs/blob/master/Generation%208/';
const EVOL_URL = `https://pokeapi.co/api/v2/pokemon-species`;

/** Fetch the list of all Pokémon. */
export const getPokemonList = async () => {
  try {
    const response = await fetch(`${BASE_URL}?limit=1000`); // Adjust limit as needed
    if (!response.ok) throw new Error('Failed to fetch Pokémon list');
    const data = await response.json();
    return data.results; // Return the list of Pokémon
  } catch (error) {
    throw new Error(error.message);
  }
};

/** Fetch Pokémon data by name. */
export const getPokemonByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/${name.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokémon not found!');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/** Fetch Pokémon data by ID. */
export const getPokemonById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Pokémon not found!');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/** Generate the Pokémon sprite URL based on selected types and forms, with backups. */
export const getSpriteUrl = (pokemonData, imgType, spriteType, formType, megaType, genderType) => {
  if (!pokemonData) return null;
  const form = formType === 'alola' ? '-alola' : '';
  const gender = genderType === 'female' ? '-f' : '';
  let spriteUrl;

  // Handle image types
  if (imgType === 'GIF') {
    if (megaType === 'GMax') {
      spriteUrl = `${GENERATION_8_URL}${pokemonData.id}-gigantamax.gif`; 
    } else if (megaType === 'primal') {
      spriteUrl = `${SPRITE_URL}${pokemonData.id}-primal.gif`; // Updated path for primal
    } else if (megaType === 'megax') {
      spriteUrl = `${SPRITE_URL}${pokemonData.id}-megax.gif`; // Updated path for mega X
    } else if (megaType === 'megay') {
      spriteUrl = `${SPRITE_URL}${pokemonData.id}-megay.gif`; // Updated path for mega Y
    } else if (megaType === 'mega') {
      spriteUrl = `${SPRITE_URL}${pokemonData.id}-mega.gif`; // Updated path for mega
    } else {
      spriteUrl = `${SPRITE_URL}${pokemonData.id}${form}${gender}.gif`; // Basic sprite URL
    }
  } else if (imgType === 'PNG') {
    spriteUrl = `${BACKUP_SPRITE_URL}${pokemonData.id}.png`; // Backup sprite URL
  } else if (imgType === 'Low') {
    spriteUrl = pokemonData.sprites.front_default; 
  }

  return spriteUrl || pokemonData.sprites.front_default;
};

/** Fetch Pokémon species data. */
export const getPokemonSpecies = async (name) => {
  try {
    const response = await fetch(`${EVOL_URL}/${name.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokémon species not found!');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/** Fetch evolution chain data by URL. */
export const getEvolutionChain = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Evolution chain not found!');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
};
