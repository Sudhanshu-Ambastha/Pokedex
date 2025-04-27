import { useState, useEffect, useCallback, useRef } from 'react';
import { chevronLeft, homeIcon } from '../constant/icon';
import Error from './Error';
import { getPokemonEvolutionChain, fetchAllPokemon3DData } from '../constant/api';
import '../index.css';
import { useNavigate, useParams } from 'react-router-dom';
import '@google/model-viewer';

const EvolutionPage = () => {
  const { pokemonName } = useParams();
  const [evolutionData, setEvolutionData] = useState([]);
  const [error, setError] = useState('');
  const [pokemon3DData, setPokemon3DData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const modelViewerRef = useRef({}); // Ref to store model-viewer instances

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const evolutions = await getPokemonEvolutionChain(pokemonName);
      setEvolutionData(evolutions);
      setError('');
      console.log("Evolution Data:", evolutions);

      const all3DData = await fetchAllPokemon3DData();
      const indexed3DData = all3DData.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
      setPokemon3DData(indexed3DData);
      console.log("3D Data:", indexed3DData);

    } catch (err) {
      setError(err.message);
      setEvolutionData([]);
      console.error("Fetch Error:", err.message);
    } finally {
      setLoading(false);
    }
  }, [pokemonName]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const getPokemon3D = (name) => {
    return Object.values(pokemon3DData).find(p =>
      p.name && p.name.toLowerCase() === name.toLowerCase()
    );
  };

  const getModelUrl = (pokemon3D) => {
    return pokemon3D?.forms?.[0]?.model || null;
  };

  const getAnimations = (pokemon3D) => {
    return Object.keys(pokemon3D?.forms?.[0]?.animations || {});
  };

  const renderEvolutionCards = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-48">
          <img src={require('../constant/icon').loadingText} alt="Loading" className="w-[80px] h-[30px]" />
        </div>
      );
    }

    if (!evolutionData.length) {
      return (
        <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
          <p className="text-lg font-poke text-gray-500">No Evolution Data Available</p>
        </div>
      );
    }

    return evolutionData.map((evolution) => {
      const pokemon3DInfo = getPokemon3D(evolution.name);
      const modelUrl = getModelUrl(pokemon3DInfo);
      const animations = getAnimations(pokemon3DInfo);
      const defaultAnimation = animations[0] || '';

      return (
        <div
          key={evolution.name}
          className="bg-gray-100 p-6 rounded-lg flex flex-col items-center justify-center m-4 w-64 h-80" // Increased card size
        >
          {modelUrl ? (
            <div className="relative w-48 h-48"> {/* Increased model viewer size */}
              <model-viewer
                ref={(el) => (modelViewerRef[evolution.name] = el)}
                src={modelUrl}
                alt={`Model of ${evolution.name}`}
                camera-controls
                touch-action="pan-y"
                environment-image="neutral"
                class="w-full h-full"
                animation-name={defaultAnimation}
                autoplay
              ></model-viewer>
            </div>
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-gray-500 font-poke">
              No 3D Model
            </div>
          )}
          <p className="text-lg font-poke text-gray-800 text-center mt-2">
            {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}
          </p>
          <button
            onClick={() => navigate(`/pokemon/${evolution.url.split('/').slice(-2, -1)[0]}`)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            View Stats
          </button>
        </div>
      );
    });
  };

  return (
    <div className="flex-1 bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(`/pokemon/${pokemonName}`)}>
          <img src={chevronLeft} alt="Back" className="w-8 h-8" />
        </button>
        <button onClick={() => navigate('/Grid')}>
          <img src={homeIcon} alt="Home" className="w-8 h-8" />
        </button>
        <div></div>
      </div>

      <h2 className="text-xl font-bold text-center mb-4 font-poke">
        Evolution Chain of {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
      </h2>

      {error ? (
        <Error message={error} onRetry={fetchInitialData} />
      ) : (
        <div className="flex flex-wrap justify-center">
          {renderEvolutionCards()}
        </div>
      )}
    </div>
  );
};
export default EvolutionPage;