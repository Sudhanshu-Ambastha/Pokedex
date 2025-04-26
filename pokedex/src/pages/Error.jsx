import { Echo, Romeo, shinyRomeo, Oscar, Exclamation, Zero } from '../constant/icon.js'; // Adjust paths
import '../index.css'; // Import your Tailwind CSS
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Error = () => {  // Separate component for 404
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/'); // Or navigate to a specific route
  };

  return (
    <div className="flex-1 bg-gray-100 justify-center items-center">
      <div className="flex flex-col justify-center items-center mt-20 pb-40 bg-gray-100">
        <p className="text-3xl text-gray-400 font-poke">
          E    r     r     o    r       !
        </p>

        <div className="flex flex-row justify-center items-center my-5">
          <img src={Echo} alt="Echo" className="w-12 h-12 mx-1" />
          <img src={Romeo} alt="Romeo" className="w-12 h-12 mx-1" />
          <img src={shinyRomeo} alt="Shiny Romeo" className="w-12 h-12 mx-1" />
          <img src={Oscar} alt="Oscar" className="w-12 h-12 mx-1" />
          <img src={shinyRomeo} alt="Shiny Romeo" className="w-12 h-12 mx-1" />
          <img src={Exclamation} alt="Exclamation" className="w-12 h-12 mx-1" />
        </div>

        <div className="flex flex-row justify-center items-center">
          <p className="text-4xl font-bold text-gray-700 font-poke">4</p>
          <img src={Zero} alt="Zero" className="w-10 h-10 mx-2" />
          <p className="text-4xl font-bold text-gray-700 font-poke">4</p>
          <p className="text-xl font-bold text-red-500 mt-2 font-poke">Not found</p>
        </div>

        <button className="mt-5 px-4 py-2 bg-red-500 rounded-md" onClick={handleRetry}>
          <p className="text-white text-lg font-poke">Go Home</p> {/* Changed button text */}
        </button>
      </div>
    </div>
  );
};

export default Error; 