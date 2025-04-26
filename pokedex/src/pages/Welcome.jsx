import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WTP, loading, loadingText, Pokedex } from "../constant/icon";
import '../index.css';

const Welcome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 4000); 

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isLoading && !errorMessage) {
      navigate('/Grid');  
    }
  }, [isLoading, navigate, errorMessage]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <img src={WTP} alt="WTP Logo" className="w-7/12 max-w-xl h-32 mt-7 md:mt-10 w-full md:w-7/12 lg:w-7/12" />
        <p className="font-[PokeSolid] text-xl text-black text-center mt-4 px-4">
          Discover and learn about Pokemon
        </p>
        <div className="w-full h-auto flex flex-col items-center justify-center pt-10">
          <img src={Pokedex} alt="Pokedex" className="w-auto h-auto relative" />
          <img src={loading} alt="Loading" className="w-18 h-18 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-26.5" />
          <img src={loadingText} alt="LoadingText" className="w-15 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-54 -ml-4" />
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-100">
        <p className="text-red-600 font-bold text-lg">{errorMessage}</p>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setIsLoading(true);
            setErrorMessage(null);
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return null;
};

export default Welcome;