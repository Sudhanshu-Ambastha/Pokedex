import { useState, useEffect, useCallback, useMemo } from 'react';
import '@google/model-viewer';
import { fetchAllPokemon3DData } from '../constant/api.js';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Grid() {
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [formFilter, setFormFilter] = useState('all');
  const [generationFilter, setGenerationFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generationRanges = useMemo(() => ({
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
    5: [494, 649],
    6: [650, 721],
    7: [722, 809],
    8: [810, 905],
    9: [906, 1025],
  }), []);

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllPokemon3DData();
      setAllPokemonData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error('Error loading data:', err);
    }
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  const filterPokemon = useCallback(() => {
    if (!allPokemonData) {
      setFilteredPokemon([]);
      return;
    }

    let filtered = [...allPokemonData];

    if (generationFilter !== 'all') {
      const [start, end] = generationRanges[generationFilter];
      filtered = filtered.filter(pokemon => pokemon.id >= start && pokemon.id <= end);
    }

    if (searchInput) {
      const searchLower = searchInput.toLowerCase();
      filtered = filtered.filter(pokemon =>
        pokemon.forms.some(form => form.name.toLowerCase().includes(searchLower)) ||
        pokemon.id.toString().includes(searchLower)
      );
    }

    let finalFilteredForms = [];
    if (formFilter === 'all') {
      finalFilteredForms = filtered.flatMap(pokemon =>
        pokemon.forms.map(form => ({ ...form, id: pokemon.id }))
      );
    } else {
      finalFilteredForms = filtered.flatMap(pokemon =>
        pokemon.forms
          .filter(form => form.formName === formFilter)
          .map(form => ({ ...form, id: pokemon.id }))
      );
    }

    setFilteredPokemon(finalFilteredForms);
  }, [allPokemonData, formFilter, generationFilter, searchInput, generationRanges]);

  useEffect(() => {
    filterPokemon();
  }, [allPokemonData, formFilter, generationFilter, searchInput, filterPokemon]);

  const handlePokemonClick = (pokemon) => {
    navigate(`/Pokedex/pokedata/${pokemon.id}/${pokemon.formName.toLowerCase().replace(/ /g, '-')}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-green-500 text-white text-center py-4">
        <h1 className="text-xl sm:text-2xl font-bold">Pokémon 3D Model Viewer</h1>
      </header>

      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-center items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
          <select
            value={formFilter}
            onChange={(e) => setFormFilter(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 text-sm"
          >
            <option value="all">All Forms</option>
            <option value="regular">Regular</option>
            <option value="alolan">Alolan</option>
            <option value="galar">Galarian</option>
            <option value="hisuian">Hisuian</option>
            <option value="mega">Mega</option>
            <option value="gmax">G-Max</option>
            <option value="xy">Mega X/Y</option>
            <option value="unique">Unique</option>
            <option value="shiny">Shiny</option>
            <option value="primal">Primal</option>
            <option value="origin">Origin</option>
            <option value="multiform">Multi Form</option>
          </select>

          <select
            value={generationFilter}
            onChange={(e) => setGenerationFilter(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 text-sm"
          >
            <option value="all">All Generations</option>
            <option value="1">Gen 1</option>
            <option value="2">Gen 2</option>
            <option value="3">Gen 3</option>
            <option value="4">Gen 4</option>
            <option value="5">Gen 5</option>
            <option value="6">Gen 6</option>
            <option value="7">Gen 7</option>
            <option value="8">Gen 8</option>
            <option value="9">Gen 9</option>
          </select>

          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Pokémon"
            className="px-3 py-2 rounded border border-gray-300 text-sm w-full sm:w-auto"
          />

          <button
            onClick={filterPokemon}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"
          >
            🔍Search
          </button>
        </div>

        {loading && <p className="text-center">Loading Pokémon...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPokemon.map((pokemon) => (
            <div
              key={`${pokemon.id}-${pokemon.formName}`}
              className="border border-gray-300 rounded-lg bg-white shadow-md p-2 sm:p-4 text-center cursor-pointer"
              onClick={() => handlePokemonClick(pokemon)}
            >
              <model-viewer
                src={pokemon.model}
                alt={`Model of ${pokemon.name}`}
                camera-controls
                environment-image="neutral"
                className="w-full h-32 sm:h-60"
                loading="lazy"
              ></model-viewer>
              <div className="text-gray-600 text-xs sm:text-sm mt-1">ID: {pokemon.id}</div>
              <h2 className="text-sm sm:text-lg font-semibold mt-1">{pokemon.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Grid;