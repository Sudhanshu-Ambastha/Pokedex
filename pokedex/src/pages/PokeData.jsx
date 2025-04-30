import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '@google/model-viewer';
import { loadingText, homeIcon, chevronLeft, chevronRight } from '../constant/icon';
import { getPokemonStats, fetchAllPokemon3DData, getPokemonTypes } from '../constant/api';
import '../index.css';

const PokeData = () => {
  const { pokemonId: pokemonIdOrName } = useParams();
  const pokemonId = pokemonIdOrName;
  const navigate = useNavigate();
  const modelViewerRef = useRef(null);

  const [pokemonData, setPokemonData] = useState(null);
  const [pokemon3DData, setPokemon3DData] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);

  const [availableForms, setAvailableForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState('regular');

  const [availableAnimations, setAvailableAnimations] = useState([]);
  const [selectedAnimation, setSelectedAnimation] = useState('');

  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [typeImagePaths, setTypeImagePaths] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Navigation handlers
  const handlePrevPokemon = () => {
    if (parseInt(pokemonId) > 1) {
      navigate(`/pokemon/${parseInt(pokemonId) - 1}/${selectedForm}`);
    }
  };

  const handleNextPokemon = () => {
    if (parseInt(pokemonId) < 1025) {
      navigate(`/pokemon/${parseInt(pokemonId) + 1}/${selectedForm}`);
    }
  };

  // Fetch stats and types
  useEffect(() => {
    const fetchStatsAndTypes = async () => {
      try {
        setLoading(true);
        const [stats, types] = await Promise.all([
          getPokemonStats(pokemonId),
          getPokemonTypes(pokemonId),
        ]);
        setPokemonData(stats);
        setPokemonTypes(types);

        const imagePaths = {};
        for (const type of types) {
          try {
            const imageModule = await import(`../assets/PokemonTypes/${type.name.toUpperCase()}.png`);
            imagePaths[type.name] = imageModule.default;
          } catch (err) {
            console.error(`Could not load image for type: ${type.name}`);
          }
        }
        setTypeImagePaths(imagePaths);
      } catch (err) {
        setError(err.message || 'Failed to fetch stats or types.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatsAndTypes();
  }, [pokemonId]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const full3D = await fetchAllPokemon3DData();
        const found3D = full3D.find(p => p.id.toString() === pokemonId);

        if (!found3D) throw new Error('No 3D data found for this Pokémon.');

        setPokemon3DData(found3D);

        const forms = found3D.forms.map(f => ({
          name: f.name,
          formName: f.formName,
          model: f.model,
          animations: f.animations,
        }));
        setAvailableForms(forms);

        const defaultForm = forms.find(f => f.formName === 'regular') || forms[0];
        setSelectedForm(defaultForm.formName);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error loading 3D data');
      }
    };

    fetchForms();
  }, [pokemonId]);

  useEffect(() => {
    const form = availableForms.find(f => f.formName === selectedForm);
    if (form) {
      setModelUrl(form.model);
      const anims = Object.keys(form.animations || {});
      setAvailableAnimations(anims);
      setSelectedAnimation(anims[0] || '');
    }
  }, [selectedForm, availableForms]);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleModelLoad = () => {
      const anims = modelViewer.availableAnimations || [];
      if (anims.length > 0 && !selectedAnimation) {
        setAvailableAnimations(anims);
        setSelectedAnimation(anims[0]);
      }
    };

    modelViewer.addEventListener('load', handleModelLoad);
    return () => modelViewer.removeEventListener('load', handleModelLoad);
  }, [modelUrl, selectedAnimation]);

  const handleFormChange = (e) => setSelectedForm(e.target.value);
  const handleAnimationChange = (e) => setSelectedAnimation(e.target.value);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingText} alt="Loading" className="w-[100px] h-[40px]" />
      </div>
    );
  }

  if (error || !pokemonData || !pokemon3DData) {
    return <div className="text-red-500 p-4">{error || 'Data not found.'}</div>;
  }

  const currentFormDisplayName = availableForms.find(f => f.formName === selectedForm)?.name;

  return (
    <div className="p-4 bg-gray-100 rounded-lg flex-grow">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate('/Grid')}>
          <img src={homeIcon} alt="Back" className="w-8 h-8" />
        </button>
      </div>

      <h1 className="text-xl font-bold text-center mb-4 font-poke">
        {pokemonData.name.toUpperCase()} {currentFormDisplayName && `(${currentFormDisplayName})`}
      </h1>

      {availableForms.length > 1 && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Form:</label>
          <select
            value={selectedForm}
            onChange={handleFormChange}
            className="w-full p-2 border rounded capitalize"
          >
            {availableForms.map((form) => (
              <option key={form.formName} value={form.formName}>
                {form.formName}
              </option>
            ))}
          </select>
        </div>
      )}

      {availableAnimations.length > 0 && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Animation:</label>
          <select
            value={selectedAnimation}
            onChange={handleAnimationChange}
            className="w-full p-2 border rounded"
          >
            {availableAnimations.map((anim) => (
              <option key={anim} value={anim}>
                {anim}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="relative w-full h-96 mb-4">
        {modelUrl && (
          <model-viewer
            ref={modelViewerRef}
            src={modelUrl}
            alt={`Model of ${pokemonId}`}
            camera-controls
            touch-action="pan-y"
            environment-image="neutral"
            class="w-full h-full"
            animation-name={selectedAnimation || ''}
            autoplay
          ></model-viewer>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow mt-4">
        <h2 className="text-lg font-semibold mb-2 font-poke">Types</h2>
        <div className="flex flex-wrap gap-2">
          {pokemonTypes.map((type) => (
            <div
              key={type.name}
              className="flex items-center rounded-full px-3 py-1 font-poke text-sm capitalize text-white"
              style={{ backgroundColor: `var(--${type.name}-color, #A8A878)` }}
            >
              {typeImagePaths[type.name] && (
                <img
                  src={typeImagePaths[type.name]}
                  alt={type.name}
                  className="w-4 h-4 mr-2"
                />
              )}
              {type.name}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2 font-poke">Base Stats</h2>
        {pokemonData && (
          <>
            <p className="font-poke">HP: {pokemonData.stats.hp}</p>
            <p className="font-poke">Attack: {pokemonData.stats.attack}</p>
            <p className="font-poke">Defense: {pokemonData.stats.defense}</p>
            <p className="font-poke">Sp. Atk: {pokemonData.stats.specialAttack}</p>
            <p className="font-poke">Sp. Def: {pokemonData.stats.specialDefense}</p>
            <p className="font-poke">Speed: {pokemonData.stats.speed}</p>
          </>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPokemon}
          disabled={parseInt(pokemonId) <= 1}
          className={`p-2 ${parseInt(pokemonId) <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <img src={chevronLeft} alt="Previous" className="w-8 h-8" />
        </button>

        <button
          onClick={() => navigate(`/Pokedex/Evol/${pokemonData.name}/${selectedForm}`)}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Evolution List
        </button>

        <button
          onClick={handleNextPokemon}
          disabled={parseInt(pokemonId) >= 1025}
          className={`p-2 ${parseInt(pokemonId) >= 1025 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <img src={chevronRight} alt="Next" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default PokeData;
