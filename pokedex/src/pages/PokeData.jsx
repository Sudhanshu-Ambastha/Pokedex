import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '@google/model-viewer';
import { loadingText, homeIcon, chevronLeft, chevronRight} from '../constant/icon';
import { getPokemonStats, fetchAllPokemon3DData } from '../constant/api';
import '../index.css';

const PokeData = () => {
  const { pokemonId: pokemonIdOrName } = useParams();
  const pokemonId = pokemonIdOrName;

  const [pokemonData, setPokemonData] = useState(null);
  const [pokemon3DData, setPokemon3DData] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);
  const [availableAnimations, setAvailableAnimations] = useState([]);
  const [selectedAnimation, setSelectedAnimation] = useState('');
  const [availableForms, setAvailableForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState('regular');
  const navigate = useNavigate();
  const modelViewerRef = useRef(null); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlePrevPokemon = () => {
    if (parseInt(pokemonId) > 1) {
      navigate(`/pokemon/${parseInt(pokemonId) - 1}`);
    }
  };

  const handleNextPokemon = () => {
    if (parseInt(pokemonId) < 1025) {
      navigate(`/pokemon/${parseInt(pokemonId) + 1}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [stats, full3D] = await Promise.all([
          getPokemonStats(pokemonId),
          fetchAllPokemon3DData()
        ]);

        setPokemonData(stats);

        const found3D = full3D.find((p) => p.id.toString() === pokemonId);
        if (!found3D) {
          throw new Error('No 3D data found for this Pokémon.');
        }
        setPokemon3DData(found3D);

        const forms = found3D.forms.map((f) => ({
          name: f.name,
          formName: f.formName,
          model: f.model,
          animations: f.animations, 
        }));
        setAvailableForms(forms);

        const defaultForm = forms.find((f) => f.formName === 'regular') || forms[0];
        setSelectedForm(defaultForm.formName);
        setModelUrl(defaultForm.model);
        setAvailableAnimations(Object.keys(defaultForm.animations || {}));
        setSelectedAnimation(Object.keys(defaultForm.animations || {})[0] || '');

      } catch (err) {
        console.error(err);
        setError(err.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pokemonId]);

  useEffect(() => {
    if (availableForms.length > 0 && selectedForm) {
      const currentForm = availableForms.find((form) => form.formName === selectedForm);
      if (currentForm) {
        setModelUrl(currentForm.model);
        setAvailableAnimations(Object.keys(currentForm.animations || {}));
        setSelectedAnimation(Object.keys(currentForm.animations || {})[0] || '');
      }
    }
  }, [selectedForm, availableForms]);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      const onModelLoad = () => {
        const animationList = modelViewer.availableAnimations;
        setAvailableAnimations(animationList);
        if (animationList.length > 0 && !selectedAnimation) {
          setSelectedAnimation(animationList[0]);
        }
      };

      modelViewer.addEventListener('load', onModelLoad);

      return () => {
        modelViewer.removeEventListener('load', onModelLoad);
      };
    }
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
      <button 
          onClick={handlePrevPokemon} 
          disabled={parseInt(pokemonId) <= 1}
          className={`p-2 ${parseInt(pokemonId) <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <img src={chevronLeft} alt="Previous" className="w-8 h-8" />
        </button>
      <button 
          onClick={() => navigate('/Evol')}
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
  );
};

export default PokeData;