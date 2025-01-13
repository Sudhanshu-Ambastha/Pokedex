const BASE_URL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const EVOL_URL = 'https://pokeapi.co/api/v2/pokemon-species';
// const SPRITE_URL = 'https://raw.githubusercontent.com/Sudhanshu-Ambastha/Pokemon-3D-Models/main/PokeData.json';

/** Fetch the list of all Pokémon. */
export const getPokemonList = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) throw new Error('Failed to fetch Pokémon list');
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching Pokémon list:', error.message);
    throw new Error(error.message);
  }
};

/** Fetch Pokémon data by name or ID. */
export const getPokemonByNameOrId = async (nameOrId) => {
  try {
    const response = await fetch(`${BASE_URL}/${nameOrId.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokémon not found!');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/** Fetch Pokémon sprite by name or ID. */
export const getPokemonSprite = async (nameOrId) => {
  try {
    const pokemonData = await getPokemonByNameOrId(nameOrId);
    return pokemonData.sprites.front_default; // Default sprite URL
  } catch (error) {
    throw new Error(error.message);
  }
};

/** Fetch Pokémon stats (hp, attack, defense, etc.) by name or ID. */
export const getPokemonStats = async (nameOrId) => {
  try {
    const pokemonData = await getPokemonByNameOrId(nameOrId);

    const stats = {
      hp: pokemonData.stats[0].base_stat,
      attack: pokemonData.stats[1].base_stat,
      defense: pokemonData.stats[2].base_stat,
      specialAttack: pokemonData.stats[3].base_stat,
      specialDefense: pokemonData.stats[4].base_stat,
      speed: pokemonData.stats[5].base_stat,
    };

    const pokemonDetails = {
      name: pokemonData.name,
      id: pokemonData.id,
      weight: pokemonData.weight,
      height: pokemonData.height,
      spriteUrl: pokemonData.sprites.front_default,
      types: pokemonData.types.map(typeInfo => typeInfo.type.name),
    };

    return { ...pokemonDetails, stats };
  } catch (error) {
    throw new Error(error.message);
  }
};

/** Fetch Pokémon types and their icons. */
export const getPokemonTypes = async (nameOrId) => {
  try {
    const pokemonData = await getPokemonByNameOrId(nameOrId);
    return pokemonData.types.map(typeInfo => ({
      name: typeInfo.type.name,
      iconUrl: `https://github.com/Sudhanshu-Ambastha/Pokedex/tree/main/PokemonTypes/${typeInfo.type.name.toUpperCase()}.png`,
    }));
  } catch (error) {
    throw new Error(error.message);
  }
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
    const evolutionChainData = await getEvolutionChain(species.evolution_chain.url);
    return parseEvolutionChain(evolutionChainData.chain);
  } catch (error) {
    throw new Error(error.message);
  }
};