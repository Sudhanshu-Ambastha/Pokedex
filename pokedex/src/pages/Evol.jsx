import { useState, useEffect } from 'react';
import { chevronLeft, homeIcon, chevronRight } from '../constant/icon';
import Error from './Error'; 
import { getPokemonEvolutionChain, getPokemonSprite } from '../constant/api';
import '../index.css'; 
import { useNavigate, useParams } from 'react-router-dom'; 


const EvolutionPage = () => {
  const navigate = useNavigate();
  const { pokemonName } = useParams(); 
  const [evolutionData, setEvolutionData] = useState([]);
  const [error, setError] = useState('');
  const [sprites, setSprites] = useState([]);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setDeviceWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchEvolutionData();
  }, [pokemonName, fetchEvolutionData]);

  const fetchEvolutionData = async () => {
    try {
      const evolutions = await getPokemonEvolutionChain(pokemonName);
      setEvolutionData(evolutions);
      setError('');

      const spritePromises = evolutions.map((evolution) =>
        getPokemonSprite(evolution.name)
      );
      const spriteUrls = await Promise.all(spritePromises);
      setSprites(spriteUrls);
    } catch (err) {
      setError(err.message);
      setEvolutionData([]);
      setSprites([]); // Clear sprites on error
    }
  };


  const renderEvolutionCards = () => {
    if (!evolutionData.length) {
      return (
        <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
          <p className="text-lg font-poke text-gray-500">No Evolution Data Available</p>
        </div>
      );
    }

    return evolutionData.map((evolution, index) => {
      const spriteUrl = sprites[index];

      return (
        <button 
          key={evolution.name}
          className="bg-gray-100 p-6 rounded-lg flex items-center justify-center m-2" 
          onClick={() => navigate(`/pokedata/${evolution.name}`)} 
        >
          <img
            src={spriteUrl}
            alt={evolution.name} // Added alt text
            className="w-24 h-24 mb-2"
            onError={() => console.error(`Error loading sprite for ${evolution.name}`)}
          />
          <p className="text-xl font-poke text-gray-800">
            {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}
          </p>
        </button>
      );
    });
  };

  return (
    <div className="flex-1 bg-white p-4">
      {error ? (
        <Error message={error} onRetry={fetchEvolutionData} />
      ) : (
        <>
          <div className="flex flex-wrap justify-center"> 
            {renderEvolutionCards()}
          </div>

          <div className="flex flex-row justify-between items-center w-full px-6 mt-4"> 
            <button className="flex justify-center items-center p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300">
              <img src={chevronLeft} alt="Previous" className="w-4 h-4 text-gray-700" /> 
            </button>

            <button
              className="flex justify-center items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg transition"
              onClick={() => navigate('/pokemongrid')} // Use navigate
            >
              <img src={homeIcon} alt="Home" /> 
            </button>

            <button className="flex justify-center items-center p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300">
              <img src={chevronRight} alt="Next" className="w-4 h-4 text-gray-700" /> 
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EvolutionPage;