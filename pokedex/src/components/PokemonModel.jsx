import { useEffect, useState } from "react";
import { getPokemonSprite } from "../constant/api.js";
import PokemonModelViewer from "./usePokemonModels.jsx"; 

const PokemonModel = ({ name, id }) => {
  const [modelUrl, setModelUrl] = useState(null);
  const [isGLB, setIsGLB] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchModel = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = await getPokemonSprite(id);
      console.log("fetched url", url);
      if (!url) throw new Error(`Could not retrieve sprite for Pokémon ID ${id}`);

      setModelUrl(url);
      setIsGLB(url.endsWith(".glb"));
    } catch (err) {
      setError(err.message);
      setModelUrl(null);
      setIsGLB(false);
    } finally {
      setLoading(false);
    }
  };

  fetchModel();
}, [id]);

  return (
    <div className="p-4 border rounded shadow-md text-center font-['PokeSolid'] bg-white/5 backdrop-blur-md border-white/10">
      <h3 className="text-lg text-white">#{id}</h3>
      {
        loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : error ? (
          <p className="text-red-400">Error: {error}</p>
        ) : modelUrl ? (
          isGLB ? (
            <PokemonModelViewer modelUrl={modelUrl} />
          ) : (
            <img
              src={modelUrl}
              alt={name}
              className="h-40 w-40 object-contain mx-auto"
              style={{ imageRendering: "pixelated" }}
            />
          )
        ) : (
          <p className="text-gray-400">Model not available</p>
        )}
      <p className="text-lg text-yellow-300 capitalize">{name}</p>
    </div>
  );
};

export default PokemonModel;
