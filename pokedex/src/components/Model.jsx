import React, { Suspense, useEffect, useState } from 'react';
import { Html } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { fetchPokemonModels } from '../constant/api.js'; // Pokémon3D API function

function Loader() {
  return <Html center>Loading...</Html>;
}

const Model = ({ pokemonNameOrId, form = 'regular', ...props }) => {
  const [modelUrl, setModelUrl] = useState(null);
  const [error, setError] = useState(null);
  const [gltf, setGltf] = useState(null);

  // Fetch Model URL from Pokémon3D API
  useEffect(() => {
    async function fetchModel() {
      try {
        const url = await fetchPokemonModels(pokemonNameOrId, form);
        console.log(`✅ Model URL for ${pokemonNameOrId}:`, url); // ✅ Debugging

        if (url) {
          setModelUrl(url);
        } else {
          setError(`⚠️ Model not found for ${pokemonNameOrId}`);
        }
      } catch (err) {
        setError(`❌ Error loading model for ${pokemonNameOrId}`);
      }
    }
    fetchModel();
  }, [pokemonNameOrId, form]);

  // Load the model only when URL is available
  useEffect(() => {
    if (modelUrl) {
      console.log(`🔄 Loading GLTF model from URL:`, modelUrl); // ✅ Debugging
      new GLTFLoader().load(
        modelUrl,
        (gltf) => {
          console.log(`✅ Loaded GLTF model for ${pokemonNameOrId}`); // ✅ Debugging
          setGltf(gltf);
        },
        undefined,
        () => setError(`❌ Failed to load model for ${pokemonNameOrId}`)
      );
    }
  }, [modelUrl]);

  // Display Error Message if Model Fails
  if (error) return <Html center>{error}</Html>;

  return (
    <Suspense fallback={<Loader />}>
      {gltf ? <primitive object={gltf.scene} {...props} /> : <Loader />}
    </Suspense>
  );
};

export default Model;
